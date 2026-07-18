import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-section-gap fade-in-section is-visible">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-xl items-center">
          <div className="z-10 order-2 lg:order-1">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md mb-stack-md">
              New Collection 2024
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-stack-lg leading-tight">
              Elevate Your Lifestyle <br />With <span className="text-primary">Nexus Premium</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-xl max-w-lg">
              Experience the perfect fusion of cutting-edge technology and minimalist aesthetic. Shop the latest arrivals in high-performance retail gear.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-body-md font-semibold hover:shadow-lg transition-all active:scale-95">
                Shop New Arrivals
              </button>
              <button className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl font-body-md font-semibold hover:bg-surface-container-high transition-all">
                View Lookbook
              </button>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square relative w-full max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 blur-3xl animate-pulse"></div>
              <img 
                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10" 
                alt="A high-end, professional product photograph" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUgo1-ipgZsUPeae2rL6OHA3BEa5kBzLF8jeIBQCRVlUJoMZDYowHCGjII7OYFuvfNMi88PRzPJsT_mmpaBAYlkRntKKRn7dBWuBff6kWNcFvPB_CdfLmPp326DXNpx9DntV6abYhD0blIaqlfZ_h9A2fH1uqhE4RA3IjAysPa-UARPnxLNEKkm6ZxIb9cP54l1IaYzslMiN0AfHKEl72Yd5LmFxvgcfNvWmWs_ISZQLx41FLhGU5Mks1jU0jwtTI0T9xf8KXcNF4" 
              />
              <div className="absolute -bottom-6 -left-6 glass-card p-6 rounded-2xl shadow-xl z-20 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-on-primary p-2 rounded-lg">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Most Wanted</p>
                    <p className="text-body-md font-bold">12k+ Sold this week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="py-section-gap bg-surface fade-in-section is-visible">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="flex justify-between items-end mb-stack-xl">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Trending Categories</h2>
              <p className="text-on-surface-variant mt-2">Curated selections for every facet of your life.</p>
            </div>
            <a className="text-primary font-semibold flex items-center gap-1 hover:underline" href="/shop">
              Explore all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-auto md:h-[600px]">
            {/* Large Feature */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-surface-container-highest cursor-pointer">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBYHenlfoNc0UnRHUp_qxAnTyJu16dupNx4PZ1S49HtAUKy-54As-6Eb7x_C0VqPKvJzrnOjg3XE-oUqZO8DwNu4yo0CLKpogoU1o6vgLvecz4JQEZj0Be9fugfCZY054frBKbetp0zED7xbF7ezDIVnFJWQYX2mekpSUftJ69nc3hLjX2yGHfv4-VnUaTfNIx9ggo9sc7Gm67BU6mUf6t_64crxAF9G0z1RPL18F3NxQ45NIS_ZjBHRy0A3EBaGrB3BSp9Vck-KHc')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-stack-lg">
                <h3 className="text-white font-headline-sm text-headline-sm">Smart Electronics</h3>
                <p className="text-white/80 font-body-sm">The future of home automation.</p>
              </div>
            </div>
            {/* Category 2 */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-surface-container cursor-pointer h-[280px] md:h-auto">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAcyGJ022Iu_PxT0gxuZewJPLdVTafCESUkyEDZuKKksxldQv4ZdKg4KUtT9pzsJS9El1KCGk_EbtImbuj1mtEDUbjLRUrBXpOx5hGeqH2vWWXvKen7Us5HjS0ELvlZEgZRrHFFMxqROMfCrPZswsksD_JHcPd59OcfexmJnLf5npQ1mNL7WkX4IVF3Dyf1g6e9c14VtG-mp2XXLVuAeCpcvDaMQaCYpJi7Ox-gHtrr81I7RSSUKHeSHv_I7uo33FP9Xh3ccX6WeM')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-stack-lg">
                <h3 className="text-white font-headline-sm text-headline-sm">Professional Gear</h3>
                <p className="text-white/80 font-body-sm">Built for the modern achiever.</p>
              </div>
            </div>
            {/* Category 3 */}
            <div className="group relative overflow-hidden rounded-3xl bg-surface-container cursor-pointer h-[280px] md:h-auto">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYZI2V_BdumVcD61-5ovh-dkhBxdHGM12OpWDLo4J9fMv4pFBrNYZmAjgPQPOG7zO-E-UsFqk6ax4b68FNLisjMb_lI7UngqZLAeu_Ef7Luz-nmg-VfcLwFDDELVYo0Lp4ZYBrZl_5ER4PO7F_ZdMFuHirOlsf93rDB4nq6-m3XITTi1wZkzAQhouxhaot9DF-c4CYgODvK5foJZJ_B698LXxINRQWwHMrD3ZX5janWbyrPdlG9e9TdKWlzj12jUX04M44nKJztak')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-stack-lg">
                <h3 className="text-white font-body-lg font-bold">Home Essential</h3>
              </div>
            </div>
            {/* Category 4 */}
            <div className="group relative overflow-hidden rounded-3xl bg-surface-container cursor-pointer h-[280px] md:h-auto">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzC65c-Z8pxljohuVzx-s_GRHipwWXIBtulFM1Krr_WfD6Oyw-fTmAh_KvgQwLdN66fnkcIV-PWvOPteRxFHlCJ4ptgLU-wWQbAQOnZlBm1BpGsVbh_bTpYs89hrXr93LDn1kMErkVwQOT6-r93X_1Dy-mzKbfgYvjeOVuDtsF9VL5tYYYH5MvIGh_Jtx_zUQLspmHOfLx0IQU6ehA4uJV9x6SWSeAuhS7rbQdHVZlmH6ARxVlj77-3Vv8afSLUpQQI5TGy3XCAFg')" }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-stack-lg">
                <h3 className="text-white font-body-lg font-bold">Active Life</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-section-gap fade-in-section is-visible">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-stack-xl">
            <h2 className="font-headline-md text-headline-md text-on-surface">Featured Products</h2>
            <p className="text-on-surface-variant mt-2 max-w-2xl mx-auto">Discover our hand-picked selection of top-performing items, designed for reliability and uncompromising quality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {/* Product Card 1 */}
            <div className="group product-card">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low shadow-sm">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Headphones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWxL6KoLdJ_U1_zx8x__bTnxdx75GDGvHFkqIIZUMlyQLChyoVWYxx7oMSMgnDzOPGr1rfYGXBKqw0ys6bKFpxAYTJyHTQojKmgrNqslNmLMKwzLWkGE_ImBS6dRbd236FRyHIKDxe_7IfMZOlYteP-Xiuo3Nmw5e74wxqF_6t6hkhN1R5oGwtig4AT9sphLHJERD60K9xTxVN1hsG1K4r2HPb4CxRJI--agO_DPXerZU5ydjQg0bG7Sxa2wQdYy-1WhvbLxB_BPo" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-90 quick-add-btn">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
                <span className="absolute top-4 left-4 bg-primary text-on-primary text-label-sm font-label-sm px-3 py-1 rounded-full">Bestseller</span>
              </div>
              <div className="px-2">
                <p className="text-label-sm font-label-sm text-outline mb-1">Nexus Audio</p>
                <h4 className="font-body-md font-semibold text-on-surface mb-1">Aura Pro Wireless Headphones</h4>
                <p className="text-primary font-bold">₹29,900.00</p>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="group product-card">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low shadow-sm">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Smartwatch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1rOa4ydK3K1486Jr9JnK4PfFpVGKVKajbyu6iSJ0NLpPlVpF5PghqUO7EqF-9LBXQEz2JPyXUgElEMGrfMe9fs8aCevf3UTwY0ppPEVOtYgLo9NGaFVwMZpMQbLKpzHTtmGy1DROHWCTcapDzUt1_4WhaDzxoFW5eMuoi76Xqtp-vC9x3AcWexy-uGt8EOK4Dmj8b9FCx2Q50HBhNKGQlc3SpbgXM_3TOAjFYoJgHVNiaJYNEQU7i3ljwGSsi3BEkHdbI5midKi4" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-90 quick-add-btn">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <div className="px-2">
                <p className="text-label-sm font-label-sm text-outline mb-1">Nexus Wearables</p>
                <h4 className="font-body-md font-semibold text-on-surface mb-1">Vanguard Smart Watch</h4>
                <p className="text-primary font-bold">₹18,900.00</p>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="group product-card">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low shadow-sm">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Laptop Stand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClu7RmO3iKfLA6tUaAVJ5Ar0sWaBhvNNWjVcFeJGA1FFb2zkenP8pQVp3UF7A25UfeS5Dk7WeJjn889g6TpQqI3T8qxzqU8vqKSBnAyQDetKc_Gzqg-XqOsHEsubNzK5eUG7IJAm4cKOW06exkMpvF9SPqZzAWwnRwzo6dWkIsSB-fRst88MUJ1ehuH9735jnl8W0IqrA6HTdTkSp8EIHjF4LwRX6g2wURvyn7FVCHsd7_Az-AfivPXktfJY7eyvXYGdvbEpBw1vc" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-90 quick-add-btn">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
              <div className="px-2">
                <p className="text-label-sm font-label-sm text-outline mb-1">Nexus Office</p>
                <h4 className="font-body-md font-semibold text-on-surface mb-1">Aura Lift Laptop Stand</h4>
                <p className="text-primary font-bold">₹7,900.00</p>
              </div>
            </div>
            {/* Product Card 4 */}
            <div className="group product-card">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low shadow-sm">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Core Hub" src="https://lh3.googleusercontent.com/aida-public/AB6AXuASJpueRf3atKHd2gAoWLY0HxcPB8hkASfra1Zam5hfeK8JBOR7jlBE5jU2Izr-Ms7GhUS5MyP6xJADSF2KRUvSeYGunIJX547UQ3AIoW5EZKOmxr9l8XjFHYwI5Mx8o-8z4cPKO3wtOj3Zj0Dfp81AAYE1u8AcsusiMi05P9YgD9ZVyJwQiahkLwL2hejofw1RQk9oaKIq__FkD3_8Og5FBeloBtW-2qLQc44tN0_ILPP5lLUYhrHZWdEXhlZnaUA90mq9UOaWCJ0" />
                <button className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-primary p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all active:scale-90 quick-add-btn">
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
                <span className="absolute top-4 left-4 bg-error text-on-error text-label-sm font-label-sm px-3 py-1 rounded-full">Limited Edition</span>
              </div>
              <div className="px-2">
                <p className="text-label-sm font-label-sm text-outline mb-1">Nexus Connect</p>
                <h4 className="font-body-md font-semibold text-on-surface mb-1">Nexus Core Hub Gen 2</h4>
                <p className="text-primary font-bold">₹24,900.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-section-gap px-margin-desktop fade-in-section is-visible">
        <div className="max-w-container-max mx-auto bg-inverse-surface rounded-[40px] p-stack-xl relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="400" cy="0" fill="white" r="400"></circle>
            </svg>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-stack-xl items-center">
            <div>
              <h2 className="font-headline-md text-headline-md text-surface-container-lowest mb-4">Join the Nexus Community</h2>
              <p className="text-surface-variant font-body-md">Get exclusive access to early product drops, member-only deals, and the latest trends in technology and lifestyle.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input className="flex-1 bg-surface/10 border border-white/20 rounded-xl px-6 py-4 text-white focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Enter your email" type="email" />
              <button className="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-body-md font-semibold hover:bg-primary transition-all active:scale-95 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}