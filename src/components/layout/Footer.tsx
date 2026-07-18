import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low py-stack-xl border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col gap-4">
          <span className="font-headline-sm text-headline-sm font-bold text-on-surface">NexusRetail</span>
          <p className="text-on-surface-variant text-body-sm leading-relaxed">
            Defining the next generation of retail experience through design excellence and technological innovation.
          </p>
          <div className="flex gap-4 mt-2">
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">share</span></Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">mail</span></Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-body-md font-bold text-on-surface">Quick Links</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">About Us</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Careers</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Press Room</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Sustainability</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-body-md font-bold text-on-surface">Customer Support</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Help Center</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Shipping Info</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Track Order</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Returns & Exchanges</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h5 className="font-body-md font-bold text-on-surface">Legal</h5>
          <nav className="flex flex-col gap-2">
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Privacy Policy</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Terms of Service</Link>
            <Link className="text-on-surface-variant text-body-sm hover:text-surface-tint hover:underline transition-opacity" href="#">Cookie Settings</Link>
          </nav>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-margin-desktop mt-stack-xl pt-stack-md border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-body-sm text-on-surface-variant">© 2024 NexusRetail Global. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-outline">payments</span>
          <span className="material-symbols-outlined text-outline">credit_card</span>
          <span className="material-symbols-outlined text-outline">account_balance_wallet</span>
        </div>
      </div>
    </footer>
  );
}
