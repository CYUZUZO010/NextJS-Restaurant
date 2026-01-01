"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth/signin");
      return;
    }
    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return null;
  }

  //the admin page for tracking the users and the operation inside
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-100">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
            <p className="text-gray-700">View, edit, and manage user accounts.</p>
            <Link
              href="/admin/users"
              className="mt-4 inline-block bg-stone-700 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded"
            >
              Go to Users
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            <p className="text-gray-700">Add, edit, and manage product listings.</p>
            <Link
              href="/admin/products"
              className="mt-4 inline-block bg-stone-700 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded"
            >
              Go to Products
            </Link>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">View Orders</h2>
            <p className="text-gray-700">View and manage customer orders.</p>
            <Link
              href="/admin/orders"
              className="mt-4 inline-block bg-stone-700 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded"
            >
              Go to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
