import { NextResponse } from "next/server";
import { db } from "@/lib/store";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const subtotal = Number(searchParams.get("subtotal") || 0);

    if (code) {
      const coupon = db.getCouponByCode(code);
      if (!coupon) {
        return NextResponse.json(
          { success: false, error: "Invalid or expired coupon code" },
          { status: 404 }
        );
      }
      if (subtotal > 0 && subtotal < coupon.minOrder) {
        return NextResponse.json(
          {
            success: false,
            error: `Minimum order of ₹${coupon.minOrder} required for coupon ${coupon.code}`,
          },
          { status: 400 }
        );
      }

      let discount = (subtotal * coupon.discountPercent) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }

      return NextResponse.json({
        success: true,
        coupon,
        discount: Math.round(discount),
      });
    }

    const coupons = db.getCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process coupon request" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.code || !body.discountPercent || !body.minOrder) {
      return NextResponse.json(
        { success: false, error: "Code, discount percent, and minimum order are required" },
        { status: 400 }
      );
    }

    const newCoupon = db.createCoupon({
      code: body.code,
      discountPercent: Number(body.discountPercent),
      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : undefined,
      minOrder: Number(body.minOrder),
      description: body.description || "",
      validUntil: body.validUntil || "2027-12-31",
      isActive: true,
    });

    return NextResponse.json({ success: true, coupon: newCoupon }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
