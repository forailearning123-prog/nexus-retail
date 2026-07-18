"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const [selectedThumb, setSelectedThumb] = useState(0);

  const thumbs = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCQNLKMDrkMlSEOfqwI4yCs7Awbcr0cpVrJr6WU3r_eriZIupI7ecqKErdn_b3Ek3t6oa973q05FTOJXc-X5k7wuNTSZ4pPAB4z6hNawhaD1xx9xe_3Lp8JVVETJqVShZXaCwVJwvg-0VgwvFpjbsEaBlek_kde3AWriZaHMM5l3mVos3_6c6DYRdTMLZe0XzJxxQXUVo7x02NpU8_ue55CC5aZ2xj_Y4Viwn5OIwbH6E6nA_-hCna037R2zfhWjgMhfvXqXsQ6lD8",
      alt: "Headphone side profile",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIDARx7pgbI0g13EQlXWttr5H7CgTlKoEwKHpeQwLmd8-SBYapwOJJCxABUhGH92YNuKOODgYCVyxxW7gFOXC-Q_O62Y1oM4NWRqd4y5Xww11nUvbwzaaKy0OldhvxH6mHGQ41xDwyqYUskndYn_7bYtmwezInD88F1-PSD9r7dkfQUnyq6H82FMFhyisBVSQ4U33y-4n5Gp31HZlVjTSePR1t-ylAFXZffiiVzrrK5fA9m5247Y0lkGD2md7BAL0JGR0ug4nG8Us",
      alt: "Hinge mechanism closeup",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXddzqOb9YA_4w3nUjMg6cPdDA5Xr9usyjFjtmbGkWhA4zJO5QfYKyxmUKccTV3w-SJHT--LKHZmyVqyKXVc2t7-LouJ587E9Hb_y7LCIF1f-j9JaUzOuddQJ_5kT5EN9HHI4U6mvE5pPnb-6YP7ioW8rvz7shMsho0yTaak77WeF1Iu5-MHDYVTI4UjitouWNT4IFGJJr2ttig_ZlrgjqE5KnAZIDR8csvZb-0PeEhXUO4cj6RT1Sw420-DsIcs8cPav8-Zl0HMk",
      alt: "Lifestyle desk shot",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUNpyfUf6JyEFQD-MigB8bWxhTU_t_mN2wCzLVXs8tnWXf5KcxlojxPeeS_uq98YK3HUYRIjLxnxAQGO1IqiZK6OtxYpeLcDcpk50BZ---NoO9-oBxoPfRShqjNp2RKHqCVCg5HISILL4EXQ_EaxJeP_tTPJZ4U3AOM02M4GNw-zcNw4XXsPQER26PRo3MdNKeDi2OhfrMTzHda4lU2MS7w7abb3rM_GOHaBPeFPAz5yoGYxH1OhpOnED95_bA7J0X9LVYV_xKsFo",
      alt: "Carrying case",
    },
  ];

  const mainSrc =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBK2yEc5uZhNeyOyEy2gsO0XbHfasJYR6IYFff3JubUCaJ4zt8gg1WyBfRGkGtCtYF0LPdbFeUkRqYgKlzjHP2sem064gz1wMUV-NMTRAH6i97hl9ztLfjXxpYzgHinrZROgBM_FdwIRPlCCmj9hN2MAIre3VMbwpgWcYw5X9szqG_-Q_qeZofJKrVf6-JESEe5VjlIudVpgQ8R-cO-pgVYjAiGyIzFtUFvOCI4B-GcedA_XUJlhTxs3HNhpHND81PtHccZMZWDnKQ";

  return (
    <>
      <Header />
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-xl flex-1 w-full">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-stack-lg text-label-md font-label-md text-on-surface-variant">
          <Link className="hover:text-primary transition-colors" href="/shop">
            Shop
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <Link className="hover:text-primary transition-colors" href="/shop">
            Electronics
          </Link>
          <span className="material-symbols-outlined text-[16px]">
            chevron_right
          </span>
          <span className="text-on-surface">Nexus Ultra Pro-X</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-5 gap-stack-md">
            <div className="md:col-span-4 rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest aspect-square group relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Nexus Ultra Pro-X Headphones"
                id="mainImage"
                src={thumbs[selectedThumb]?.src || mainSrc}
              />
              <div className="absolute top-4 right-4">
                <button className="bg-surface-container-lowest/80 backdrop-blur-md p-2 rounded-full shadow-sm hover:text-error transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="md:col-span-1 flex md:flex-col gap-stack-sm order-last md:order-none overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {thumbs.map((thumb, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 md:w-full rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:opacity-80 ${
                    selectedThumb === index
                      ? "border-primary active-thumb"
                      : "border-outline-variant"
                  }`}
                  onClick={() => setSelectedThumb(index)}
                >
                  <img
                    className="w-full h-full object-cover"
                    alt={thumb.alt}
                    src={thumb.src}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-5 space-y-stack-lg">
            <div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
                Top Rated
              </span>
              <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-2">
                Nexus Ultra Pro-X
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                High-Fidelity Noise Canceling Wireless Over-Ear Headphones
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-[#FFB800]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="material-symbols-outlined"
                      style={{
                        fontVariationSettings: `'FILL' ${
                          star <= 4 ? 1 : 0.5
                        }`,
                      }}
                    >
                      {star <= 4 ? "star" : "star_half"}
                    </span>
                  ))}
                </div>
                <span className="text-label-md font-label-md text-on-surface-variant">
                  (1,284 Customer Reviews)
                </span>
              </div>
            </div>

            <div className="border-y border-outline-variant py-stack-md">
              <div className="flex items-baseline gap-4">
                <span className="font-display-lg text-display-lg font-bold text-primary">
                  $129.99
                </span>
                <span className="text-on-surface-variant line-through font-body-md">
                  $159.00
                </span>
                <span className="text-tertiary font-label-md">Save $29.01</span>
              </div>
              <p className="text-label-sm text-outline mt-2 italic">
                Excluding tax, shipping calculated at checkout
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-stack-md">
              <div>
                <p className="font-label-md font-bold mb-2">
                  Color:{" "}
                  <span className="text-on-surface-variant font-normal">
                    Obsidian Black
                  </span>
                </p>
                <div className="flex gap-stack-sm">
                  <button className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-900 ring-2 ring-offset-2 ring-transparent transition-all"></button>
                  <button className="w-10 h-10 rounded-full border border-outline-variant bg-zinc-400 hover:border-primary transition-all"></button>
                  <button className="w-10 h-10 rounded-full border border-outline-variant bg-slate-200 hover:border-primary transition-all"></button>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-label-md font-bold">
                    Connectivity Option
                  </p>
                  <a
                    className="text-primary text-label-sm underline"
                    href="#"
                  >
                    Comparison Chart
                  </a>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="px-6 py-3 rounded-lg border-2 border-primary bg-primary-fixed text-on-primary-fixed font-label-md transition-all">
                    Bluetooth 5.3
                  </button>
                  <button className="px-6 py-3 rounded-lg border border-outline-variant hover:border-primary transition-all font-label-md">
                    Hybrid (Wired + Wireless)
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-stack-sm">
              <Link
                href="/basket"
                className="w-full bg-primary-container text-on-primary font-body-lg text-body-lg font-bold py-4 rounded-xl shadow-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Cart
              </Link>
              <button className="w-full bg-inverse-surface text-surface font-body-lg text-body-lg font-bold py-4 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all">
                Buy Now
              </button>
            </div>

            <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/30">
              <div className="bg-primary/10 p-2 rounded-full">
                <span className="material-symbols-outlined text-primary">
                  local_shipping
                </span>
              </div>
              <div>
                <p className="text-label-md font-bold">
                  Fast & Free Delivery
                </p>
                <p className="text-label-sm text-on-surface-variant">
                  Order within the next 2h 45m for tomorrow delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Bar for Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant p-4 z-40 lg:hidden flex gap-3">
          <Link
            href="/basket"
            className="flex-1 bg-primary-container text-on-primary font-label-md py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">
              shopping_cart
            </span>
            Add
          </Link>
          <button className="flex-1 bg-inverse-surface text-surface font-label-md py-3 rounded-lg">
            Buy Now
          </button>
        </div>

        {/* Below the Fold: Sections */}
        <div className="mt-section-gap space-y-section-gap">
          {/* Description Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-5">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-stack-md">
                Engineered for Silence. Crafted for Sound.
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg leading-relaxed">
                The Nexus Ultra Pro-X redefines the listening experience with
                our proprietary Adaptive Isolation&trade; technology. Designed
                for global travelers and professional creators, these headphones
                monitor ambient noise 48,000 times per second to provide a pure,
                uninterrupted soundstage.
              </p>
              <ul className="space-y-stack-sm">
                {[
                  "40-hour battery life with Fast-Charge (10 mins = 5 hours)",
                  "Multi-point Bluetooth pairing for seamless switching",
                  "Ultra-soft memory foam earcups for all-day comfort",
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-body-sm"
                  >
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      check_circle
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg aspect-video">
              <img
                className="w-full h-full object-cover"
                alt="Person wearing headphones in modern office"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKNdpqM9f-eAK0alYpXyQ6NGcBgPOKvIWYwsBZuna8HZIweh3nvys9Fzg1W44o5rJap84EhjQmG2tHP2BiON2Oz3unvf8aOhbJIL5eKLonYVW_z2WGWvkgm6aOqrPwefTpd9BSBo92B1qJTUDv2XlB5nQpkIpalwDDK9tWFoqQ_op-0CHSFBAQUlra8xCL_AuXizXS7k_CR9j3c9E9l83JwIL8LABZHS7Zxwx8T_f7AakJsETuW9-ZYBcGpA8S_M_wmrIqTIaNlBY"
              />
            </div>
          </section>

          {/* Technical Specs */}
          <section className="bg-surface-container-low rounded-3xl p-stack-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface text-center mb-stack-xl">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-stack-md">
                {[
                  ["Driver Size", "40mm Liquid Crystal Polymer"],
                  ["Frequency Response", "4Hz - 40,000Hz"],
                  ["Weight", "250g (Ultra-Lightweight)"],
                  ["Microphones", "8 (Dual Beamforming)"],
                  ["Voice Assistant", "Alexa, Google, Siri"],
                  ["Warranty", "2-Year Manufacturer"],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between py-stack-sm border-b border-outline-variant"
                  >
                    <span className="text-on-surface-variant font-label-md">
                      {label}
                    </span>
                    <span className="font-bold text-on-surface">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Customer Reviews */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-stack-xl gap-stack-lg">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  Verified Customer Reviews
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-display-lg text-display-lg font-bold">
                    4.8
                  </span>
                  <div>
                    <div className="flex text-[#FFB800]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="material-symbols-outlined"
                          style={{
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <p className="text-label-sm text-outline">
                      Based on 1,284 reviews
                    </p>
                  </div>
                </div>
              </div>
              <button className="px-stack-lg py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all">
                Write a Review
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {[
                {
                  name: "James S.",
                  initials: "JS",
                  color: "bg-secondary-fixed text-on-secondary-fixed",
                  rating: 5,
                  title: "Incredible Noise Cancellation",
                  text: '"I use these for my daily commute on the train and it\'s like stepping into a private room. The sound quality is crisp and the battery life actually lives up to the claims."',
                  time: "2 days ago",
                },
                {
                  name: "Maria L.",
                  initials: "ML",
                  color: "bg-primary-fixed text-on-primary-fixed",
                  rating: 4,
                  title: "Great for Zoom Calls",
                  text: '"The mic quality is way better than my previous pair. People can actually hear me clearly in meetings now even when my dog is barking in the background."',
                  time: "1 week ago",
                },
                {
                  name: "Robert K.",
                  initials: "RK",
                  color: "bg-tertiary-fixed text-on-tertiary-fixed",
                  rating: 5,
                  title: "Premium Feel",
                  text: '"You can tell these are high-end just by touching them. The aluminum is cold to the touch and the leather is buttery soft. Worth every penny."',
                  time: "2 weeks ago",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="bg-surface p-stack-lg rounded-2xl border border-outline-variant hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between mb-4">
                    <div className="flex text-[#FFB800] scale-75 origin-left">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="material-symbols-outlined"
                          style={{
                            fontVariationSettings: `'FILL' ${
                              star <= review.rating ? 1 : 0
                            }`,
                          }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-label-sm text-outline">
                      {review.time}
                    </span>
                  </div>
                  <h4 className="font-bold mb-2">{review.title}</h4>
                  <p className="text-body-sm text-on-surface-variant line-clamp-4">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div
                      className={`w-8 h-8 rounded-full ${review.color} flex items-center justify-center font-bold text-[12px]`}
                    >
                      {review.initials}
                    </div>
                    <span className="text-label-sm font-bold">
                      {review.name}{" "}
                      <span className="text-tertiary ml-1 font-normal">
                        Verified Purchase
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-stack-lg">
              <button className="text-primary font-bold flex items-center gap-2 hover:underline">
                View All Reviews{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}