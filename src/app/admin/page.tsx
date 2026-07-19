"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-stack-lg space-y-stack-xl max-w-container-max mx-auto">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold">Dashboard</h1>
        <p className="text-on-surface-variant mt-1">Overview of your store performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <p className="font-label-md text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">payments</span> Total Revenue</p>
          <h3 className="text-3xl font-bold text-primary">{loading ? "..." : formatPrice(stats?.totalRevenue || 0)}</h3>
        </div>
        
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <p className="font-label-md text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">shopping_bag</span> Total Orders</p>
          <div className="flex items-end justify-between">
            <h3 className="text-4xl font-bold text-on-surface">{loading ? "..." : stats?.totalOrders || 0}</h3>
            {stats?.pendingOrders > 0 && <span className="text-xs bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-bold">{stats.pendingOrders} pending</span>}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between h-40">
          <p className="font-label-md text-on-surface-variant flex items-center gap-2"><span className="material-symbols-outlined text-sm">inventory_2</span> Total Products</p>
          <h3 className="text-4xl font-bold text-on-surface">{loading ? "..." : stats?.totalProducts || 0}</h3>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm flex flex-col justify-between h-40 ${stats?.lowStockProducts > 0 ? 'bg-error-container/20 border-error-container' : 'bg-surface-container-lowest border-outline-variant'}`}>
          <p className="font-label-md text-on-surface-variant flex items-center gap-2"><span className={`material-symbols-outlined text-sm ${stats?.lowStockProducts > 0 ? 'text-error' : ''}`}>warning</span> Low Stock Alerts</p>
          <div className="flex items-end justify-between">
            <h3 className={`text-4xl font-bold ${stats?.lowStockProducts > 0 ? 'text-error' : 'text-on-surface'}`}>{loading ? "..." : stats?.lowStockProducts || 0}</h3>
            <Link href="/admin/inventory" className="text-primary text-sm hover:underline">View details →</Link>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <section>
        <h2 className="font-headline-sm text-headline-sm mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <Link href="/admin/products/new" className="flex items-center gap-3 p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors group">
             <div className="p-3 bg-primary-container text-on-primary-container rounded-lg group-hover:scale-105 transition-transform"><span className="material-symbols-outlined">add</span></div>
             <div>
               <p className="font-label-md font-bold">Add Product</p>
               <p className="text-xs text-on-surface-variant">Create a new listing</p>
             </div>
           </Link>
           <Link href="/admin/cms" className="flex items-center gap-3 p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors group">
             <div className="p-3 bg-tertiary-container text-on-tertiary-container rounded-lg group-hover:scale-105 transition-transform"><span className="material-symbols-outlined">design_services</span></div>
             <div>
               <p className="font-label-md font-bold">Edit Homepage</p>
               <p className="text-xs text-on-surface-variant">Manage banners & text</p>
             </div>
           </Link>
           <Link href="/admin/orders" className="flex items-center gap-3 p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors group">
             <div className="p-3 bg-secondary-container text-on-secondary-container rounded-lg group-hover:scale-105 transition-transform"><span className="material-symbols-outlined">local_shipping</span></div>
             <div>
               <p className="font-label-md font-bold">Fulfill Orders</p>
               <p className="text-xs text-on-surface-variant">Update shipping status</p>
             </div>
           </Link>
        </div>
      </section>
    </div>
  );
}
