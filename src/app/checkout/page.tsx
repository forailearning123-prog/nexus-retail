"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

declare global {
  interface Window { Razorpay: any; }
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

const INDIAN_STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "Maharashtra", pincode: "",
  });

  const gst = subtotal * 0.18;
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + gst + shipping;

  const handlePayment = async () => {
    if (!form.email || !form.firstName || !form.address) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsProcessing(true);

    try {
      // 1. Create Razorpay order
      const razorpayRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100) }), // in paise
      });
      const razorpayOrder = await razorpayRes.json();

      if (razorpayOrder.error) {
        alert("Payment initialization failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "NexusRetail",
        description: `Order for ${items.length} item(s)`,
        order_id: razorpayOrder.id,
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          contact: form.phone,
        },
        notes: { address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}` },
        theme: { color: "#003fb1" },
        handler: async function (response: any) {
          // 3. Verify payment
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
            // 4. Save order to DB
            await fetch("/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: form.email,
                name: `${form.firstName} ${form.lastName}`,
                isGuest: true,
                items: items.map(i => ({ productId: i.id, quantity: i.quantity, price: i.price })),
                address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
                razorpayId: response.razorpay_payment_id,
              }),
            });

            clearCart();
            router.push("/order-success");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-margin-desktop py-section-gap min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-8xl text-on-surface-variant mb-6">shopping_cart</span>
        <h1 className="font-headline-md text-headline-md mb-3">Your cart is empty</h1>
        <Link href="/shop" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md hover:brightness-110 transition-all">
          Go Shopping
        </Link>
      </main>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-xl">
        <h1 className="font-headline-md text-headline-md mb-stack-xl">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-stack-lg">
            {/* Contact */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
              <h2 className="font-headline-sm text-headline-sm mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">First Name *</label>
                  <input className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Rahul" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">Last Name</label>
                  <input className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Sharma" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">Email Address *</label>
                  <input type="email" className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="rahul@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">Phone Number</label>
                  <input type="tel" className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
            </section>

            {/* Shipping */}
            <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm">
              <h2 className="font-headline-sm text-headline-sm mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                Shipping Address *
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">Street Address *</label>
                  <input className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Flat no, Building, Street" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">City</label>
                  <input className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="Mumbai" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">PIN Code</label>
                  <input className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="400001" value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface-variant">State</label>
                  <select className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" value={form.state} onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-between pt-stack-md">
              <Link href="/cart" className="text-primary font-label-md flex items-center gap-2 hover:underline">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Cart
              </Link>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="bg-primary text-on-primary px-10 py-4 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? (
                  <><span className="material-symbols-outlined animate-spin">sync</span>Processing...</>
                ) : (
                  <><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>Pay {formatPrice(total)}</>
                )}
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="lg:col-span-5 sticky top-24">
            <div className="bg-surface-container-low p-stack-lg rounded-2xl border border-outline-variant/50 space-y-stack-md">
              <h3 className="font-headline-sm text-headline-sm flex justify-between items-center">
                Order Summary
                <span className="font-label-sm bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">{items.length} items</span>
              </h3>

              {/* Cart items */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-surface border border-outline-variant overflow-hidden">
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-xl text-on-surface-variant">inventory_2</span></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-label-md text-label-md truncate">{item.name}</p>
                      <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-label-md whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-3 border-t border-outline-variant text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-tertiary font-medium" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>GST (18%)</span><span>{formatPrice(gst)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-outline-variant font-bold text-base">
                  <span>Total</span><span className="text-primary text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust badge */}
              <div className="bg-surface-container-high/50 p-4 rounded-xl flex items-center gap-3 mt-4">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <div>
                  <p className="font-label-md font-bold">Secure Checkout</p>
                  <p className="text-xs text-on-surface-variant">256-bit SSL encrypted payment via Razorpay</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}