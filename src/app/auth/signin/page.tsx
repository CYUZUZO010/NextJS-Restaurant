"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Role } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [form, setForm] = useState({ email: "", password: "", role: "client" as Role });
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(form);
      toast.success("Signed in successfully");
      if (form.role === "admin") router.replace("/admin");
      else if (form.role === "waiter") router.replace("/waiter");
      else router.replace("/menu");
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md mb-4 text-center">
        <h1 className="animate-slide-up text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900">
          Welcome Back
        </h1>
        <p className="animate-slide-up mt-1 text-stone-700 font-medium" style={{ animationDelay: "120ms" }}>Sign in to continue</p>
      </div>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Account Access</CardTitle>
          <CardDescription>Enter your credentials below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="border-stone-300 focus-visible:ring-amber-400 focus-visible:border-amber-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="border-stone-300 focus-visible:ring-amber-400 focus-visible:border-amber-400" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as Role })}>
                <SelectTrigger className="w-full border-stone-300 focus-visible:ring-amber-400 focus-visible:border-amber-400">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="waiter">Waiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-stone-900">
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-sm text-stone-600 mt-4">
            Don't have an account? <Link className="text-amber-700 hover:text-amber-800 underline underline-offset-4" href="/auth/signup">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
