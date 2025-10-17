"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/utils/classnames";
import { homeItem, navItems } from "@/lib/enums/navigation";
import { useState, useRef } from "react";

interface NavSheetProps {
  pathname: string;
}

export default function NavSheet({ pathname }: NavSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animatingRef = useRef(false);

  function handleMenuClick() {
    // Prevent clicks during animation
    if (animatingRef.current) return;

    animatingRef.current = true;

    if (!isOpen) {
      // Opening menu
      setIsOpen(true);
      setIsVisible(true);
      // Allow clicks after animation starts
      setTimeout(() => {
        animatingRef.current = false;
      }, 400);
    } else {
      // Closing menu
      setIsOpen(false);
      setTimeout(() => {
        setIsVisible(false);
        animatingRef.current = false;
      }, 800);
    }
  }

  function handleMenuItemClick() {
    if (!isOpen) {
      // Opening menu
      setIsOpen(true);
      setIsVisible(true);
    } else {
      // Closing menu
      setIsOpen(false);
      setIsVisible(false);
    }
  }

  return (
    <nav
      className={cn(
        "absolute top-0 right-0",
        pathname.endsWith(homeItem.href) && "text-white",
      )}
    >
      <section className="flex flex-col items-end space-y-4 px-6 pt-4">
        <Menu
          className="-mr-1 size-8 cursor-pointer"
          onClick={handleMenuClick}
        />

        <div
          className={cn("space-y-4 text-lg", isVisible ? "block" : "hidden")}
        >
          {[homeItem, ...navItems].map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "text-right",
                isOpen
                  ? "animate-slide-in-from-top opacity-0"
                  : "animate-slide-out-to-top opacity-100",
              )}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <Link
                href={item.href}
                className={cn(
                  "cursor-pointer",
                  pathname.endsWith(item.href) && "font-extrabold",
                )}
                onClick={handleMenuItemClick}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </nav>
  );
}
