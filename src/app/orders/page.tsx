"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Note: Hardcoded mock orders removed. We now only show Cart and Upcoming Reservations.

export default function OrdersPage() {
  const { items: cartItems, updateQty, removeItem, clearCart, total: cartTotal } = useCart();
  const [reservations, setReservations] = useState<Array<{
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
  }>>([]);

  // Load reservations saved by the Reservations page
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("reservations") : null;
      const arr = raw ? (JSON.parse(raw) as any[]) : [];
      setReservations(arr);
    } catch (e) {
      console.error("Failed to load reservations from localStorage", e);
    }
  }, []);

  const clearReservations = () => {
    try {
      localStorage.removeItem("reservations");
      setReservations([]);
      toast.success("Reservations cleared");
    } catch (e) {
      console.error(e);
      toast.error("Failed to clear reservations");
    }
  };

  // Tracking, filters, and hardcoded order history removed.

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Order Tracking</h1>
            <p className="text-stone-700">
              Track your orders and view your order history here
            </p>
          </div>

          {/* Your Cart */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              {cartItems.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearCart}>
                  Clear All
                </Button>
              )}
            </div>
            {/*When there is nothing in the cart.*/}
            {cartItems.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="py-8 text-center text-stone-600">
                  Your cart is empty. Add delicious items from the Home or Menu page.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((ci) => (
                  <Card key={ci.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-16 rounded overflow-hidden bg-muted shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={ci.image || "/placeholder.svg"} alt={ci.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold truncate">{ci.name}</p>
                              {ci.category && (
                                <p className="text-xs text-gray-600">{ci.category}</p>
                              )}
                            </div>
                            <span className="font-semibold">${(ci.price * ci.quantity).toFixed(2)}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => updateQty(ci.id, ci.quantity - 1)}>-</Button>
                              <span className="w-8 text-center">{ci.quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQty(ci.id, ci.quantity + 1)}>+</Button>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => removeItem(ci.id)}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="text-lg font-semibold">Cart Total</span>
                    <span className="text-lg font-extrabold">${cartTotal.toFixed(2)}</span>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Removed hardcoded Order History and filters. */}

          {/* Upcoming Reservations */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Reservations</h2>
              {reservations.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearReservations}>
                  Clear All
                </Button>
              )}
            </div>

            {reservations.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="py-8 text-center text-stone-600">
                  No saved reservations yet. Make one on the Reservations page.
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {reservations.map((res) => (
                  <Card key={res.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Reservation {res.id}</CardTitle>
                          <CardDescription>
                            {res.date} at {res.time}
                          </CardDescription>
                        </div>
                        <Badge className="bg-amber-500 text-white">{res.status || "Upcoming"}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Name</span>
                          <span className="font-medium">{res.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Guests</span>
                          <span className="font-medium">{res.guests}</span>
                        </div>
                        {!!res.specialRequests && (
                          <div className="text-sm">
                            <span className="text-gray-600">Notes: </span>
                            <span className="font-medium">{res.specialRequests}</span>
                          </div>
                        )}
                        <div className="flex gap-2 pt-1">
                          <Button variant="outline" size="sm" onClick={() => toast.message("Reservation details", { description: `${res.name} • ${res.date} ${res.time} • ${res.guests} guests` })}>
                            View Details:
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 mt-8">
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Contact us if you have any questions about your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-stone-600" />
                  <span>(250) 788-888-888</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-600" />
                  <span>KK-523 Street, Downtown, Kigali 1001</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
