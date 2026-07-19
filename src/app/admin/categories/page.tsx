"use client";

import { useEffect, useState } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [form, setForm] = useState({ name: "", description: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.categories || []);
    setLoading(false);
  }

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
      const publicUrl = `https://${process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || "pub"}/${data.key}`;
      setForm(f => ({ ...f, imageUrl: publicUrl }));
    } catch (err: any) {
      alert("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", description: "", imageUrl: "" });
    setEditingId(null);
    setSaving(false);
    fetchCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete category? This cannot be undone.")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      fetchCategories();
    }
  }

  function startEdit(cat: any) {
    setEditingId(cat.id);
    setForm({ name: cat.name, description: cat.description || "", imageUrl: cat.imageUrl || "" });
  }

  return (
    <div className="p-stack-lg max-w-container-max mx-auto space-y-stack-xl">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold">Categories</h1>
        <p className="text-on-surface-variant mt-1">Manage product categories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
        {/* Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant space-y-4 sticky top-24">
            <h2 className="font-headline-sm text-headline-sm">{editingId ? "Edit Category" : "New Category"}</h2>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1">Name *</label>
              <input required className="w-full h-12 border border-outline-variant rounded-xl px-4 bg-surface focus:ring-2 focus:ring-primary outline-none" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1">Description</label>
              <textarea rows={3} className="w-full border border-outline-variant rounded-xl px-4 py-2 bg-surface focus:ring-2 focus:ring-primary outline-none resize-none" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant mb-1">Image (For Homepage)</label>
              {form.imageUrl && <img src={form.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-lg mb-2" />}
              <label className="w-full flex items-center justify-center gap-2 py-2 border border-outline-variant rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                {uploadingImage ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : <span className="material-symbols-outlined text-sm">upload</span>}
                {uploadingImage ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            </div>
            <div className="flex gap-2 pt-4">
              {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", description: "", imageUrl: "" }); }} className="flex-1 py-3 rounded-xl border border-outline-variant hover:bg-surface-container font-label-md">Cancel</button>}
              <button type="submit" disabled={saving || uploadingImage} className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-label-md hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md">
                {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
                {editingId ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant w-16">Image</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant">Name</th>
                  <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Products</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-12 text-on-surface-variant">Loading...</td></tr>
                ) : categories.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-12 text-on-surface-variant">No categories yet.</td></tr>
                ) : categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-primary-container/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-container border border-outline-variant overflow-hidden flex items-center justify-center">
                        {cat.imageUrl ? <img src={cat.imageUrl} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-on-surface-variant text-sm">image</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-label-md">{cat.name}</p>
                      <p className="text-xs text-on-surface-variant">{cat.description || "No description"}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{cat._count?.products || 0}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => startEdit(cat)} className="p-2 hover:bg-surface-container-high rounded-lg transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 hover:bg-error-container text-error rounded-lg transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
