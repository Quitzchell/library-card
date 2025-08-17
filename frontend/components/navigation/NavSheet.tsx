"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/utils/styling";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { homeItem, navItems } from "./navigationConstants";

interface NavSheetProps {
  pathname: string;
}

export default function NavSheet({ pathname }: NavSheetProps) {
  return (
    <Sheet>
      <div className="flex justify-end">
        <SheetTrigger>
          <Menu className="size-8" />
        </SheetTrigger>
      </div>
      <SheetContent className="w-80 gap-y-4">
        <SheetHeader>
          <SheetTitle className="text-4xl font-bold">Library Card</SheetTitle>
        </SheetHeader>
        {[homeItem, ...navItems].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "200 px-4 py-2 text-2xl",
              pathname.endsWith(item.href) ? "line-through" : "",
            )}
          >
            {item.name}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}