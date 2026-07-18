'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-surface docked full-width top-0 shadow-sm sticky z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-surface/90 backdrop-blur-md' : 'py-0'}`}>
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">NexusRetail</Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link className="font-body-md text-body-md text-primary border-b-2 border-primary pb-1 hover:text-primary transition-colors" href="/shop">Shop</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Deals</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Returns</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-gutter">
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-2 w-64">
            <span className="material-symbols-outlined text-outline text-sm mr-2">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 outline-none" placeholder="Search products..." type="text" />
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-on-surface-variant hover:text-primary transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
            </Link>
            <Link href="/checkout" className="text-on-surface-variant hover:text-primary transition-all active:scale-95">
              <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
            </Link>
            <button className="md:hidden text-on-surface-variant">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
