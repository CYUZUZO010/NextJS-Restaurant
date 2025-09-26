import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AuthProviderClient from "@/components/providers/AuthProviderClient";
import { CartProvider } from "@/context/CartContext";
import ToasterClient from "@/components/providers/ToasterClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bella Vista Restaurant",
  description:
    "Experience culinary excellence with fresh ingredients and authentic flavors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-br from-stone-700 via-stone-600 to-amber-700 min-h-screen`}
      >
        <AuthProviderClient>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProviderClient>
        <ToasterClient />
      </body>
    </html>
  );
}
