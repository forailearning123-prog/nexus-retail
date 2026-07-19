"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products?limit=100");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await fetchProducts();
    setDeleting(null);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message + (data.errors?.length ? `\n\nErrors:\n${data.errors.join('\n')}` : ''));
        fetchProducts();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setImporting(false);
      e.target.value = ""; // reset file input
    }
  }

  return (
    <div className="p-stack-lg space-y-stack-lg max-w-container-max mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-headline-md font-bold">Product Catalog</h1>
          <p className="text-on-surface-variant mt-1">{products.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-5 py-2.5 border border-outline-variant text-on-surface rounded-xl font-label-md hover:bg-surface-container transition-all active:scale-95 cursor-pointer">
            {importing ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : <span className="material-symbols-outlined">upload_file</span>}
            Bulk CSV
            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} disabled={importing} />
          </label>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-label-md hover:brightness-110 transition-all active:scale-95 shadow-md">
            <span className="material-symbols-outlined">add</span>Add Product
          </Link>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Product</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Category</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-center">Featured</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Price</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Stock</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-12 text-on-surface-variant">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <p className="text-on-surface-variant mb-4">No products yet.</p>
                    <div className="flex gap-3 justify-center">
                      <Link href="/admin/products/new" className="bg-primary text-on-primary px-6 py-2 rounded-xl font-label-md">Add First Product</Link>
                      <button onClick={async () => { await fetch("/api/seed", { method: "POST" }); fetchProducts(); }} className="border border-primary text-primary px-6 py-2 rounded-xl font-label-md">Seed Sample Data</button>
                    </div>
                  </td>
                </tr>
              ) : products.map(product => (
                <tr key={product.id} className="hover:bg-primary-container/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-container border border-outline-variant flex-shrink-0">
                        {product.imageUrl ? <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} /> : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-sm text-on-surface-variant">inventory_2</span></div>}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface">{product.name}</p>
                        <p className="text-xs text-on-surface-variant truncate max-w-[200px]">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{product.category?.name || "—"}</td>
                  <td className="px-6 py-4 text-center">
                    {product.isFeatured && <span className="material-symbols-outlined text-secondary text-sm">star</span>}
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{formatPrice(product.price)}</td>
                  <td className={`px-6 py-4 text-right font-medium ${product.stock === 0 ? 'text-error' : product.stock < 10 ? 'text-secondary' : ''}`}>{product.stock}</td>
                  <td className="px-6 py-4 text-center">
                    {product.stock === 0 ? (
                      <span className="inline-flex px-2 py-1 bg-error-container text-error text-[10px] uppercase font-bold rounded">Out of Stock</span>
                    ) : product.stock < 10 ? (
                      <span className="inline-flex px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold rounded">Low Stock</span>
                    ) : (
                      <span className="inline-flex px-2 py-1 bg-tertiary-fixed text-tertiary-fixed-dim text-[10px] uppercase font-bold rounded">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 hover:bg-surface-container-high rounded-lg transition-colors" title="Edit">
                        <span className="material-symbols-outlined text-on-surface-variant text-sm">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(product.id, product.name)} disabled={deleting === product.id} className="p-2 hover:bg-error-container rounded-lg transition-colors" title="Delete">
                        <span className="material-symbols-outlined text-error text-sm">{deleting === product.id ? "sync" : "delete"}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}