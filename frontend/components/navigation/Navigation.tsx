"use client";

import { usePathname } from "next/navigation";
import { NavSheet, NavBar } from ".";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <section className="hidden lg:block">
        <NavBar pathname={pathname} />
      </section>

      <section className="lg:hidden">
        <NavSheet pathname={pathname} />
      </section>
    </>
  );
}
