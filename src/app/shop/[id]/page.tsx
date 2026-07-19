"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/products/${params.id}`)
      .then(r => r.json())
      .then(data => {
        if (data.product) setProduct(data.product);
        else router.push("/shop");
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ id: product.id, name: product.name, price: product.price, quantity: qty, imageUrl: product.imageUrl, category: product.category?.name });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto px-margin-desktop py-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="animate-pulse bg-surface-container rounded-3xl aspect-square" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => <div key={i} className="animate-pulse bg-surface-container rounded-xl h-8" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
      {/* Breadcrumbs */}
      <nav className="flex text-label-sm text-outline mb-stack-lg">
        <Link className="hover:text-primary" href="/">Home</Link>
        <span className="mx-2">/</span>
        <Link className="hover:text-primary" href="/shop">Shop</Link>
        <span className="mx-2">/</span>
        <Link className="hover:text-primary" href={`/shop?categoryId=${product.categoryId}`}>{product.category?.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-on-surface truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter lg:gap-16 items-start">
        {/* Product Image */}
        <div className="sticky top-24">
          <div className="aspect-square rounded-3xl overflow-hidden bg-surface-container border border-outline-variant">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-symbols-outlined text-8xl text-on-surface-variant">inventory_2</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-stack-lg">
          <div>
            <span className="inline-block px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-label-sm font-label-sm mb-3">
              {product.category?.name}
            </span>
            <h1 className="font-headline-md text-headline-md text-on-surface">{product.name}</h1>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-outline-variant">
            <p className="font-display-lg-mobile text-4xl font-bold text-primary">{formatPrice(product.price)}</p>
            <p className="text-body-sm text-on-surface-variant mt-1">Inclusive of all taxes • Free delivery on orders above ₹999</p>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {product.stock === 0 ? (
              <span className="text-error font-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span> Out of Stock
              </span>
            ) : product.stock < 10 ? (
              <span className="text-secondary font-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">warning</span> Only {product.stock} left
              </span>
            ) : (
              <span className="text-tertiary-fixed-dim font-label-md flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> In Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Description</h2>
            <p className="text-body-md text-on-surface leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity */}
          {product.stock > 0 && (
            <div>
              <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-3">Quantity</h2>
              <div className="flex items-center border border-outline-variant rounded-full w-fit overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="px-6 font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-2 hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl font-label-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
                added ? "bg-tertiary text-on-tertiary" : product.stock === 0 ? "bg-surface-container text-on-surface-variant cursor-not-allowed" : "bg-primary text-on-primary hover:brightness-110 shadow-lg"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {added ? "check_circle" : "add_shopping_cart"}
              </span>
              {added ? "Added to Cart!" : "Add to Cart"}
            </button>
            <Link
              href="/cart"
              className="flex-1 py-4 rounded-xl font-label-md flex items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              View Cart
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-outline-variant">
            {[
              { icon: "local_shipping", text: "Free Delivery" },
              { icon: "replay_30", text: "7-Day Returns" },
              { icon: "verified_user", text: "Secure Payment" },
            ].map(b => (
              <div key={b.icon} className="flex flex-col items-center gap-1 text-center p-3 bg-surface-container rounded-xl">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{b.icon}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
