"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequests?: string;
  createdAt?: string;
  status?: string; 
};

const STORAGE_KEY = "reservations";

export default function WaiterPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth/signin");
      return;
    }
    if (user.role !== "waiter" && user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr: Reservation[] = raw ? JSON.parse(raw) : [];
      setReservations(arr);
    } catch (e) {
      console.error("Failed to load reservations", e);
    }
  }, []);

  const save = (arr: Reservation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    setReservations(arr);
  };

  const accept = (id: string) => {
    const arr = reservations.map((r) => (r.id === id ? { ...r, status: "Accepted" } : r));
    save(arr);
    toast.success(`Accepted ${id}`);
  };
  const decline = (id: string) => {
    const arr = reservations.filter((r) => r.id !== id);
    save(arr);
    toast.error(`Declined and removed ${id}`);
  };

  const sorted = useMemo(() => {
    const parseDT = (r: Reservation) => new Date(`${r.date} ${r.time}`).getTime();
    return [...reservations].sort((a, b) => parseDT(a) - parseDT(b));
  }, [reservations]);

  if (loading || !user || (user.role !== "waiter" && user.role !== "admin")) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-100 to-amber-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Waiter Dashboard</h1>
        <p className="text-stone-600 mb-6">Manage incoming reservations: accept or decline based on availability.</p>

        {sorted.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="py-8 text-center text-gray-600">No reservations yet.</CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {sorted.map((res) => (
              <Card key={res.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">Reservation {res.id}</CardTitle>
                      <CardDescription>
                        {res.date} at {res.time}
                      </CardDescription>
                    </div>
                    <Badge className={res.status === "Accepted" ? "bg-emerald-500" : "bg-amber-500"}>
                      {res.status || "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">Name</span><span className="font-medium">{res.name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Guests</span><span className="font-medium">{res.guests}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Phone</span><span className="font-medium">{res.phone}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Email</span><span className="font-medium">{res.email}</span></div>
                    </div>
                    {res.specialRequests && (
                      <div className="text-sm">
                        <span className="text-gray-600">Notes: </span>
                        <span className="font-medium">{res.specialRequests}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex gap-2 pt-1">
                      <Button onClick={() => accept(res.id)} className="bg-emerald-600 hover:bg-emerald-700">Accept</Button>
                      <Button onClick={() => decline(res.id)} variant="outline">Decline</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
