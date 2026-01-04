import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

//the footer

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-stone-900 via-neutral-900 to-stone-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-2xl font-bold text-stone-400 mb-2">
              Bella Vista
            </h3>
            <p className="text-gray-400">
              Experience culinary excellence with fresh ingredients and
              authentic flavors.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <div className="space-y-2">
              <Link
                href="/menu"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/reservations"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Reservations
              </Link>
              <Link
                href="/orders"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Orders
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p>KK-523 Street</p>
              <p>Downtown, Kigali 1001</p>
              <p>(250) 788-888-888</p>
              <p>info@bellavista.com</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-4 pt-4 text-center text-gray-400">
          <p>&copy; 2024 Bella Vista Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
