"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const { count } = useCart();

  return (
    <nav className="border-b bg-white/75 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-stone-800">
            Bella Vista
          </Link>

      
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/us"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Us
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/reservations"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Reservations
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Orders
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-stone-700 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button asChild variant="ghost" size="icon">
                <Link href="/orders">
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              </Button>
              {count > 0 && (
                <Badge className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-xs bg-stone-700">
                  {count}
                </Badge>
              )}
            </div>
            <Button asChild variant="outline">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-stone-900">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/us" className="text-lg font-medium">
                  Us
                </Link>
                <Link href="/" className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/menu" className="text-lg font-medium">
                  Menu
                </Link>
                <Link href="/reservations" className="text-lg font-medium">
                  Reservations
                </Link>
                <Link href="/orders" className="text-lg font-medium">
                  Orders
                </Link>
                <Link href="/contact" className="text-lg font-medium">
                  Contact
                </Link>
                <Link href="/auth/signin" className="text-lg font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-lg font-medium">
                  Sign Up
                </Link>
                {/* Admin link removed from mobile menu */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
