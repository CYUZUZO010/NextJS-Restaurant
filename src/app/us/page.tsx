"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function UsPage() {
  return (
    <div className="relative min-h-screen">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/grilled.avif')" }}
        aria-hidden
      />
    
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/25"
        aria-hidden
      />

    
      <div className="relative z-10">
        
        <section className="h-64 md:h-96 w-full overflow-hidden">
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="animate-slide-up text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Welcome to Bella Vista
            </h1>
            <p
              className="animate-slide-up mt-2 md:mt-3 text-white/90 max-w-2xl"
              style={{ animationDelay: "120ms" }}
            >
              Where culinary craftsmanship meets warm hospitality. Enjoy dishes
              made with the freshest ingredients and a passion for flavor.
              None but us to meet your flavors also being satisfying!
            </p>
          </div>
        </section>

      
        <div className="container mx-auto px-4 pt-8 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="animate-slide-up text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">
              About Us
            </h2>
            <p
              className="animate-slide-up mt-3 text-stone-100"
              style={{ animationDelay: "120ms" }}
            >
              At Bella Vista, we believe food is more than a meal—it’s a moment.
              From our carefully curated menu to our welcoming atmosphere, every
              detail is designed to make your time with us special.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-stone-800 mb-2">
                  Fresh Ingredients
                </h3>
                <p className="text-stone-600 text-sm">
                  We source locally whenever possible to ensure quality and
                  sustainability.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-stone-800 mb-2">
                  Authentic Flavors
                </h3>
                <p className="text-stone-600 text-sm">
                  Our chefs craft dishes that celebrate tradition with a modern
                  twist.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-stone-800 mb-2">
                  Welcoming Ambience
                </h3>
                <p className="text-stone-600 text-sm">
                  Enjoy a comfortable setting perfect for family dinners and
                  friendly meetups.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
