import { ReleaseLink } from "@/lib/interfaces/music";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ReleaseLinks({ link }: { link: ReleaseLink }) {
  return (
    <Button asChild variant={"ghost"} className="border-b border-black">
      <Link
        href={link.url}
        target={"_blank"}
        className="flex w-full justify-between px-2"
      >
        <p>{link.name}</p>
        {link.postfix && <p>{link.postfix}</p>}
      </Link>
    </Button>
  );
}
