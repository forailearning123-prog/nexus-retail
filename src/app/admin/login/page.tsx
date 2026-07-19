"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        window.location.href = "/admin/inventory"; // Force full reload to update middleware state
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest px-4">
      <div className="max-w-md w-full bg-surface p-8 rounded-3xl shadow-lg border border-outline-variant">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container text-on-primary-container mb-4">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold">Admin Platform</h1>
          <p className="text-on-surface-variant mt-2">Sign in to manage your store</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl font-label-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-error">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-label-sm text-on-surface-variant mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full h-12 border border-outline-variant rounded-xl px-4 bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="admin@sunave.tech"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-label-sm text-on-surface-variant mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full h-12 border border-outline-variant rounded-xl px-4 bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-6 bg-primary text-on-primary rounded-xl font-label-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-md disabled:opacity-70 disabled:pointer-events-none flex justify-center items-center gap-2"
          >
            {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
