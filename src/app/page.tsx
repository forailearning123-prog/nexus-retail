import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default async function Home() {
  const cmsRecord = await prisma.cmsContent.findUnique({ where: { pageName: 'HOME_MARKETING' } });
  const cms = cmsRecord?.content as any || {
    heroTitle: "Elevate Your Lifestyle With Nexus Premium",
    heroSubtitle: "Experience the perfect fusion of cutting-edge technology and minimalist aesthetic. Shop the latest arrivals in high-performance retail gear.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUgo1-ipgZsUPeae2rL6OHA3BEa5kBzLF8jeIBQCRVlUJoMZDYowHCGjII7OYFuvfNMi88PRzPJsT_mmpaBAYlkRntKKRn7dBWuBff6kWNcFvPB_CdfLmPp326DXNpx9DntV6abYhD0blIaqlfZ_h9A2fH1uqhE4RA3IjAysPa-UARPnxLNEKkm6ZxIb9cP54l1IaYzslMiN0AfHKEl72Yd5LmFxvgcfNvWmWs_ISZQLx41FLhGU5Mks1jU0jwtTI0T9xf8KXcNF4"
  };

  const categories = await prisma.category.findMany({ take: 4, orderBy: { createdAt: 'asc' } });
  const featuredProducts = await prisma.product.findMany({ where: { isFeatured: true }, take: 4, include: { category: true } });

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-section-gap fade-in-section is-visible">
        <div className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-stack-xl items-center">
          <div className="z-10 order-2 lg:order-1">
            <span className="inline-block py-1 px-3 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md mb-stack-md">
              New Collection 2024
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-stack-lg leading-tight" dangerouslySetInnerHTML={{ __html: cms.heroTitle }} />
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-xl max-w-lg">
              {cms.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="bg-primary-container text-on-primary px-8 py-4 rounded-xl font-body-md font-semibold hover:shadow-lg transition-all active:scale-95">
                Shop New Arrivals
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-square relative w-full max-w-[600px] mx-auto">
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 blur-3xl animate-pulse"></div>
              <img 
                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10" 
                alt="Hero image" 
                src={cms.heroImage} 
              />
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
            <Link className="text-primary font-semibold flex items-center gap-1 hover:underline" href="/shop">
              Explore all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-gutter h-auto md:h-[600px]">
            {categories.map((cat, index) => {
              const isLarge = index === 0;
              const isMedium = index === 1;
              const bgUrl = cat.imageUrl || 'https://via.placeholder.com/800x600';
              
              const baseClasses = "group relative overflow-hidden rounded-3xl bg-surface-container cursor-pointer h-[280px] md:h-auto";
              const layoutClasses = isLarge ? "md:col-span-2 md:row-span-2 bg-surface-container-highest" : isMedium ? "md:col-span-2" : "";

              return (
                <Link href={`/shop?category=${cat.id}`} key={cat.id} className={`${baseClasses} ${layoutClasses}`}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 bg-cover bg-center" style={{ backgroundImage: `url('${bgUrl}')` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-stack-lg">
                    <h3 className={`text-white ${isLarge || isMedium ? 'font-headline-sm text-headline-sm' : 'font-body-lg font-bold'}`}>{cat.name}</h3>
                    {(isLarge || isMedium) && <p className="text-white/80 font-body-sm mt-1">{cat.description || "Explore collection"}</p>}
                  </div>
                </Link>
              );
            })}
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
            {featuredProducts.length === 0 ? (
              <p className="col-span-4 text-center py-10 text-on-surface-variant">No featured products available. Set products as featured in the admin panel.</p>
            ) : featuredProducts.map((product) => (
              <Link href={`/shop/${product.id}`} key={product.id} className="group product-card block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-container-low shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={product.name} src={product.imageUrl || 'https://via.placeholder.com/400x500'} />
                  <span className="absolute top-4 left-4 bg-primary text-on-primary text-label-sm font-label-sm px-3 py-1 rounded-full flex items-center gap-1"><span className="material-symbols-outlined text-xs">star</span> Featured</span>
                </div>
                <div className="px-2">
                  <p className="text-label-sm font-label-sm text-outline mb-1">{product.category.name}</p>
                  <h4 className="font-body-md font-semibold text-on-surface mb-1">{product.name}</h4>
                  <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                </div>
              </Link>
            ))}
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