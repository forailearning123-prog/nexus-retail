"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "", description: "", price: "", stock: "0", categoryId: "", imageUrl: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(d => setCategories(d.categories || []));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      await fetch(data.url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });

      // Derive the public URL from key
      const publicUrl = `https://${process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || "pub"}/${data.key}`;
      setForm(f => ({ ...f, imageUrl: publicUrl }));
    } catch (err: any) {
      setError("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.description || !form.price || !form.categoryId) {
      setError("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-stack-lg max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-stack-xl">
        <Link href="/admin/products" className="p-2 hover:bg-surface-container rounded-lg transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold">Add New Product</h1>
          <p className="text-on-surface-variant">Create a new product listing</p>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl font-label-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-stack-lg">
        {/* Basic Info */}
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant space-y-stack-md">
          <h2 className="font-headline-sm text-headline-sm">Basic Information</h2>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-on-surface-variant">Product Name *</label>
            <input required className="h-12 border border-outline-variant rounded-xl px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Crystal Hydro Bottle 1L" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-on-surface-variant">Description *</label>
            <textarea required rows={4} className="border border-outline-variant rounded-xl px-4 py-3 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Describe the product in detail..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-on-surface-variant">Category *</label>
            <select required className="h-12 border border-outline-variant rounded-xl px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}>
              <option value="">Select a category</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </section>

        {/* Pricing & Stock */}
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant space-y-stack-md">
          <h2 className="font-headline-sm text-headline-sm">Pricing & Stock</h2>
          <div className="grid grid-cols-2 gap-stack-md">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">Price (₹) *</label>
              <input required type="number" min="0" step="0.01" className="h-12 border border-outline-variant rounded-xl px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="999" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">Stock Quantity</label>
              <input type="number" min="0" className="h-12 border border-outline-variant rounded-xl px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="50" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} />
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant space-y-stack-md">
          <h2 className="font-headline-sm text-headline-sm">Product Image</h2>
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-on-surface-variant">Image URL (or upload below)</label>
            <input className="h-12 border border-outline-variant rounded-xl px-4 font-body-md bg-surface focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} />
          </div>
          <div className="relative border-2 border-dashed border-outline-variant rounded-xl p-8 text-center hover:bg-surface-container transition-colors cursor-pointer">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
            {uploadingImage ? (
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-3xl animate-spin text-primary">sync</span>
                <p className="font-label-md text-on-surface-variant">Uploading to Cloudflare R2...</p>
              </div>
            ) : form.imageUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img src={form.imageUrl} className="h-24 w-24 object-cover rounded-xl mx-auto" alt="preview" />
                <p className="font-label-sm text-tertiary-fixed-dim">Image set! Click to change.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant">cloud_upload</span>
                <p className="font-label-md text-on-surface-variant">Drag & drop or click to upload</p>
                <p className="text-body-sm text-outline">PNG, JPG, WEBP up to 5MB. Stored in Cloudflare R2.</p>
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link href="/admin/products" className="px-6 py-3 border border-outline-variant rounded-xl font-label-md hover:bg-surface-container transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="px-8 py-3 bg-primary text-on-primary rounded-xl font-label-md hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 shadow-md">
            {saving ? <><span className="material-symbols-outlined animate-spin text-sm">sync</span>Saving...</> : <><span className="material-symbols-outlined text-sm">publish</span>Publish Product</>}
          </button>
        </div>
      </form>
    </div>
  );
}