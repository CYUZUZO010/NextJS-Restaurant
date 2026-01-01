"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Plus } from "lucide-react";
import { toast } from "sonner";

const menuItems = [ //hardcoded menu with some foods
  {
    id: 1,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan and croutons",
    price: 12.99,
    image: "/salad.avif?height=200&width=300",
    category: "Appetizers",
    rating: 4.5,
    available: true,
  },
  {
    id: 2,
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with herbs and lemon",
    price: 24.99,
    image: "/grilled.avif?height=200&width=300",
    category: "Main Course",
    rating: 4.8,
    available: true,
  },
  {
    id: 3,
    name: "Truffle Pasta",
    description: "Homemade pasta with black truffle and parmesan",
    price: 18.99,
    image: "/pasta.avif?height=200&width=300",
    category: "Pasta",
    rating: 4.9,
    available: true,
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with vanilla ice cream",
    price: 8.99,
    image: "/cake2.avif?height=200&width=300",
    category: "Desserts",
    rating: 4.7,
    available: false,
  },
  {
    id: 5,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, and basil",
    price: 16.99,
    image: "/pizza1.avif?height=200&width=300",
    category: "Pizza",
    rating: 4.6,
    available: true,
  },
  {
    id: 6,
    name: "Beef Tenderloin",
    description: "Premium beef with roasted vegetables",
    price: 32.99,
    image: "/beef.avif?height=200&width=300",
    category: "Main Course",
    rating: 4.9,
    available: true,
  },
];

const categories = [
  "All",
  "Appetizers",
  "Main Course",
  "Pasta",
  "Pizza",
  "Desserts",
];

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: (typeof menuItems)[0]) => {
    if (!item.available) {
      toast.error("Item unavailable", {
        description: `${item.name} is currently not available.`,
      });
      return;
    }

    toast.success("Added to Cart", {
      description: `${item.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100">
      {/* Hero / Welcome Section */}
      <section className="relative h-64 md:h-96 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pizza.avif')" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/25" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="animate-slide-up text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Welcome to Our Menu
          </h1>
          <p
            className="animate-slide-up mt-2 md:mt-3 text-white/90 max-w-2xl"
            style={{ animationDelay: "120ms" }}
          >
            Explore a selection of dishes crafted with the freshest ingredients and authentic flavors.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest
            ingredients
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-19 ">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-s lg:text-sm h-9"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg ${
                !item.available ? "opacity-60" : ""
              }`}
            >
              <div className="aspect-video bg-gray-200 relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-stone-700">
                  {item.category}
                </Badge>
                {!item.available && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Unavailable
                  </Badge>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-stone-700">
                    ${item.price}
                  </span>
                  <Button
                    size="sm"
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                    className="bg-stone-700 hover:bg-stone-800"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No dishes found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
