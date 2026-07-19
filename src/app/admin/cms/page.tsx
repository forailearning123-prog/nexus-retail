"use client";

import { useEffect, useState } from "react";

export default function AdminCMSPage() {
  const [content, setContent] = useState<any>({
    heroTitle: "Elevate Your Lifestyle With Nexus Premium",
    heroSubtitle: "Experience the perfect fusion of cutting-edge technology and minimalist aesthetic. Shop the latest arrivals in high-performance retail gear.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUgo1-ipgZsUPeae2rL6OHA3BEa5kBzLF8jeIBQCRVlUJoMZDYowHCGjII7OYFuvfNMi88PRzPJsT_mmpaBAYlkRntKKRn7dBWuBff6kWNcFvPB_CdfLmPp326DXNpx9DntV6abYhD0blIaqlfZ_h9A2fH1uqhE4RA3IjAysPa-UARPnxLNEKkm6ZxIb9cP54l1IaYzslMiN0AfHKEl72Yd5LmFxvgcfNvWmWs_ISZQLx41FLhGU5Mks1jU0jwtTI0T9xf8KXcNF4",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetch("/api/cms/HOME_MARKETING")
      .then(res => res.json())
      .then(data => {
        if (data.content && Object.keys(data.content).length > 0) {
          setContent(data.content);
        }
        setLoading(false);
      });
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
      const publicUrl = `https://${process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN || "pub"}/${data.key}`;
      setContent((c: any) => ({ ...c, heroImage: publicUrl }));
    } catch (err: any) {
      alert("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/cms/HOME_MARKETING", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      alert("CMS content saved successfully!");
    } catch (error) {
      alert("Failed to save CMS content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10">Loading CMS...</div>;

  return (
    <div className="p-stack-lg max-w-3xl mx-auto space-y-stack-xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-md text-headline-md font-bold mb-2">Content Management</h1>
          <p className="text-on-surface-variant">Update marketing banners and homepage text.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="px-6 py-3 bg-primary text-on-primary rounded-xl font-label-md hover:brightness-110 disabled:opacity-50 flex items-center gap-2 shadow-md">
          {saving && <span className="material-symbols-outlined animate-spin text-sm">sync</span>}
          Save Changes
        </button>
      </div>

      <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant shadow-sm space-y-6">
        <h2 className="font-headline-sm text-headline-sm">Homepage Hero Section</h2>
        
        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1">Hero Title</label>
          <input 
            className="w-full h-12 border border-outline-variant rounded-xl px-4 bg-surface focus:ring-2 focus:ring-primary outline-none" 
            value={content.heroTitle || ""} 
            onChange={(e) => setContent({...content, heroTitle: e.target.value})} 
          />
        </div>

        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1">Hero Subtitle</label>
          <textarea 
            rows={4}
            className="w-full border border-outline-variant rounded-xl px-4 py-3 bg-surface focus:ring-2 focus:ring-primary outline-none resize-none" 
            value={content.heroSubtitle || ""} 
            onChange={(e) => setContent({...content, heroSubtitle: e.target.value})} 
          />
        </div>

        <div>
          <label className="block font-label-sm text-on-surface-variant mb-1">Hero Image</label>
          {content.heroImage && (
            <img src={content.heroImage} alt="Hero preview" className="w-full h-64 object-cover rounded-xl mb-4" />
          )}
          <label className="flex items-center justify-center gap-2 py-4 border-2 border-dashed border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container transition-colors">
            {uploadingImage ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : <span className="material-symbols-outlined text-sm">cloud_upload</span>}
            {uploadingImage ? "Uploading..." : "Replace Hero Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
          </label>
        </div>
      </div>
    </div>
  );
}
