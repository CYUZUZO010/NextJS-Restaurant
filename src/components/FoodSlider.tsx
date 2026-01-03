"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

export type SlideItem = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
};

export default function FoodSlider({ items, interval = 4000 }: { items: SlideItem[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const { addItem } = useCart();

  const safeItems = useMemo(() => (items && items.length > 0 ? items : []), [items]);

  const next = () => setIndex((i) => (i + 1) % safeItems.length);
  const prev = () => setIndex((i) => (i - 1 + safeItems.length) % safeItems.length);

  useEffect(() => {
    if (safeItems.length === 0) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % safeItems.length);
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [safeItems.length, interval]);

  if (safeItems.length === 0) return null;

  const item = safeItems[index];

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-xl border border-stone-200 bg-white/70 backdrop-blur-sm">
      <div className="grid md:grid-cols-2 items-stretch">
        <div className="relative aspect-[16/10] md:aspect-auto min-h-[280px]">
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          {item.category && (
            <Badge className="absolute top-3 left-3 bg-stone-800/90">{item.category}</Badge>
          )}
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-800">{item.name}</h3>
              <p className="text-stone-600 mt-2">{item.description}</p>
            </div>
            {item.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-stone-600">{item.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-3xl font-extrabold text-stone-800">${item.price.toFixed(2)}</span>
            <Button
              className="bg-amber-600 hover:bg-amber-700 text-stone-900"
              onClick={() =>
                addItem({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category })
              }
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button variant="outline" size="icon" className="ml-3 bg-white/80 backdrop-blur-sm" onClick={prev}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button variant="outline" size="icon" className="mr-3 bg-white/80 backdrop-blur-sm" onClick={next}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots helping with sliding*/}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {safeItems.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-amber-600" : "w-2.5 bg-stone-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
