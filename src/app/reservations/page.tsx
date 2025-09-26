"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Users } from "lucide-react";
import { toast } from "sonner";

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast.error("Missing Information", {
        description: "Please fill in all required fields.",
      });
      return;
    }

    // Persist reservation to localStorage
    try {
      const id = `RES-${Date.now()}`;
      const newReservation = {
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        specialRequests: formData.specialRequests,
        createdAt: new Date().toISOString(),
        status: "Upcoming",
      };

      const raw = typeof window !== "undefined" ? localStorage.getItem("reservations") : null;
      const arr = raw ? (JSON.parse(raw) as any[]) : [];
      arr.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(arr));

      toast.success("Reservation Confirmed!", {
        description: `Your table for ${formData.guests} guests on ${formData.date} at ${formData.time} has been saved. View it in Orders.`,
        action: {
          label: "Go to Orders",
          onClick: () => window.location.assign("/orders"),
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Could not save reservation locally.");
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequests: "",
    });
  };

  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Make a Reservation</h1>
            <p className="text-gray-600">
              Book your table at Bella Vista and enjoy an unforgettable dining
              experience
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Reservation Details
              </CardTitle>
              <CardDescription>
                Please fill in your details to make a reservation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) =>
                        setFormData({ ...formData, guests: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) =>
                        setFormData({ ...formData, time: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialRequests: e.target.value,
                      })
                    }
                    placeholder="Any special dietary requirements, celebrations, or other requests..."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-stone-700 hover:bg-stone-800"
                >
                  Confirm Reservation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Restaurant Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-stone-700 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Opening Hours</h3>
                <p className="text-sm text-gray-600">Mon-Thu: 11AM-10PM</p>
                <p className="text-sm text-gray-600">Fri-Sat: 11AM-11PM</p>
                <p className="text-sm text-gray-600">Sun: 12PM-9PM</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-stone-700 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Group Bookings</h3>
                <p className="text-sm text-gray-600">
                  For parties of 8+ guests, please call us directly
                </p>
                <p className="text-sm text-gray-600 font-medium">
                  (250) 788-888-888
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-stone-700 mx-auto mb-2" />
                <h3 className="font-semibold mb-2">Cancellation</h3>
                <p className="text-sm text-gray-600">
                  Free cancellation up to 2 hours before your reservation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
