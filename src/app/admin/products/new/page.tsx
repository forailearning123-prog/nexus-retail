"use client";

import Link from "next/link";

export default function AddProductPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-primary text-sm flex items-center gap-1 hover:underline mb-2"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          Back to Catalog
        </Link>
        <h1 className="font-headline-sm text-headline-sm text-on-surface">
          Add New Product
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Fill in the details below to add a new product to your inventory.
        </p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <section className="bg-surface p-6 rounded-xl border border-outline-variant">
          <h2 className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              info
            </span>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Product Name
              </label>
              <input
                className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g. Aura Pro Wireless Headphones"
                type="text"
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Description
              </label>
              <textarea
                className="min-h-[120px] border border-outline-variant rounded-lg px-4 py-3 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none resize-y"
                placeholder="Describe the product in detail..."
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Category
              </label>
              <select className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none">
                <option>Select category...</option>
                <option>Audio</option>
                <option>Wearables</option>
                <option>Accessories</option>
                <option>Smart Home</option>
                <option>Electronics</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                SKU
              </label>
              <input
                className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g. NX-AURA-001"
                type="text"
              />
            </div>
          </div>
        </section>

        {/* Pricing & Stock */}
        <section className="bg-surface p-6 rounded-xl border border-outline-variant">
          <h2 className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              sell
            </span>
            Pricing & Stock
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Price (USD)
              </label>
              <input
                className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Compare Price (Optional)
              </label>
              <input
                className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-on-surface-variant">
                Stock Quantity
              </label>
              <input
                className="h-12 border border-outline-variant rounded-lg px-4 font-body-md bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
                placeholder="0"
                type="number"
              />
            </div>
          </div>
        </section>

        {/* Media */}
        <section className="bg-surface p-6 rounded-xl border border-outline-variant">
          <h2 className="font-label-md text-label-md text-on-surface mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              image
            </span>
            Media
          </h2>
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center hover:bg-surface-container-low transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">
              cloud_upload
            </span>
            <p className="font-body-md text-on-surface-variant">
              Drag & drop product images here, or click to browse
            </p>
            <p className="text-label-sm text-outline mt-1">
              Supports: JPG, PNG, WebP (Max 5MB each)
            </p>
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 border border-outline-variant rounded-lg font-label-md hover:bg-surface-container-high transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-on-primary rounded-lg font-label-md hover:bg-surface-tint transition-all active:scale-95 shadow-md"
          >
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}