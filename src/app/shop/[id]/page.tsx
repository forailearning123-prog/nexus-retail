"use client";

import React, { useState } from "react";
import Image from "next/image";

const DUMMY_PRODUCT = {
  id: "1",
  name: "Nexus Ultra Pro-X",
  tagline: "High-Fidelity Noise Canceling Wireless Over-Ear Headphones",
  price: 12999, // In INR (original was 129.99, so let's say ₹12,999)
  originalPrice: 15900,
  saving: 2901,
  rating: 4.8,
  reviewsCount: 1284,
  description: "The Nexus Ultra Pro-X redefines the listening experience with our proprietary Adaptive Isolation™ technology. Designed for global travelers and professional creators, these headphones monitor ambient noise 48,000 times per second to provide a pure, uninterrupted soundstage.",
  features: [
    "40-hour battery life with Fast-Charge (10 mins = 5 hours)",
    "Multi-point Bluetooth pairing for seamless switching",
    "Ultra-soft memory foam earcups for all-day comfort"
  ],
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBK2yEc5uZhNeyOyEy2gsO0XbHfasJYR6IYFff3JubUCaJ4zt8gg1WyBfRGkGtCtYF0LPdbFeUkRqYgKlzjHP2sem064gz1wMUV-NMTRAH6i97hl9ztLfjXxpYzgHinrZROgBM_FdwIRPlCCmj9hN2MAIre3VMbwpgWcYw5X9szqG_-Q_qeZofJKrVf6-JESEe5VjlIudVpgQ8R-cO-pgVYjAiGyIzFtUFvOCI4B-GcedA_XUJlhTxs3HNhpHND81PtHccZMZWDnKQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCQNLKMDrkMlSEOfqwI4yCs7Awbcr0cpVrJr6WU3r_eriZIupI7ecqKErdn_b3Ek3t6oa973q05FTOJXc-X5k7wuNTSZ4pPAB4z6hNawhaD1xx9xe_3Lp8JVVETJqVShZXaCwVJwvg-0VgwvFpjbsEaBlek_kde3AWriZaHMM5l3mVos3_6c6DYRdTMLZe0XzJxxQXUVo7x02NpU8_ue55CC5aZ2xj_Y4Viwn5OIwbH6E6nA_-hCna037R2zfhWjgMhfvXqXsQ6lD8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDARx7pgbI0g13EQlXWttr5H7CgTlKoEwKHpeQwLmd8-SBYapwOJJCxABUhGH92YNuKOODgYCVyxxW7gFOXC-Q_O62Y1oM4NWRqd4y5Xww11nUvbwzaaKy0OldhvxH6mHGQ41xDwyqYUskndYn_7bYtmwezInD88F1-PSD9r7dkfQUnyq6H82FMFhyisBVSQ4U33y-4n5Gp31HZlVjTSePR1t-ylAFXZffiiVzrrK5fA9m5247Y0lkGD2md7BAL0JGR0ug4nG8Us",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBXddzqOb9YA_4w3nUjMg6cPdDA5Xr9usyjFjtmbGkWhA4zJO5QfYKyxmUKccTV3w-SJHT--LKHZmyVqyKXVc2t7-LouJ587E9Hb_y7LCIF1f-j9JaUzOuddQJ_5kT5EN9HHI4U6mvE5pPnb-6YP7ioW8rvz7shMsho0yTaak77WeF1Iu5-MHDYVTI4UjitouWNT4IFGJJr2ttig_ZlrgjqE5KnAZIDR8csvZb-0PeEhXUO4cj6RT1Sw420-DsIcs8cPav8-Zl0HMk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDUNpyfUf6JyEFQD-MigB8bWxhTU_t_mN2wCzLVXs8tnWXf5KcxlojxPeeS_uq98YK3HUYRIjLxnxAQGO1IqiZK6OtxYpeLcDcpk50BZ---NoO9-oBxoPfRShqjNp2RKHqCVCg5HISILL4EXQ_EaxJeP_tTPJZ4U3AOM02M4GNw-zcNw4XXsPQER26PRo3MdNKeDi2OhfrMTzHda4lU2MS7w7abb3rM_GOHaBPeFPAz5yoGYxH1OhpOnED95_bA7J0X9LVYV_xKsFo"
  ],
  specs: [
    { label: "Driver Size", value: "40mm Liquid Crystal Polymer" },
    { label: "Frequency Response", value: "4Hz - 40,000Hz" },
    { label: "Weight", value: "250g (Ultra-Lightweight)" },
    { label: "Microphones", value: "8 (Dual Beamforming)" },
    { label: "Voice Assistant", value: "Alexa, Google, Siri" },
    { label: "Warranty", value: "2-Year Manufacturer" }
  ]
};

export default function ProductDetailPage() {
  const [activeImage, setActiveImage] = useState(DUMMY_PRODUCT.images[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }, 800);
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-stack-lg text-label-md font-label-md text-on-surface-variant">
        <a className="hover:text-primary transition-colors" href="/shop">Shop</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <a className="hover:text-primary transition-colors" href="#">Electronics</a>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-on-surface">{DUMMY_PRODUCT.name}</span>
      </nav>

      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-5 gap-stack-md">
          {/* Main Image */}
          <div className="md:col-span-4 rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest aspect-square group relative">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              src={activeImage} 
              alt={DUMMY_PRODUCT.name} 
            />
            <div className="absolute top-4 right-4">
              <button className="bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:text-error transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              </button>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="md:col-span-1 flex md:flex-col gap-stack-sm order-last md:order-none overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {DUMMY_PRODUCT.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`flex-shrink-0 w-20 h-20 md:w-full rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:opacity-80 ${activeImage === img ? 'border-primary' : 'border-outline-variant hover:border-primary'}`}
              >
                <img className="w-full h-full object-cover" src={img} alt={`Thumbnail ${idx}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:col-span-5 space-y-stack-lg">
          <div>
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider">Top Rated</span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-2">{DUMMY_PRODUCT.name}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">{DUMMY_PRODUCT.tagline}</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-[#FFB800]">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star_half</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface-variant">({DUMMY_PRODUCT.reviewsCount} Customer Reviews)</span>
            </div>
          </div>
          
          <div className="border-y border-outline-variant py-stack-md">
            <div className="flex items-baseline gap-4">
              <span className="font-display-lg text-display-lg font-bold text-primary">{formatPrice(DUMMY_PRODUCT.price)}</span>
              <span className="text-on-surface-variant line-through font-body-md">{formatPrice(DUMMY_PRODUCT.originalPrice)}</span>
              <span className="text-tertiary font-label-md">Save {formatPrice(DUMMY_PRODUCT.saving)}</span>
            </div>
            <p className="text-label-sm text-outline mt-2 italic">Excluding tax, shipping calculated at checkout</p>
          </div>

          {/* Variants */}
          <div className="space-y-stack-md">
            <div>
              <p className="font-label-md font-bold mb-2">Color: <span className="text-on-surface-variant font-normal">Obsidian Black</span></p>
              <div className="flex gap-stack-sm">
                <button className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-900 ring-2 ring-offset-2 ring-transparent transition-all"></button>
                <button className="w-10 h-10 rounded-full border border-outline-variant bg-zinc-400 hover:border-primary transition-all"></button>
                <button className="w-10 h-10 rounded-full border border-outline-variant bg-slate-200 hover:border-primary transition-all"></button>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-label-md font-bold">Connectivity Option</p>
                <a className="text-primary text-label-sm underline" href="#">Comparison Chart</a>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-6 py-3 rounded-lg border-2 border-primary bg-primary-fixed text-on-primary-fixed font-label-md transition-all">Bluetooth 5.3</button>
                <button className="px-6 py-3 rounded-lg border border-outline-variant hover:border-primary transition-all font-label-md">Hybrid (Wired + Wireless)</button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-stack-sm">
            <button 
              onClick={handleAddToCart}
              className={`w-full font-body-lg text-body-lg font-bold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 ${
                added ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary hover:brightness-110 active:scale-[0.98]'
              } ${isAdding ? 'opacity-80' : ''}`}
            >
              {isAdding ? (
                <><span className="material-symbols-outlined animate-spin">sync</span> Adding...</>
              ) : added ? (
                <><span className="material-symbols-outlined">check_circle</span> Added to Cart</>
              ) : (
                <><span className="material-symbols-outlined">shopping_cart</span> Add to Cart</>
              )}
            </button>
            <button className="w-full bg-inverse-surface text-surface font-body-lg text-body-lg font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all">
              Buy Now
            </button>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/30">
            <div className="bg-primary/10 p-2 rounded-full">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
            </div>
            <div>
              <p className="text-label-md font-bold">Fast & Free Delivery</p>
              <p className="text-label-sm text-on-surface-variant">Order within the next 2h 45m for tomorrow delivery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant p-4 z-40 lg:hidden flex gap-3">
        <button 
          onClick={handleAddToCart}
          className={`flex-1 font-label-md py-3 rounded-lg flex items-center justify-center gap-2 ${
            added ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary'
          }`}
        >
          {added ? <span className="material-symbols-outlined text-[20px]">check</span> : <span className="material-symbols-outlined text-[20px]">shopping_cart</span>}
          {added ? 'Added' : 'Add'}
        </button>
        <button className="flex-1 bg-inverse-surface text-surface font-label-md py-3 rounded-lg">Buy Now</button>
      </div>

      {/* Below the Fold: Sections */}
      <div className="mt-section-gap space-y-section-gap">
        {/* Description Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-stack-md">Engineered for Silence. Crafted for Sound.</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg leading-relaxed">
              {DUMMY_PRODUCT.description}
            </p>
            <ul className="space-y-stack-sm">
              {DUMMY_PRODUCT.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-body-sm">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg aspect-video">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKNdpqM9f-eAK0alYpXyQ6NGcBgPOKvIWYwsBZuna8HZIweh3nvys9Fzg1W44o5rJap84EhjQmG2tHP2BiON2Oz3unvf8aOhbJIL5eKLonYVW_z2WGWvkgm6aOqrPwefTpd9BSBo92B1qJTUDv2XlB5nQpkIpalwDDK9tWFoqQ_op-0CHSFBAQUlra8xCL_AuXizXS7k_CR9j3c9E9l83JwIL8LABZHS7Zxwx8T_f7AakJsETuW9-ZYBcGpA8S_M_wmrIqTIaNlBY" 
              alt="Lifestyle"
            />
          </div>
        </section>

        {/* Technical Specs Section */}
        <section className="bg-surface-container-low rounded-3xl p-stack-xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface text-center mb-stack-xl">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-md">
              {DUMMY_PRODUCT.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-stack-sm border-b border-outline-variant">
                  <span className="text-on-surface-variant font-label-md">{spec.label}</span>
                  <span className="font-bold text-on-surface">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-xl gap-stack-lg">
            <div>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Verified Customer Reviews</h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-display-lg text-display-lg font-bold">{DUMMY_PRODUCT.rating}</span>
                <div>
                  <div className="flex text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-label-sm text-outline">Based on {DUMMY_PRODUCT.reviewsCount} reviews</p>
                </div>
              </div>
            </div>
            <button className="px-stack-lg py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all">Write a Review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {/* Review Cards */}
            <div className="bg-surface p-stack-lg rounded-2xl border border-outline-variant hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-4">
                <div className="flex text-[#FFB800] scale-75 origin-left">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="text-label-sm text-outline">2 days ago</span>
              </div>
              <h4 className="font-bold mb-2">Incredible Noise Cancellation</h4>
              <p className="text-body-sm text-on-surface-variant line-clamp-4">"I use these for my daily commute on the train and it's like stepping into a private room. The sound quality is crisp and the battery life actually lives up to the claims."</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-[12px]">JS</div>
                <span className="text-label-sm font-bold">James S. <span className="text-tertiary ml-1 font-normal">Verified Purchase</span></span>
              </div>
            </div>

            <div className="bg-surface p-stack-lg rounded-2xl border border-outline-variant hover:shadow-md transition-shadow">
              <div className="flex justify-between mb-4">
                <div className="flex text-[#FFB800] scale-75 origin-left">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
                </div>
                <span className="text-label-sm text-outline">1 week ago</span>
              </div>
              <h4 className="font-bold mb-2">Great for Zoom Calls</h4>
              <p className="text-body-sm text-on-surface-variant line-clamp-4">"The mic quality is way better than my previous pair. People can actually hear me clearly in meetings now even when my dog is barking in the background."</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-[12px]">ML</div>
                <span className="text-label-sm font-bold">Maria L. <span className="text-tertiary ml-1 font-normal">Verified Purchase</span></span>
              </div>
            </div>
            
            <div className="bg-surface p-stack-lg rounded-2xl border border-outline-variant hover:shadow-md transition-shadow hidden lg:block">
              <div className="flex justify-between mb-4">
                <div className="flex text-[#FFB800] scale-75 origin-left">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <span className="text-label-sm text-outline">2 weeks ago</span>
              </div>
              <h4 className="font-bold mb-2">Premium Feel</h4>
              <p className="text-body-sm text-on-surface-variant line-clamp-4">"You can tell these are high-end just by touching them. The aluminum is cold to the touch and the leather is buttery soft. Worth every penny."</p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-[12px]">RK</div>
                <span className="text-label-sm font-bold">Robert K. <span className="text-tertiary ml-1 font-normal">Verified Purchase</span></span>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-stack-lg">
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All Reviews <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
