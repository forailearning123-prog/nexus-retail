"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Extending Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 19332 }), // 193.32 * 100 paise
      });
      const order = await res.json();

      if (order.error) {
        alert("Could not initialize payment");
        setIsProcessing(false);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key",
        amount: order.amount,
        currency: order.currency,
        name: "NexusRetail",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          const verifyRes = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful!");
            window.location.href = "/";
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#003fb1",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Error initializing payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-xl min-h-[calc(100vh-80px)] flex-1 w-full">
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-stack-xl">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-1/2 h-[2px] bg-primary -z-10 -translate-y-1/2"></div>
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-4">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-md">
                1
              </div>
              <span className="font-label-md text-primary font-bold">
                Shipping
              </span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold border border-outline-variant">
                2
              </div>
              <span className="font-label-md text-on-surface-variant">
                Payment
              </span>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 bg-surface px-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold border border-outline-variant">
                3
              </div>
              <span className="font-label-md text-on-surface-variant">
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Side: Checkout Form */}
          <div className="lg:col-span-7 space-y-stack-lg">
            {/* Shipping Address */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
                <h2 className="font-headline-sm text-headline-sm">
                  Shipping Address
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">
                    First Name
                  </label>
                  <input
                    className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface"
                    placeholder="e.g. Alex"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">
                    Last Name
                  </label>
                  <input
                    className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface"
                    placeholder="e.g. Morgan"
                    type="text"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">
                    Street Address
                  </label>
                  <input
                    className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface"
                    placeholder="House number and street name"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">
                    City
                  </label>
                  <input
                    className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface"
                    placeholder="e.g. San Francisco"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 gap-stack-sm">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-on-surface-variant">
                      State
                    </label>
                    <select className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface appearance-none">
                      <option>CA</option>
                      <option>NY</option>
                      <option>TX</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-sm text-on-surface-variant">
                      ZIP Code
                    </label>
                    <input
                      className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface"
                      placeholder="94103"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  package_2
                </span>
                <h2 className="font-headline-sm text-headline-sm">
                  Shipping Method
                </h2>
              </div>
              <div className="space-y-stack-sm">
                <label className="flex items-center justify-between p-4 border-2 border-primary bg-primary-container/10 rounded-xl cursor-pointer group transition-all">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      className="w-5 h-5 text-primary border-outline-variant"
                      defaultChecked
                    />
                    <div>
                      <p className="font-body-md font-bold text-primary">
                        Standard Delivery
                      </p>
                      <p className="font-body-sm text-on-surface-variant">
                        3-5 business days
                      </p>
                    </div>
                  </div>
                  <span className="font-body-md font-bold">Free</span>
                </label>
                <label className="flex items-center justify-between p-4 border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container transition-all">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="shipping"
                      className="w-5 h-5 text-primary border-outline-variant"
                    />
                    <div>
                      <p className="font-body-md font-bold">
                        Express Shipping
                      </p>
                      <p className="font-body-sm text-on-surface-variant">
                        1-2 business days
                      </p>
                    </div>
                  </div>
                  <span className="font-body-md font-bold">$14.99</span>
                </label>
              </div>
            </section>

            {/* Payment Details (disabled) */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm opacity-60">
              <div className="flex items-center gap-stack-sm mb-stack-md">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
                <h2 className="font-headline-sm text-headline-sm">
                  Payment Details
                </h2>
                <span className="ml-auto text-xs font-label-sm bg-surface-container-high px-2 py-1 rounded">
                  Unlock next step
                </span>
              </div>
              <div className="flex gap-4 mb-stack-md">
                <div className="flex-1 p-3 border border-outline-variant rounded-lg flex items-center gap-3 bg-surface cursor-not-allowed">
                  <span className="material-symbols-outlined">credit_card</span>
                  <span className="font-label-md">Credit Card</span>
                </div>
                <div className="flex-1 p-3 border border-outline-variant rounded-lg flex items-center gap-3 bg-surface cursor-not-allowed">
                  <span className="material-symbols-outlined">
                    account_balance_wallet
                  </span>
                  <span className="font-label-md">PayPal</span>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-between pt-stack-md">
              <Link
                href="/basket"
                className="text-primary font-label-md flex items-center gap-2 hover:underline"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Cart
              </Link>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-headline-sm hover:bg-surface-tint active:scale-95 transition-all shadow-lg disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <aside className="lg:col-span-5 sticky top-24">
            <div className="bg-surface-container-low p-stack-lg rounded-2xl border border-outline-variant/50">
              <h3 className="font-headline-sm text-headline-sm mb-stack-md flex justify-between items-center">
                Order Summary
                <span className="font-label-sm bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">
                  3 Items
                </span>
              </h3>
              <div className="space-y-stack-md mb-stack-lg">
                {[
                  {
                    name: "Nexus Smart Mug",
                    variant: "Matte Obsidian / 12oz",
                    price: "$89.00",
                    qty: 1,
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuZdyrwugRr_eEXuiGhHjjoToJOnvXZShb87pTdD-eOxaN2Xt8nS7bvTrYYy2FEGC_4OVwOx2qMkvy5sNb2sv5A6wbYMKM863wH1EURtpHQggjtNNzLqjyPM5SPeihlK3XgGeoIwSbzOEq34IW5vSR_QY6X-Tj7-9PwG_QMD8TvjgOfMHIZaF-y_Hv0rRDF3dljHHOmgXImoHad0YGF6TSMFsSndcoHi-C3wukD9GbGtZvsTP_Pew7VVEFVPwL3S37ez_lVAaQb2M",
                  },
                  {
                    name: "Orbital Charge Pad",
                    variant: "Brushed Silver",
                    price: "$45.00",
                    qty: 2,
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3ciSpqAX59hbSu7eWcAWSu_tCmlko7kRNdQv9MiFb5Tf_bkJjHeS6d7tr4A7q1AS4eNEp9Gb_Mhn0I5KeImSYjCUcyEbOiI7aHwnK-Qntdm2alg1SCK4EL7LXvTM9Lso3KDidNLIdH8XZqERrDEujHenvj2lKyppUL7D8OVMZGIoRC1Fli7KBKq-Rto9HVmLVHlPO1FUiR-TiZY1EZECUPgLiHqiDr9nhTSTS36j9J1tnGRtWFiEfGUGi0S5vpujs4unJG-4-8kA",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-outline-variant">
                      <img
                        className="w-full h-full object-cover"
                        alt={item.name}
                        src={item.image}
                      />
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex justify-between">
                        <h4 className="font-body-md font-bold">{item.name}</h4>
                        <span className="font-body-md">{item.price}</span>
                      </div>
                      <p className="text-on-surface-variant font-body-sm">
                        {item.variant}
                      </p>
                      <p className="text-on-surface-variant font-body-sm">
                        Qty: {item.qty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2 mb-stack-lg">
                <input
                  className="flex-1 h-11 border border-outline-variant rounded-lg px-4 bg-surface text-body-sm"
                  placeholder="Discount code"
                  type="text"
                />
                <button className="px-6 h-11 bg-surface-container-highest font-bold text-label-md rounded-lg hover:bg-outline-variant transition-colors">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-stack-md border-t border-outline-variant">
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-body-md">Subtotal</span>
                  <span className="font-body-md">$179.00</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-body-md">Shipping</span>
                  <span className="font-body-md">Calculated at next step</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-body-md">Estimated Taxes</span>
                  <span className="font-body-md">$14.32</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-outline-variant">
                  <span className="font-headline-sm text-headline-sm">
                    Total
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary">
                    $193.32
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-stack-lg bg-surface-container-high/50 p-4 rounded-xl flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <div>
                  <p className="font-label-md font-bold">Buyer Protection</p>
                  <p className="text-xs text-on-surface-variant">
                    Full refund if the item is not as described or is lost
                    during shipping.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}