"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
};



type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (id: CartItem["id"]) => void;
  clearCart: () => void;
  updateQty: (id: CartItem["id"], qty: number) => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "cart_items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  }, []);

  const persist = (arr: CartItem[]) => {
    setItems(arr);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  };

  const addItem: CartContextType["addItem"] = (item, qty = 1) => {
    persist(
      (() => {
        const existing = items.find((i) => i.id === item.id);
        if (existing) {
          return items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
        }
        return [...items, { ...item, quantity: qty }];
      })()
    );
  };

  const removeItem = (id: CartItem["id"]) => {
    persist(items.filter((i) => i.id !== id));
  };

  const clearCart = () => persist([]);
  //

  const updateQty = (id: CartItem["id"], qty: number) => {
    if (qty <= 0) return removeItem(id);
    persist(items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const count = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, updateQty, count, total }),
    [items, count, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
