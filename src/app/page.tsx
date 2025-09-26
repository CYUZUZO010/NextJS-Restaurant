"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Star } from "lucide-react";
import FoodSlider from "@/components/FoodSlider";
import { useCart } from "@/context/CartContext";

const featuredDishes = [
  {
    id: 1,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs and lemon",
    price: 24.99,
    image: "/grilled.avif?height=200&width=300",
    category: "Main Course",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Truffle Pasta",
    description: "Homemade pasta with black truffle and parmesan",
    price: 18.99,
    image: "/pasta.avif?height=200&width=300",
    category: "Pasta",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with vanilla ice cream",
    price: 8.99,
    image: "/cake2.avif?height=200&width=300",
    category: "Dessert",
    rating: 4.7,
  },
];

export default function HomePage() {
  const { addItem } = useCart();
  return (
    <div className="min-h-screen">
      
      <section className="relative bg-gradient-to-r from-stone-800 via-stone-700 to-amber-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bella Vista Restaurant</h1>
          <p className="text-xl mb-8">
            Experience culinary excellence with fresh ingredients and authentic
            flavors
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              asChild
              size="lg"
              className="bg-white text-stone-800 hover:bg-gray-100"
            >
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white text-stone-900 hover:bg-amber-50"
            >
              <Link href="/reservations">Make Reservation</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-stone-900 hover:bg-amber-50">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-stone-900">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="py-12 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <FoodSlider
            items={featuredDishes.map((d) => ({
              id: d.id,
              name: d.name,
              description: d.description,
              price: d.price,
              image: d.image,
              category: d.category,
              rating: d.rating,
            }))}
          />
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-red-600">
            Featured Dishes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card
                key={dish.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-stone-700">
                    {dish.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{dish.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {dish.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription>{dish.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-stone-700">
                      ${dish.price}
                    </span>
                    <Button size="sm" onClick={() => addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image, category: dish.category })}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-gradient-to-r from-stone-200 to-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-stone-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon-Thu: 11AM-10PM</p>
              <p className="text-gray-600">Fri-Sat: 11AM-11PM</p>
              <p className="text-gray-600">Sun: 12PM-9PM</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-stone-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">KK-523 Street</p>
              <p className="text-gray-600">Downtown, Kigali 10001</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 text-stone-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">(250) 788-888-888</p>
              <p className="text-gray-600">info@bellavista.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
