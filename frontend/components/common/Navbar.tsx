"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "News", href: "/news" },
    { name: "Music", href: "/music" },
    { name: "Tour", href: "/tour" },
    { name: "Video", href: "/video" },
    { name: "Webshop", href: "/webshop" },
    { name: "Bio", href: "/bio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-playfair font-bold">
            Library Card
          </Link>

          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`font-playfair hover:text-white-600 transition-colors ${
                    pathname === item.href
                      ? "text-white font-semibold"
                      : "text-white-800"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
