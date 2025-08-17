"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import NavSheet from "./NavSheet";

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
