"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navigation/NavBar";
import NavSheet from "@/components/navigation/NavSheet";

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
