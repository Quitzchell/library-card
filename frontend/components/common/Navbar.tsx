"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/styling";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

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
    <section className="container mx-auto px-2 py-2">
      <NavigationMenu className={cn("w-full max-w-none justify-between")}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="hover:line-through">
              <h2 className="text-4xl font-bold">Library Card</h2>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink
                href={item.href}
                className={cn(
                  "text-lg",
                  pathname.endsWith(item.href) ? "font-semibold" : "",
                )}
              >
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </section>
  );
}
