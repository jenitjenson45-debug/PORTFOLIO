import { NextResponse } from "next/server";
import { db } from "@/lib/store";
import { OrderItem } from "@/lib/types";

export async function GET() {
  try {
    const orders = db.getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      orderType = "delivery",
      deliveryAddress,
      tableNumber,
      instructions,
      items: rawItems,
      couponCode,
      paymentMethod = "cod",
    } = body;

    if (!customerName || !customerPhone || !rawItems || !Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide valid customer details and cart items" },
        { status: 400 }
      );
    }

    if (orderType === "delivery" && (!deliveryAddress || !deliveryAddress.street)) {
      return NextResponse.json(
        { success: false, error: "Delivery address is required for home delivery" },
        { status: 400 }
      );
    }

    const settings = db.getSettings();
    const allDbItems = db.getItems();

    // SERVER-SIDE PRICE RECALCULATION
    let calculatedSubtotal = 0;
    const verifiedOrderItems: OrderItem[] = [];

    for (const rawItem of rawItems) {
      const dbItem = allDbItems.find((i) => i.id === rawItem.id);
      if (!dbItem) continue;

      let unitPrice = dbItem.price;

      // Handle Size Offset
      if (rawItem.sizeId && dbItem.sizes) {
        const foundSize = dbItem.sizes.find((s) => s.id === rawItem.sizeId);
        if (foundSize) {
          unitPrice += foundSize.priceOffset;
        }
      }

      // Handle Add-ons
      const verifiedAddOns: { name: string; price: number }[] = [];
      if (Array.isArray(rawItem.addOns) && dbItem.addOns) {
        for (const addOn of rawItem.addOns) {
          const foundAddOn = dbItem.addOns.find((a) => a.id === addOn.id);
          if (foundAddOn) {
            verifiedAddOns.push({ name: foundAddOn.name, price: foundAddOn.price });
            unitPrice += foundAddOn.price;
          }
        }
      }

      const quantity = Math.max(1, Number(rawItem.quantity) || 1);
      const itemTotal = unitPrice * quantity;
      calculatedSubtotal += itemTotal;

      verifiedOrderItems.push({
        id: dbItem.id,
        name: dbItem.name,
        quantity,
        unitPrice,
        totalPrice: itemTotal,
        sizeName: rawItem.sizeName,
        addOns: verifiedAddOns,
        specialInstructions: rawItem.specialInstructions || "",
        image: dbItem.image,
      });
    }

    if (verifiedOrderItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "None of the selected items could be verified" },
        { status: 400 }
      );
    }

    // Calculate Delivery Fee
    let deliveryFee = 0;
    if (orderType === "delivery") {
      deliveryFee =
        calculatedSubtotal >= settings.freeDeliveryThreshold
          ? 0
          : settings.deliveryFee;
    }

    // Verify and apply coupon
    let discount = 0;
    let verifiedCouponCode: string | undefined = undefined;
    if (couponCode) {
      const coupon = db.getCouponByCode(couponCode);
      if (coupon && calculatedSubtotal >= coupon.minOrder) {
        let calcDisc = (calculatedSubtotal * coupon.discountPercent) / 100;
        if (coupon.maxDiscount && calcDisc > coupon.maxDiscount) {
          calcDisc = coupon.maxDiscount;
        }
        discount = Math.round(calcDisc);
        verifiedCouponCode = coupon.code;
      }
    }

    // Calculate Taxes (GST)
    const taxableAmount = Math.max(0, calculatedSubtotal - discount);
    const tax = Math.round((taxableAmount * settings.taxPercent) / 100);

    // Final Total
    const grandTotal = Math.max(0, taxableAmount + tax + deliveryFee);

    // Payment Status
    const paymentStatus = paymentMethod === "razorpay" ? "paid" : "pending";

    // Estimated preparation / delivery time
    const estimatedTime =
      orderType === "delivery"
        ? "30-40 mins"
        : orderType === "takeaway"
        ? "15-20 mins"
        : "15 mins (Table Service)";

    const newOrder = db.createOrder({
      customerName,
      customerPhone,
      customerEmail: customerEmail || "",
      orderType,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : undefined,
      tableNumber: orderType === "dine_in" ? tableNumber || "Table 1" : undefined,
      instructions: instructions || "",
      items: verifiedOrderItems,
      subtotal: calculatedSubtotal,
      deliveryFee,
      tax,
      discount,
      couponCode: verifiedCouponCode,
      total: grandTotal,
      status: "confirmed", // initially confirmed upon placement
      paymentMethod,
      paymentStatus,
      razorpayPaymentId: body.razorpayPaymentId || undefined,
      estimatedTime,
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: "Order placed successfully!",
    });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 500 }
    );
  }
}
