"use client";

import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Aura Pro Wireless Headphones",
    sku: "NX-AURA-PRO-001",
    category: "Audio",
    price: 299.0,
    stock: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Vanguard Smart Watch",
    sku: "NX-VNGD-WTCH-002",
    category: "Wearables",
    price: 189.0,
    stock: 120,
    status: "Active",
  },
  {
    id: 3,
    name: "Aura Lift Laptop Stand",
    sku: "NX-LIFT-STND-003",
    category: "Accessories",
    price: 79.0,
    stock: 200,
    status: "Active",
  },
  {
    id: 4,
    name: "Nexus Core Hub Gen 2",
    sku: "NX-CORE-HUB-004",
    category: "Smart Home",
    price: 249.0,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "StealthKeys RGB Mechanical",
    sku: "NX-STLTH-KEY-005",
    category: "Accessories",
    price: 189.0,
    stock: 0,
    status: "Out of Stock",
  },
];

export default function ProductCatalogPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="font-headline-sm text-headline-sm text-on-surface">
            Product Catalog
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Manage all products across your store.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md flex items-center gap-2 hover:bg-surface-tint transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Product
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface p-4 rounded-xl border border-outline-variant mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant text-body-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="Search products by name or SKU..."
            type="text"
          />
        </div>
        <select className="px-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant text-body-sm focus:ring-2 focus:ring-primary outline-none">
          <option>All Categories</option>
          <option>Audio</option>
          <option>Wearables</option>
          <option>Accessories</option>
          <option>Smart Home</option>
        </select>
        <select className="px-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant text-body-sm focus:ring-2 focus:ring-primary outline-none">
          <option>All Status</option>
          <option>Active</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Product
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  SKU
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Category
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Price
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Stock
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Status
                </th>
                <th className="text-right px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-body-md font-semibold text-on-surface">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-code-mono text-code-mono text-on-surface-variant">
                      {product.sku}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-md font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-label-md ${
                        product.stock === 0
                          ? "text-error"
                          : product.stock < 10
                          ? "text-yellow-600"
                          : "text-on-surface"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-label-sm text-label-sm ${
                        product.status === "Active"
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-error-container text-on-error-container"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">
                      Edit
                    </button>
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