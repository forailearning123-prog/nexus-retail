"use client";

import React, { useState } from "react";

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) {
      setMessage({ type: 'error', text: 'Please enter both Order Number and Email Address.' });
      return;
    }

    setIsSearching(true);
    setMessage(null);

    // Simulate API call to check order date (7-day logic)
    setTimeout(() => {
      // In a real app, we would fetch the order and check `createdAt`
      // For demonstration, let's assume standard success
      if (orderNumber.startsWith("NX-")) {
        setMessage({ type: 'success', text: 'Order found! Redirecting to secure returns portal...' });
        // window.location.href = `/returns/${orderNumber}`;
      } else {
        setMessage({ type: 'error', text: 'Order not found or is outside the 7-day return window.' });
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section: Returns Policy Overview */}
      <section className="relative bg-surface-container-lowest py-section-gap overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-margin-desktop relative z-10">
          <div className="max-w-2xl">
            <span className="bg-primary-container text-on-primary-fixed-variant px-3 py-1 rounded-full font-label-md text-label-md inline-block mb-4">Hassle-Free Returns</span>
            <h1 className="font-display-lg text-display-lg mb-stack-md">Returns &amp; Exchanges</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-xl">
              We stand behind our products. If you're not 100% satisfied with your purchase, we're here to help you make it right within our <span className="font-bold text-primary">7-day return window</span>.
            </p>
            {/* Policy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">calendar_today</span>
                <h3 className="font-headline-sm text-headline-sm text-sm">7-Day Window</h3>
                <p className="text-on-surface-variant text-sm">Standard return period from the date of delivery.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                <h3 className="font-headline-sm text-headline-sm text-sm">Free Shipping</h3>
                <p className="text-on-surface-variant text-sm">Pre-paid labels provided for all authorized domestic returns.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary text-3xl">currency_exchange</span>
                <h3 className="font-headline-sm text-headline-sm text-sm">Fast Refunds</h3>
                <p className="text-on-surface-variant text-sm">Refunds processed within 5-7 business days of receipt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="py-section-gap bg-surface">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Find Your Order Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-stack-xl rounded-xl shadow-sm border border-outline-variant">
              <div className="mb-stack-lg">
                <h2 className="font-headline-md text-headline-md mb-2">Find Your Order</h2>
                <p className="text-on-surface-variant">Enter your details below to start a return, check status, or request an exchange.</p>
              </div>
              
              {message && (
                <div className={`p-4 mb-4 rounded-lg ${message.type === 'error' ? 'bg-error-container text-on-error-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSearch} className="space-y-stack-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Order Number</label>
                    <input 
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className="h-12 border-outline-variant rounded-lg focus:border-primary focus:ring-primary text-body-md px-4 bg-transparent border" 
                      placeholder="e.g. NX-123456" 
                      type="text" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md text-on-surface">Email Address</label>
                    <input 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-outline-variant rounded-lg focus:border-primary focus:ring-primary text-body-md px-4 bg-transparent border" 
                      placeholder="email@example.com" 
                      type="email" 
                    />
                  </div>
                </div>
                <div className="pt-stack-md">
                  <button 
                    disabled={isSearching}
                    className="w-full md:w-auto px-10 h-12 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-surface-tint transition-all active:scale-95 shadow-md disabled:opacity-50" 
                    type="submit"
                  >
                    {isSearching ? 'Searching...' : 'Continue to Returns Portal'}
                  </button>
                  <p className="mt-4 text-xs text-on-surface-variant italic">By clicking continue, you agree to our Terms of Service regarding returns and exchanges.</p>
                </div>
              </form>
            </div>
            
            {/* Visual Sidecar / Image */}
            <div className="lg:col-span-5 h-full min-h-[400px]">
              <div className="relative w-full h-full rounded-xl overflow-hidden group shadow-md bg-surface-container-high">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtrMpmGopaiey-68cc6IIRPe6mw2o79bx-4CM_7F3zgHb7r4V_DYMWsMdjxrwLz-wSumVWict7WK77bUuLmS4aOvH3leVYsyuEqYC5evH8A9rc2nXghn2WdC8mQBRpYDYOzLwKgXOOGSbfDBKK9y8rv6VrprQ4_jwnceJ1oRhkegh576DRlLmOrIduSxqA5d1P3gl-hOP8i-NHLzD_Z-jD-6O85A5EqsKtL8pg5D3bz5GL20agIZod7pL-a-7AHKpetB_m2YkzVE4" 
                  alt="Warehouse" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-stack-lg">
                  <div className="text-white">
                    <p className="font-bold text-lg">Sustainable Packaging</p>
                    <p className="text-sm opacity-90">Every return label includes a carbon-neutral shipping credit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-section-gap bg-surface-container-low">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-0">
          <div className="text-center mb-stack-xl">
            <h2 className="font-headline-md text-headline-md mb-4">Frequently Asked Questions</h2>
            <p className="text-on-surface-variant">Everything you need to know about our return process.</p>
          </div>
          <div className="space-y-stack-sm">
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
              <summary className="flex justify-between items-center p-stack-lg cursor-pointer list-none select-none hover:bg-surface-container transition-colors">
                <span className="font-label-md text-label-md text-lg">How long does it take to get a refund?</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="p-stack-lg pt-0 text-on-surface-variant border-t border-outline-variant/30">
                  Once your return is received and inspected at our warehouse, your refund will be processed and automatically applied to your original method of payment within 5 to 7 business days.
              </div>
            </details>
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
              <summary className="flex justify-between items-center p-stack-lg cursor-pointer list-none select-none hover:bg-surface-container transition-colors">
                <span className="font-label-md text-label-md text-lg">Can I exchange an item for a different size?</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="p-stack-lg pt-0 text-on-surface-variant border-t border-outline-variant/30">
                  Absolutely! Our 'Find Your Order' portal allows you to select an exchange option. If the replacement is in stock, we'll reserve it for you immediately.
              </div>
            </details>
            <details className="group bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
              <summary className="flex justify-between items-center p-stack-lg cursor-pointer list-none select-none hover:bg-surface-container transition-colors">
                <span className="font-label-md text-label-md text-lg">What items are non-returnable?</span>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
              </summary>
              <div className="p-stack-lg pt-0 text-on-surface-variant border-t border-outline-variant/30">
                  For hygiene and safety reasons, we cannot accept returns on opened personal care products, customized items, and final sale clearance goods.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA / Support Section */}
      <section className="py-section-gap">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="bg-primary-container rounded-3xl p-stack-xl flex flex-col md:flex-row items-center justify-between gap-stack-lg">
            <div className="text-white max-w-xl">
              <h2 className="font-headline-md text-headline-md mb-2">Still need help?</h2>
              <p className="opacity-90">Our customer success team is available 24/7 to assist with complex returns or unique situations.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 h-12 bg-white text-primary font-bold rounded-lg hover:bg-surface transition-colors">Chat With Us</button>
              <button className="px-8 h-12 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-colors">Email Support</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
