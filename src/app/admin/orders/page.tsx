"use client";

import { useEffect, useState } from "react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-secondary-container text-on-secondary-container",
  PAID: "bg-tertiary-fixed text-tertiary-fixed-dim",
  SHIPPED: "bg-primary-container text-on-primary-container",
  DELIVERED: "bg-tertiary-container text-on-tertiary-container",
  CANCELLED: "bg-error-container text-error",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  }

  async function updateStatus(orderId: string, status: string) {
    setUpdatingId(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchOrders();
    setUpdatingId(null);
  }

  return (
    <div className="p-stack-lg space-y-stack-lg max-w-container-max mx-auto">
      <div>
        <h1 className="font-headline-md text-headline-md font-bold">Orders</h1>
        <p className="text-on-surface-variant mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Order ID</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Customer</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Items</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant text-right">Total</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Date</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Status</th>
                <th className="px-6 py-4 font-label-md text-on-surface-variant">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-12 text-on-surface-variant">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-on-surface-variant">No orders placed yet.</td></tr>
              ) : orders.map(order => (
                <tr key={order.id} className="hover:bg-primary-container/5 transition-colors">
                  <td className="px-6 py-4 font-code-mono text-xs text-on-surface-variant">{order.id.slice(0, 12)}...</td>
                  <td className="px-6 py-4">
                    <p className="font-label-md">{order.user?.name || "Guest"}</p>
                    <p className="text-xs text-on-surface-variant">{order.user?.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{order.items?.length || 0} item(s)</td>
                  <td className="px-6 py-4 text-right font-medium">{formatPrice(order.totalAmount)}</td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] uppercase font-bold rounded ${STATUS_COLORS[order.status] || "bg-surface-container text-on-surface-variant"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="text-sm border border-outline-variant rounded-lg px-2 py-1 bg-surface focus:ring-1 focus:ring-primary outline-none"
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={e => updateStatus(order.id, e.target.value)}
                    >
                      {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => <option key={s}>{s}</option>)}
                    </select>
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
