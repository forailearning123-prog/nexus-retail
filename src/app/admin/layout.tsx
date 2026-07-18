"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SIDE NAVIGATION SHELL */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-inverse-surface flex flex-col py-stack-lg z-50">
        <div className="px-6 mb-10">
          <h1 className="font-headline-sm text-headline-sm text-surface-container-lowest font-bold">Nexus Merchant</h1>
          <p className="font-label-sm text-label-sm text-surface-variant/70">Enterprise Admin</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link 
            href="/admin/inventory" 
            className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg transition-all ${pathname === '/admin/inventory' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-surface-variant hover:bg-on-surface-variant/10'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/inventory' ? "'FILL' 1" : "" }}>inventory</span>
            <span className="font-label-md text-label-md">Inventory</span>
          </Link>
          <Link 
            href="/admin/cms" 
            className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg transition-all ${pathname === '/admin/cms' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-surface-variant hover:bg-on-surface-variant/10'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/cms' ? "'FILL' 1" : "" }}>design_services</span>
            <span className="font-label-md text-label-md">CMS (Pages)</span>
          </Link>
          <Link 
            href="/admin/orders" 
            className={`flex items-center gap-3 px-4 py-3 mx-2 my-1 rounded-lg transition-all ${pathname === '/admin/orders' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-surface-variant hover:bg-on-surface-variant/10'}`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: pathname === '/admin/orders' ? "'FILL' 1" : "" }}>shopping_bag</span>
            <span className="font-label-md text-label-md">Orders</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 py-6 space-y-1">
          <button className="w-full flex items-center justify-center gap-2 py-3 mb-4 bg-primary text-on-primary rounded-lg font-label-md hover:brightness-110 transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span>
            Add New Product
          </button>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-white transition-colors">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-label-md text-label-md">View Store</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 text-surface-variant hover:text-white transition-colors w-full text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* TOP APP BAR */}
        <header className="flex justify-between items-center h-16 px-stack-lg sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Merchant Dashboard</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
              <span className="material-symbols-outlined text-on-surface-variant">settings_suggest</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant ml-2 bg-primary flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        {/* FOOTER */}
        <footer className="mt-stack-xl border-t border-outline-variant bg-surface-container-low py-stack-lg">
          <div className="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <div className="md:col-span-1">
              <h5 className="font-headline-sm text-headline-sm font-bold text-on-surface">NexusRetail</h5>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">© 2024 NexusRetail Global. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}