import Image from "next/image";
import { MusicItemDisplay, ServiceVariant } from "@/lib/interfaces/music";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MusicItem({
  musicItem,
}: {
  musicItem: MusicItemDisplay;
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full cursor-pointer space-y-2 border border-black p-4 hover:bg-black hover:text-white">
        <Image
          src={musicItem.cover_image}
          width={1080}
          height={1080}
          alt={musicItem.title}
        />
        <p className="h-12 w-full text-left text-balance underline group-hover:text-white">
          {musicItem.title}
        </p>
      </DialogTrigger>
      <DialogContent className="gap-y-0">
        <DialogHeader className="my-2 space-y-2 text-left">
          <DialogTitle>{musicItem.title}</DialogTitle>
          <Image
            src={musicItem.cover_image}
            width={1080}
            height={1080}
            alt={musicItem.title}
          />
        </DialogHeader>

        {musicItem.services.map((service: ServiceVariant, index) => (
          <MusicService key={index} service={service} />
        ))}
      </DialogContent>
    </Dialog>
  );
}

function MusicService({ service }: { service: ServiceVariant }) {
  return (
    <Button asChild variant={"ghost"} className="border-b border-black">
      <Link
        href={service.url}
        target={"_blank"}
        className="flex w-full justify-between px-2"
      >
        {service.prefix && <p>{service.prefix}</p>}
        <p>{service.name}</p>
        {service.postfix && <p>{service.postfix}</p>}
      </Link>
    </Button>
  );
}
