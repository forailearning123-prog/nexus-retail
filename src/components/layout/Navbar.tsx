'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`bg-surface sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-1 bg-surface/90 backdrop-blur-md shadow-md' : 'py-0 shadow-sm'}`}>
      <nav className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-16">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary whitespace-nowrap">NexusRetail</Link>
          <div className="hidden md:flex gap-6 items-center text-body-md">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/shop?categoryId=" className="hover:text-primary transition-colors">Bottles</Link>
            <Link href="/returns" className="hover:text-primary transition-colors">Returns</Link>
          </div>
        </div>

        {/* Search + Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input
                className="pl-9 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-body-sm focus:ring-2 focus:ring-primary focus:outline-none w-48 focus:w-64 transition-all"
                placeholder="Search products..."
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined text-on-surface">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          {/* Admin link */}
          <Link href="/admin/inventory" className="hidden md:flex p-2 hover:bg-surface-container rounded-full transition-colors" title="Admin">
            <span className="material-symbols-outlined text-on-surface-variant">admin_panel_settings</span>
          </Link>

          {/* Mobile menu */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant px-margin-desktop py-4 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input className="flex-1 pl-4 pr-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-body-sm focus:outline-none" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button type="submit" className="bg-primary text-on-primary px-4 py-2 rounded-xl">Go</button>
          </form>
          <Link href="/shop" className="block py-2 text-body-md hover:text-primary" onClick={() => setMenuOpen(false)}>Shop All</Link>
          <Link href="/returns" className="block py-2 text-body-md hover:text-primary" onClick={() => setMenuOpen(false)}>Returns</Link>
          <Link href="/admin/inventory" className="block py-2 text-body-md hover:text-primary" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
        </div>
      )}
    </header>
  );
}
