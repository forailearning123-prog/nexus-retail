"use client";

const returns = [
  {
    id: "RET-001",
    order: "ORD-2024-0842",
    customer: "Alex Morgan",
    product: "Aura Pro Wireless Headphones",
    reason: "Defective - Left earcup no audio",
    status: "Pending Review",
    date: "2024-12-10",
  },
  {
    id: "RET-002",
    order: "ORD-2024-0831",
    customer: "Sarah Chen",
    product: "Vanguard Smart Watch",
    reason: "Wrong color received",
    status: "Approved",
    date: "2024-12-08",
  },
  {
    id: "RET-003",
    order: "ORD-2024-0815",
    customer: "James Wilson",
    product: "Nexus Core Hub Gen 2",
    reason: "Not compatible with setup",
    status: "In Transit",
    date: "2024-12-05",
  },
  {
    id: "RET-004",
    order: "ORD-2024-0800",
    customer: "Emily Davis",
    product: "StealthKeys RGB Mechanical",
    reason: "Changed mind",
    status: "Refunded",
    date: "2024-12-01",
  },
  {
    id: "RET-005",
    order: "ORD-2024-0792",
    customer: "Michael Brown",
    product: "Aura Lift Laptop Stand",
    reason: "Damaged during shipping",
    status: "Pending Review",
    date: "2024-11-28",
  },
];

const statusColors: Record<string, string> = {
  "Pending Review": "bg-yellow-100 text-yellow-800",
  Approved: "bg-primary-fixed text-on-primary-fixed",
  "In Transit": "bg-secondary-fixed text-on-secondary-fixed",
  Refunded: "bg-tertiary-fixed text-on-tertiary-fixed",
};

export default function ReturnsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="font-headline-sm text-headline-sm text-on-surface">
          Returns & Exchanges
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Manage return requests, process refunds, and track exchanges.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending Review", value: "2", color: "text-yellow-600" },
          { label: "Approved", value: "1", color: "text-primary" },
          { label: "In Transit", value: "1", color: "text-secondary" },
          { label: "Refunded This Month", value: "$1,247", color: "text-tertiary" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface p-5 rounded-xl border border-outline-variant"
          >
            <p className="text-label-sm text-on-surface-variant">{stat.label}</p>
            <p className={`font-headline-sm text-headline-sm font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Returns Table */}
      <div className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  RMA #
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Order
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Customer
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Product
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Reason
                </th>
                <th className="text-left px-6 py-4 font-label-md text-label-md text-on-surface-variant">
                  Date
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
              {returns.map((ret) => (
                <tr
                  key={ret.id}
                  className="border-b border-outline-variant/50 hover:bg-surface-container-low/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-code-mono text-code-mono font-semibold">
                      {ret.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-code-mono text-code-mono text-on-surface-variant">
                      {ret.order}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body-md">{ret.customer}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">
                      {ret.product}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant max-w-[200px] block truncate">
                      {ret.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-sm text-on-surface-variant">
                      {ret.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-label-sm text-label-sm ${
                        statusColors[ret.status] || "bg-surface-container-high"
                      }`}
                    >
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline text-sm font-medium">
                      View
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