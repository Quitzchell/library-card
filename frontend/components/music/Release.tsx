import StreamingService from "@/components/music/StreamingService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReleaseDisplay, Service } from "@/lib/interfaces/music";
import Image from "next/image";

export default function Release({ release }: { release: ReleaseDisplay }) {
  return (
    <Dialog>
      <DialogTrigger className="w-full cursor-pointer space-y-2 border border-black p-4 hover:bg-black hover:text-white">
        <Image
          src={release.cover_image}
          width={1080}
          height={1080}
          alt={release.title}
        />
        <p className="h-12 w-full text-left text-balance underline group-hover:text-white">
          {release.title}
        </p>
      </DialogTrigger>
      <DialogContent className="gap-y-0">
        <DialogHeader className="my-2 space-y-2 text-left">
          <DialogTitle>{release.title}</DialogTitle>
          <Image
            src={release.cover_image}
            width={1080}
            height={1080}
            alt={release.title}
          />
        </DialogHeader>

        {release.services.map((service: Service, index) => (
          <StreamingService key={index} streamingService={service} />
        ))}
      </DialogContent>
    </Dialog>
  );
}
