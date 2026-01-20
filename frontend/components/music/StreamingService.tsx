import { Service } from "@/lib/interfaces/music";
import Link from "next/link";
import { Button } from "../ui/button";

export default function StreamingService({
  streamingService,
}: {
  streamingService: Service;
}) {
  return (
    <Button asChild variant={"ghost"} className="border-b border-black">
      <Link
        href={streamingService.url}
        target={"_blank"}
        className="flex w-full justify-between px-2"
      >
        {streamingService.prefix && <p>{streamingService.prefix}</p>}
        <p>{streamingService.name}</p>
        {streamingService.postfix && <p>{streamingService.postfix}</p>}
      </Link>
    </Button>
  );
}
