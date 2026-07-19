"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
  _count: { products: number };
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function ShopPage() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ categoryId: "", sort: "newest", q: "" });
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
  }

  async function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.categoryId) params.set("categoryId", filters.categoryId);
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.q) params.set("q", filters.q);

    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      category: product.category?.name,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      {/* Header */}
      <div className="mb-stack-lg">
        <nav className="flex text-label-sm text-outline mb-stack-xs">
          <Link className="hover:text-primary" href="/">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-on-surface">Shop</span>
        </nav>
        <h1 className="font-headline-md text-headline-md text-on-surface">All Products</h1>
        <p className="text-on-surface-variant mt-1">Bottles · Home Decor · Jewellery</p>
      </div>

      {/* Search */}
      <div className="mb-stack-lg">
        <div className="relative max-w-xl">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-10 pr-4 py-3 border border-outline-variant rounded-xl bg-surface focus:ring-2 focus:ring-primary outline-none"
            placeholder="Search products..."
            type="text"
            value={filters.q}
            onChange={(e) => setFilters(f => ({ ...f, q: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-gutter">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-stack-xl">
            {/* Category */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Category</h3>
              <div className="space-y-stack-sm">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio" name="category"
                    className="text-primary h-4 w-4"
                    checked={filters.categoryId === ""}
                    onChange={() => setFilters(f => ({ ...f, categoryId: "" }))}
                  />
                  <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">All Categories</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio" name="category"
                      className="text-primary h-4 w-4"
                      checked={filters.categoryId === cat.id}
                      onChange={() => setFilters(f => ({ ...f, categoryId: cat.id }))}
                    />
                    <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">
                      {cat.name} ({cat._count.products})
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* Sort */}
            <section>
              <h3 className="font-label-md text-label-md text-on-surface mb-stack-md uppercase tracking-wider">Sort By</h3>
              <div className="space-y-stack-sm">
                {[
                  { value: "newest", label: "Newest First" },
                  { value: "price_asc", label: "Price: Low to High" },
                  { value: "price_desc", label: "Price: High to Low" },
                  { value: "name_asc", label: "Name A–Z" },
                ].map(opt => (
                  <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio" name="sort"
                      className="text-primary h-4 w-4"
                      checked={filters.sort === opt.value}
                      onChange={() => setFilters(f => ({ ...f, sort: opt.value }))}
                    />
                    <span className="text-body-sm text-on-surface-variant group-hover:text-on-surface">{opt.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex justify-between items-center bg-surface-container-low rounded-xl p-stack-md mb-stack-lg">
            <p className="text-body-sm text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{products.length}</span> of {total} results
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-gutter">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-surface-container rounded-2xl aspect-[3/4]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">search_off</span>
              <p className="font-headline-sm text-on-surface-variant">No products found.</p>
              <p className="text-body-sm text-outline mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-gutter">
              {products.map(product => (
                <div key={product.id} className="group relative bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <Link href={`/shop/${product.id}`} className="block">
                    <div className="relative aspect-square bg-surface-container overflow-hidden">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-5xl text-on-surface-variant">inventory_2</span>
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-sm bg-error px-3 py-1 rounded-full">Out of Stock</span>
                        </div>
                      )}
                      {product.stock > 0 && product.stock < 10 && (
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full">
                          Only {product.stock} left
                        </span>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{product.category?.name}</p>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="font-label-md text-label-md text-on-surface line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <p className="font-headline-sm text-headline-sm text-primary mt-2">{formatPrice(product.price)}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`mt-auto mt-3 w-full py-2.5 rounded-xl font-label-md text-label-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                        addedId === product.id
                          ? "bg-tertiary text-on-tertiary"
                          : product.stock === 0
                          ? "bg-surface-container text-on-surface-variant cursor-not-allowed"
                          : "bg-primary text-on-primary hover:brightness-110"
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {addedId === product.id ? "check_circle" : "add_shopping_cart"}
                      </span>
                      {addedId === product.id ? "Added!" : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}