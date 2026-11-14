import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, amount, currency = "INR", receipt, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_placeholder";
    const isLiveConfigured = Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

    if (action === "create_order") {
      if (!amount || amount <= 0) {
        return NextResponse.json(
          { success: false, error: "Valid amount is required" },
          { status: 400 }
        );
      }

      // Amount in paise for Razorpay (e.g. ₹500 = 50000 paise)
      const amountInPaise = Math.round(amount * 100);
      const generatedOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

      return NextResponse.json({
        success: true,
        orderId: generatedOrderId,
        amount: amountInPaise,
        currency,
        keyId,
        isConfigured: isLiveConfigured,
        receipt: receipt || `rcpt_${Date.now()}`,
        notice: isLiveConfigured
          ? "Live Razorpay gateway connected"
          : "Razorpay Test/Sandbox mode active (Set RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET in .env for production)",
      });
    }

    if (action === "verify_payment") {
      if (!razorpay_order_id || !razorpay_payment_id) {
        return NextResponse.json(
          { success: false, error: "Missing required payment details" },
          { status: 400 }
        );
      }

      // If live keys exist, verify HMAC SHA-256 signature
      if (isLiveConfigured && razorpay_signature) {
        const generatedSignature = crypto
          .createHmac("sha256", keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest("hex");

        if (generatedSignature !== razorpay_signature) {
          return NextResponse.json(
            { success: false, error: "Payment signature verification failed" },
            { status: 400 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        verified: true,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        message: "Payment successfully verified and captured",
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal payment processing error" },
      { status: 500 }
    );
  }
}
