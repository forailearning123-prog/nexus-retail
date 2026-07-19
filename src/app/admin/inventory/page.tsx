"use client";

import { useEffect, useState } from "react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=100")
      .then(r => r.json())
      .then(data => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-stack-lg space-y-stack-xl max-w-container-max mx-auto">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold">Inventory Overview</h1>
        <p className="text-on-surface-variant mt-1">Manage your product stock levels</p>
      </div>

      {/* Stat Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined p-2 bg-secondary-container text-on-secondary-container rounded-lg">inventory_2</span>
          </div>
          <p className="font-label-md text-on-surface-variant">Total Products</p>
          <h3 className="text-4xl font-bold text-primary mt-1">{loading ? "..." : products.length}</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-l-secondary shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined p-2 bg-secondary-container text-on-secondary-container rounded-lg">warning</span>
            <span className="font-label-sm text-secondary px-2 py-1 bg-secondary-container rounded-full">Action Required</span>
          </div>
          <p className="font-label-md text-on-surface-variant">Low Stock Items</p>
          <h3 className="text-4xl font-bold mt-1">{loading ? "..." : lowStock}</h3>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-l-error shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined p-2 bg-error-container text-error rounded-lg">block</span>
            <span className="font-label-sm text-error px-2 py-1 bg-error-container rounded-full">Critical</span>
          </div>
          <p className="font-label-md text-on-surface-variant">Out of Stock</p>
          <h3 className="text-4xl font-bold text-error mt-1">{loading ? "..." : outOfStock}</h3>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
        <div className="px-stack-lg py-stack-md flex justify-between items-center border-b border-outline-variant">
          <h4 className="font-headline-sm text-headline-sm">All Products</h4>
          <a href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm hover:brightness-110 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span>Add Product
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Product</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Stock</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Price</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-center">Status</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-on-surface-variant">Loading inventory...</td></tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <p className="text-on-surface-variant mb-3">No products yet.</p>
                    <a href="/api/seed" className="text-primary underline text-sm">Click to seed sample data →</a>
                  </td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id} className="hover:bg-primary-container/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container border border-outline-variant overflow-hidden flex-shrink-0">
                          {product.imageUrl ? <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-sm text-on-surface-variant">inventory_2</span></div>}
                        </div>
                        <span className="font-label-md text-on-surface">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{product.category?.name || "—"}</td>
                    <td className={`px-6 py-4 text-right font-medium ${product.stock === 0 ? 'text-error' : product.stock < 10 ? 'text-secondary' : 'text-on-surface'}`}>{product.stock}</td>
                    <td className="px-6 py-4 text-right font-medium">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-center">
                      {product.stock === 0 ? (
                        <span className="inline-flex px-2 py-1 bg-error-container text-error text-[10px] uppercase font-bold rounded">Out of Stock</span>
                      ) : product.stock < 10 ? (
                        <span className="inline-flex px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold rounded">Low Stock</span>
                      ) : (
                        <span className="inline-flex px-2 py-1 bg-tertiary-fixed text-tertiary-fixed-dim text-[10px] uppercase font-bold rounded">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/admin/products/${product.id}/edit`} className="p-2 hover:bg-surface-container-high rounded-full transition-colors inline-flex" title="Edit">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">edit</span>
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}