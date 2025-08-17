"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/utils/styling";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { name: "News", href: "/news" },
  { name: "Music", href: "/music" },
  { name: "Tour", href: "/tour" },
  { name: "Video", href: "/video" },
  { name: "Webshop", href: "/webshop" },
  { name: "Bio", href: "/bio" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <section className="container mx-auto hidden px-2 py-2 lg:block">
        <NavBar pathname={pathname} />
      </section>

      <section className="container mx-auto block px-6 py-4 lg:hidden">
        <NavSheet pathname={pathname} />
      </section>
    </>
  );
}

function NavBar({ pathname }: { pathname: string }) {
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

function NavSheet({ pathname }: { pathname: string }) {
  return (
    <Sheet>
      <div className="flex justify-end">
        <SheetTrigger>
          <Menu className="size-8" />
        </SheetTrigger>
      </div>
      <SheetContent className="w-80 gap-y-4">
        <SheetHeader>
          <SheetTitle className="text-4xl font-bold">
            <Link href={'/'}>Library Card</Link>
          </SheetTitle>
        </SheetHeader>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "px-4 py-2 200 text-2xl",
              pathname.endsWith(item.href) ? "font-semibold" : "",
            )}
          >
            {item.name}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
