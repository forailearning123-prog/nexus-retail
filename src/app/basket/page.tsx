"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BasketItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

const initialItems: BasketItem[] = [
  {
    id: 1,
    name: "Nexus Pro Audio G2",
    variant: "Matte Charcoal | Wireless",
    price: 299.0,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-fdteF4SyFHG0XmF_EoBOMAvkvhAmSXhJvk8Wd3F8UpRKgQLnKnsQ8CBlQX-jcKiEnv0G6XwPR0tnPwK_DZc9yH_hV7C1NIPzX1mX-RPbkmXCoirVqv7u1lkOKNXog5Y4BKssM8a4dePskXMcPfRgK7DPAvBprNi-iYaCd0ZzIx3J-j18AuZggpPBGAtZ6DrRHRsNV0rkto_oGD4iAcGy4QF4bbf0f8XV8tvaiavZfCLcGAImP0pe9xeo3OFGQlxw0WpaCyaGvss",
  },
  {
    id: 2,
    name: "Nexus Flow Keyboard",
    variant: "Cloud Silver | Mechanical",
    price: 159.0,
    quantity: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJw7c73Qg2lN8YzGBqdzDTkPtyLqlkdxadFzf7m5aGUfSzJBjXPGAGrQg5s3ulABE7OxVio7XbuybF3Q1ZkpVLZWXXG9sdiBx4G3KIfttrU-DUymY7wB-7YGgEbpCouIpszjiB32izYhj7Yc1taG8PsBRWT9P5o_Xbs7qefkNclIXeE2_dyDGfXtuKirNLXGAE_ej2ftgucmSxoHe3UBeuOu6YG3gfscwH-cGu4lwDBQ4ctAp7I6zjBAnkBZFKPL4-wdnNVc85fzU",
  },
];

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>(initialItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-xl min-h-[calc(100vh-200px)] flex-1 w-full">
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md">
            Your Shopping Basket
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Review your selections before checkout.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-gutter">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm border border-outline-variant flex flex-col md:flex-row gap-stack-lg items-center"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-surface-container-high rounded-lg overflow-hidden border border-outline-variant">
                  <img
                    className="w-full h-full object-cover"
                    alt={item.name}
                    src={item.image}
                  />
                </div>
                <div className="flex-grow space-y-stack-sm text-center md:text-left">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm">
                        {item.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {item.variant}
                      </p>
                    </div>
                    <span className="font-headline-sm text-headline-sm text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center md:justify-between gap-stack-md pt-stack-sm">
                    <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                      <button
                        className="px-3 py-2 hover:bg-surface-container-high transition-colors"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <span className="material-symbols-outlined text-body-md">
                          remove
                        </span>
                      </button>
                      <span className="px-4 font-label-md text-label-md">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-2 hover:bg-surface-container-high transition-colors"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <span className="material-symbols-outlined text-body-md">
                          add
                        </span>
                      </button>
                    </div>
                    <button
                      className="flex items-center gap-1 font-label-md text-label-md text-error hover:underline transition-all"
                      onClick={() => removeItem(item.id)}
                    >
                      <span className="material-symbols-outlined text-body-sm">
                        delete
                      </span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Section */}
            <div className="bg-secondary-container/30 p-stack-lg rounded-xl border border-secondary-fixed flex flex-col md:flex-row items-center justify-between gap-stack-md">
              <div className="flex items-center gap-stack-md">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sell
                </span>
                <p className="font-body-md text-body-md">
                  Have a promotional code?
                </p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <input
                  className="flex-grow md:w-48 px-4 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-label-md"
                  placeholder="CODE2024"
                  type="text"
                />
                <button className="px-6 py-2 bg-on-surface-variant text-surface-container-lowest rounded-lg font-label-md hover:bg-on-surface transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="bg-surface-container-lowest p-stack-lg rounded-xl shadow-md border border-outline-variant space-y-stack-lg">
              <h2 className="font-headline-sm text-headline-sm border-b border-outline-variant pb-stack-sm">
                Order Summary
              </h2>
              <div className="space-y-stack-sm">
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">
                    Estimated Shipping
                  </span>
                  <span className="text-tertiary font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-body-md text-body-md">
                  <span className="text-on-surface-variant">
                    Estimated Tax (8%)
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-stack-md">
                <div className="flex justify-between items-baseline mb-stack-md">
                  <span className="font-headline-sm text-headline-sm">
                    Total
                  </span>
                  <span className="font-display-lg-mobile text-display-lg-mobile text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm flex items-center justify-center gap-2 hover:bg-surface-tint transition-all shadow-lg active:scale-[0.98]"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
                <div className="mt-stack-lg space-y-stack-sm text-center">
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      verified_user
                    </span>
                    Secure 256-bit SSL encrypted checkout
                  </p>
                  <div className="flex justify-center gap-4 opacity-40">
                    <span className="material-symbols-outlined">
                      credit_card
                    </span>
                    <span className="material-symbols-outlined">
                      account_balance_wallet
                    </span>
                    <span className="material-symbols-outlined">
                      contactless
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-stack-lg p-stack-md bg-surface-container rounded-lg border border-outline-variant">
              <p className="font-label-md text-label-md text-on-surface-variant italic">
                &ldquo;NexusRetail ensures a carbon-neutral shipping experience
                for all enterprise orders.&rdquo;
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}