import React from "react";
import ProductCard from "@/components/product/ProductCard";

// Dummy data for products
const DUMMY_PRODUCTS = [
  {
    id: "1",
    name: "MacBook Pro M3 Max 14\"",
    category: "Nexus Pro",
    price: 169900,
    originalPrice: 189900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbcGsi87VaFqKzOxYEMYla1cT4UGtWKSvISkgNmLXZzMpEfH6WkfdQV9L7yADIpJ_lA9NI-rVIMUxWJnrZ9L_grMVRdIan-WrQqpCIIAKogQ22lGRa3AJ0OtZodUoJqUo4JyE-J0gLmPeDkRMj0p33XdzY-QI2DVAQ8LoQUo5rwqm7_wIxA1YTXRCuwizQYuGw4Weu_8B6_aQd0o0yUL9hPrmYCY3HiSexACRazExdmcDEQufw1htGDgShU26bQNt4qQJP4WVdrBg",
    badge: { text: "New", type: "new" as const }
  },
  {
    id: "2",
    name: "SonicWave X7 Hybrid ANC",
    category: "Audio Master",
    price: 29900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrsUkkTv2LbH7wRye6n7vu1KFUzrpEMaTT70etHCM7VX7ivNrECTQ_AX2UNHbMQJGcRfJxmak07P84tgjy2iSNaiJVmTBTwg4a6_sZ7dZbEBWlzHKKxV0SmgN2yDSudCvZQAV3fHE3nGp4wiWZ1tOSFAix1ug863yUpyUCdrapEN3H8QaaXMBJgZ0p7ftfg9hDyzd64mpdhmylK17ToKgytJy5qS2pPQ39mXN6MnSwWi7XcTAd3aHBD8SxudX3Sq2mmqLYuLeW7mY",
  },
  {
    id: "3",
    name: "UltraVision Pro 15",
    category: "Nexus Mobile",
    price: 89900,
    originalPrice: 109900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPIQg4TgNHIyUlRmhzjmi1CvTgsmVr311skRJH36fKyjkiucS2YXI1BoLDVD9i9uqMzDMamVvV2caT0n3lTOTGuodE1nwueHslG2X3vGdZ1mJSX2SXbkEAi2WxCdNum7zp71dDeEsj-ksOZRQJ_njHgv6-RA56s5-5iCDlYbL_MVv7trF1LEcxz3JRY-qgtzQ3t8WksecJJ2pOHWJdX_DJDW87oVixoXrFvzK-FKeSGDoxYVhHU46Dbmtjps_irYHPoBSJBhJ3G4M",
    badge: { text: "-15%", type: "sale" as const }
  },
  {
    id: "4",
    name: "Lumix GH6 Cinema Kit",
    category: "Visual Studio",
    price: 219900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBndzsidy31ARgcLABumuYi2Ob0Sf0A2MvcsCoclWac-p_lGpdmbGbmOSwTifinXik1hRy2fATjHfdgL4FMjggFPC167DZtqzJEPo9XwwiL_aCiqoZQ7jb6cB98JA4OhOolEXUpwrqB9B4mNht5XwoPBNd1JNddk2ag0W02PZYb3-aHTc4jBtVDEVn42F8AIMNDY6h7hmeOchvOAi3kVwUps0YU0c8AnPL-_7rnVSXg8bSjU52YMwLg9gtLuNffXYWEyTZRXFo_SNc",
  },
  {
    id: "5",
    name: "StealthKeys RGB Mechanical",
    category: "Nexus Input",
    price: 15900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRyK4Ky-A43b_mNwBIgca0HIIyB5RBpxCpO2aEqOiZPA9iVJ69qFZb-WxE5dUv-vqXobKpw7UGjJWTXbKRiyoXU_F75l-UPEewu2FP2O54LunDV7OYx57sHVbEUyFVIGltHHzsmu7fUbuPQPJJnlEpg4YTSTe9Wxn6_bv2HaMZ2AYsxCfOEyGOYzv1RCYuYJyWSoR_Hv78uXDWiFCjqGR6BYftCpE90NFPShLgiVv3zVnq4oTuM67RIyrpCegRCG8xs4I1bPOG-Pg",
  },
  {
    id: "6",
    name: "ActiveFit 3 Pro Watch",
    category: "Wearables",
    price: 24900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8SuQaZJrvvxXrWTrMsMtIDGuS4s0BDe7Y5pE3DBsy-VE4nDgcgqvkhVuJbgpPIa9g1jjHZSlEPe_RsQkhzg7X_lcdZxyg056YXaOBDAvqkgO3DfD2Ft6_apruVCkC7A4E-bXyTZZAN2WNJiXEOJv3qIJMFy5Tw3GcUdiir5uhn-C56kER5OkzXFrvwEra-mbrmE8IvUOHddYEZ9JxEi8JGQ9OYIfDZkARzaLtVfRUO434PFOkexyRZoNkvY8mt9TLn5dOy1lbYXo",
  },
  {
    id: "7",
    name: "Horizon UltraWide 49\"",
    category: "Displays",
    price: 129900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBywnXjD1CdCcd4Bw8adL_f2vNwnzwfxoa1c1V9dO6Mdf0RFE5Tl1nbbXqVJ5q9OAXiNIYn-fMsrgeljl-Juzr0xF3XuZTw20gcWDplPUsBeh17Pmlr3boVnwRvA1VErzf_IrgKSJ_q5hOuMbueJlmcwb55mpD_5giJv5D7IfQxrkYh9fFKHaxmAV3ig69lncs7kGHyyP6e77_Lhmg2AvxcEMspdm4W1zc9LEBA5ck6gsPm2xMtKaAYQs_vJyuN_-m7aXYteeLzOEY",
  },
  {
    id: "8",
    name: "Velocity 4TB External SSD",
    category: "Storage",
    price: 38900,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuSQGkmcjC-vtqMrfOl0x5ncGgvqThSq09mVF6y5b2C6BwA7GZwNp3fCL5drpRZ9lrk2H5zmZmQewDONLy9yQaftoVbIfHvN5GZC3D1nmN-qpxk6dzgDBUvrekFkYlpmZ0uaUtzp5Z0vYwfEPiw3SoqFbfvrQwUTW2WI9xSOmYvuIW-7nu8-fPkvk-5z3pMdH2as9et0xWk-_mFq-vM9jmzmCBvIZQuMMNRzlyR3kvKW-FdPz9RKpIs67stzhyTuwNpUpj27Dr3pA",
  }
];

export default function ShopPage() {
  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      {/* Breadcrumbs & Title */}
      <div className="mb-stack-lg">
        <nav className="flex text-label-sm text-outline mb-stack-xs">
          <a className="hover:text-primary" href="/">Home</a>
          <span className="mx-2">/</span>
          <span className="text-on-surface">Electronics</span>
        </nav>
        <h1 className="font-headline-md text-headline-md text-on-surface">Premium Tech Essentials</h1>
      </div>

      {/* PLP Layout Container */}
      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Left Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-stack-xl">
            {/* Category Filter */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Category</h3>
              <div className="space-y-stack-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">Laptops & PCs</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">Smartphones</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">Audio Gear</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" type="checkbox" />
                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">Cameras</span>
                </label>
              </div>
            </section>

            {/* Price Range */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Price Range</h3>
              <div className="px-2">
                <input className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" max="200000" min="0" step="1000" type="range" />
                <div className="flex justify-between mt-stack-sm font-label-sm text-outline">
                  <span>₹0</span>
                  <span>₹2,00,000+</span>
                </div>
              </div>
            </section>

            {/* Color Filter */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Color</h3>
              <div className="flex flex-wrap gap-stack-sm">
                <button className="w-8 h-8 rounded-full border border-outline-variant bg-black ring-offset-2 ring-primary focus:ring-2" title="Black"></button>
                <button className="w-8 h-8 rounded-full border border-outline-variant bg-white ring-offset-2 ring-primary focus:ring-2" title="White"></button>
                <button className="w-8 h-8 rounded-full border border-outline-variant bg-[#A0A0A0] ring-offset-2 ring-primary focus:ring-2" title="Silver"></button>
                <button className="w-8 h-8 rounded-full border border-outline-variant bg-[#1a56db] ring-offset-2 ring-primary focus:ring-2" title="Blue"></button>
                <button className="w-8 h-8 rounded-full border border-outline-variant bg-[#e5e7eb] ring-offset-2 ring-primary focus:ring-2" title="Space Gray"></button>
              </div>
            </section>

            {/* Rating Filter */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Rating</h3>
              <div className="space-y-stack-sm">
                <button className="flex items-center gap-2 group w-full text-left">
                  <div className="flex text-surface-tint">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                  </div>
                  <span className="text-body-sm text-on-surface-variant group-hover:text-primary">& Up</span>
                </button>
                <button className="flex items-center gap-2 group w-full text-left">
                  <div className="flex text-surface-tint">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                  </div>
                  <span className="text-body-sm text-on-surface-variant group-hover:text-primary">& Up</span>
                </button>
              </div>
            </section>
          </div>
        </aside>

        {/* Main Product Content */}
        <div className="flex-grow">
          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-surface-container-low rounded-xl p-stack-md mb-stack-lg gap-stack-md">
            <p className="text-body-sm text-on-surface-variant">Showing <span className="font-bold text-on-surface">{DUMMY_PRODUCTS.length}</span> of 148 results</p>
            <div className="flex items-center gap-stack-md w-full sm:w-auto">
              <span className="text-label-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
              <select className="bg-surface border-outline-variant rounded-lg text-body-sm focus:ring-primary focus:border-primary px-4 py-1.5 w-full sm:w-48 outline-none">
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Popular</option>
                <option>Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {DUMMY_PRODUCTS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-section-gap flex justify-center items-center gap-2">
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface-variant disabled:opacity-50" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-md">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors">3</button>
            <span className="text-outline px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors">12</button>
            <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors active:scale-95 text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}