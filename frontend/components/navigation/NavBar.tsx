"use client";

import { cn } from "@/utils/styling";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navItems } from "./navigationConstants";

interface NavBarProps {
  pathname: string;
}

export default function NavBar({ pathname }: NavBarProps) {
  return (
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
  );
}