export default function OrderSuccessPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-section-gap min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-tertiary-fixed rounded-full flex items-center justify-center mb-6 animate-bounce">
        <span className="material-symbols-outlined text-5xl text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
      </div>
      <h1 className="font-headline-md text-headline-md mb-3">Order Placed Successfully!</h1>
      <p className="text-on-surface-variant max-w-md mb-8">
        Thank you for your purchase! We've received your order and are preparing it for shipment.
        You'll receive a confirmation email shortly.
      </p>
      <div className="flex gap-4">
        <a href="/shop" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-label-md hover:brightness-110 transition-all active:scale-95">
          Continue Shopping
        </a>
        <a href="/returns" className="border border-outline-variant px-8 py-4 rounded-xl font-label-md hover:bg-surface-container transition-all">
          Returns Policy
        </a>
      </div>
      <p className="text-body-sm text-on-surface-variant mt-8">
        <span className="material-symbols-outlined text-sm align-middle mr-1">replay_30</span>
        7-day hassle-free return policy
      </p>
    </main>
  );
}
