"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full top-0 z-50 sticky transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm"
          : "bg-surface shadow-sm"
      }`}
    >
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-headline-md text-headline-md font-bold text-primary"
          >
            NexusRetail
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href="/shop"
              className="font-body-md text-body-md text-primary border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/shop?deals=true"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Deals
            </Link>
            <Link
              href="/admin/returns"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Returns
            </Link>
            <Link
              href="#"
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-gutter">
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-2 w-64">
            <span className="material-symbols-outlined text-outline text-sm mr-2">
              search
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none"
              placeholder="Search products..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/basket"
              className="text-on-surface-variant hover:text-primary transition-all active:scale-95 p-2"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </Link>
            <button className="text-on-surface-variant hover:text-primary transition-all active:scale-95 p-2">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            <button className="md:hidden text-on-surface-variant p-2">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}