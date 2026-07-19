"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();

  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  if (items.length === 0) {
    return (
      <main className="max-w-container-max mx-auto px-margin-desktop py-section-gap min-h-[60vh] flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-8xl text-on-surface-variant mb-6">shopping_cart</span>
        <h1 className="font-headline-md text-headline-md mb-3">Your cart is empty</h1>
        <p className="text-on-surface-variant mb-8">Looks like you haven't added anything yet. Start shopping!</p>
        <Link href="/shop" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md hover:brightness-110 transition-all active:scale-95">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-xl min-h-[calc(100vh-200px)]">
      <div className="mb-stack-lg">
        <h1 className="font-headline-md text-headline-md">Your Cart</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-gutter">
          {items.map(item => (
            <div key={item.id} className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-stack-lg items-start">
              <div className="w-28 h-28 flex-shrink-0 bg-surface-container rounded-xl overflow-hidden border border-outline-variant">
                {item.imageUrl ? (
                  <img className="w-full h-full object-cover" alt={item.name} src={item.imageUrl} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant">inventory_2</span>
                  </div>
                )}
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{item.category}</p>
                    <h3 className="font-headline-sm text-headline-sm">{item.name}</h3>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
                <p className="text-body-sm text-on-surface-variant">{formatPrice(item.price)} each</p>
                <div className="flex flex-wrap items-center gap-stack-md pt-2">
                  <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                    <button className="px-3 py-2 hover:bg-surface-container-high transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="px-4 font-label-md text-label-md min-w-[2rem] text-center">{item.quantity}</span>
                    <button className="px-3 py-2 hover:bg-surface-container-high transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                  <button
                    className="flex items-center gap-1 font-label-md text-label-md text-error hover:underline transition-all"
                    onClick={() => removeItem(item.id)}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-md border border-outline-variant space-y-stack-lg">
            <h2 className="font-headline-sm text-headline-sm border-b border-outline-variant pb-stack-sm">Order Summary</h2>
            <div className="space-y-stack-sm">
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">Subtotal ({totalItems} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-tertiary font-medium">{subtotal >= 999 ? "FREE" : formatPrice(99)}</span>
              </div>
              <div className="flex justify-between font-body-md text-body-md">
                <span className="text-on-surface-variant">GST (18%)</span>
                <span>{formatPrice(gst)}</span>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-stack-md">
              <div className="flex justify-between items-baseline mb-stack-md">
                <span className="font-headline-sm text-headline-sm">Total</span>
                <span className="text-3xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg active:scale-[0.98]"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/shop" className="w-full py-3 mt-3 border border-outline-variant rounded-xl font-label-md flex items-center justify-center gap-2 hover:bg-surface-container transition-all">
                Continue Shopping
              </Link>
              <div className="mt-4 text-center">
                <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  Secure 256-bit SSL checkout
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
