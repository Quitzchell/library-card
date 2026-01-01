import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SectionLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Button variant={"ghost"}>
      <Link
        href={href}
        className="-my-2 p-2 underline hover:bg-black hover:text-white"
      >
        {text}
      </Link>
    </Button>
  );
}
