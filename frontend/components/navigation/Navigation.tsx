"use client";

import { usePathname } from "next/navigation";
import NavSheet2 from "./NavSheet";

export default function Navigation() {
  const pathname = usePathname();

  return (

    <NavSheet2 pathname={pathname}/>
  );
}
