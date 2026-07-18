"use client";

import { useEffect, useState } from "react";

export default function InventoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/search");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-stack-lg space-y-stack-xl max-w-container-max mx-auto">
      {/* OVERVIEW CARDS (BENTO GRID) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all border border-outline-variant">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-secondary-container text-on-secondary-container rounded-lg">inventory_2</span>
            <span className="font-label-sm text-label-sm text-tertiary px-2 py-1 bg-tertiary-fixed rounded-full">+4% vs last mo</span>
          </div>
          <div className="mt-4">
            <p className="font-label-md text-label-md text-on-surface-variant">Total Catalog Items</p>
            <h3 className="text-4xl font-bold text-primary mt-1">{loading ? "..." : products.length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all border-l-4 border-l-surface-tint">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-error-container text-error rounded-lg">warning</span>
            <span className="font-label-sm text-label-sm text-error px-2 py-1 bg-error-container rounded-full">Requires Action</span>
          </div>
          <div className="mt-4">
            <p className="font-label-md text-label-md text-on-surface-variant">Low Stock Items</p>
            <h3 className="text-4xl font-bold text-on-surface mt-1">{loading ? "..." : products.filter(p => p.stock < 10 && p.stock > 0).length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all border border-outline-variant">
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined p-2 bg-on-surface-variant/10 text-on-surface-variant rounded-lg">block</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant/70">Critical Level</span>
          </div>
          <div className="mt-4">
            <p className="font-label-md text-label-md text-on-surface-variant">Out of Stock</p>
            <h3 className="text-4xl font-bold text-on-surface mt-1">{loading ? "..." : products.filter(p => p.stock === 0).length}</h3>
          </div>
        </div>
      </section>

      {/* DETAILED INVENTORY TABLE */}
      <section className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
        <div className="px-stack-lg py-stack-md flex justify-between items-center border-b border-outline-variant">
          <h4 className="font-headline-sm text-headline-sm text-on-surface">Full Inventory List</h4>
          <div className="flex gap-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input className="bg-surface-container-low border border-outline-variant rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none w-64" placeholder="Search inventory..." type="text"/>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg text-sm hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Product Details</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">SKU ID</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Stock</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-right">Unit Price</th>
                <th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">No products found.</td>
                </tr>
              ) : (
                products.map((product, idx) => (
                  <tr key={product.id} className="hover:bg-primary-container/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-surface-container border border-outline-variant overflow-hidden">
                          {product.imageUrl && <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />}
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-on-surface">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-code-mono text-code-mono text-on-surface-variant text-xs">{product.id.substring(0, 8)}...</td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{product.category?.name || "N/A"}</td>
                    <td className={`px-6 py-4 text-right font-medium ${product.stock < 10 ? 'text-error' : ''}`}>{product.stock}</td>
                    <td className="px-6 py-4 text-right font-medium">INR {product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      {product.stock === 0 ? (
                        <span className="inline-flex px-2 py-1 bg-on-surface-variant/10 text-on-surface-variant text-[10px] uppercase font-bold rounded">Out of Stock</span>
                      ) : product.stock < 10 ? (
                        <span className="inline-flex px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold rounded">Low Stock</span>
                      ) : (
                        <span className="inline-flex px-2 py-1 bg-tertiary-fixed text-tertiary-fixed-dim text-[10px] uppercase font-bold rounded">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                        <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
                      </button>
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