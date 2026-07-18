import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "test_key",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "test_secret",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Check if it's a verification request
    if (body.razorpay_order_id && body.razorpay_payment_id && body.razorpay_signature) {
      const text = `${body.razorpay_order_id}|${body.razorpay_payment_id}`;
      const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "test_secret")
        .update(text)
        .digest("hex");
        
      if (generated_signature === body.razorpay_signature) {
        // Here we would normally update the Prisma order status to PAID
        // using prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } })
        return NextResponse.json({ success: true, message: "Payment verified successfully" }, { status: 200 });
      } else {
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
      }
    }

    // Otherwise, create a new order
    const { amount, currency = "INR" } = body;
    
    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount.toString(),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order, { status: 200 });
    
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
