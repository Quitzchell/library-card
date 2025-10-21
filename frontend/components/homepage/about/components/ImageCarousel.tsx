import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ImageItemDisplay, ImageItemResponse } from "@/lib/interfaces/image";
import Image from "next/image";

export default function ImageList({
  imageList,
}: {
  imageList?: ImageItemResponse | null;
}) {
  if (imageList) {
    return (
      <Carousel opts={{ loop: true }} className="mx-auto w-full">
        <CarouselContent>
          {imageList.data.map((imageItem: ImageItemDisplay) => (
            <CarouselItem key={imageItem.id}>
              <Image
                src={imageItem.src}
                alt={imageItem.alt}
                width={1080}
                height={1080}
                className="aspect-video object-scale-down"
              />
              <p className="mt-1 text-center text-sm italic">
                {imageItem.caption}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
        {imageList.data.length > 1 && (
          <div className="my-4 flex justify-center gap-2">
            <CarouselPrevious className="static -translate-x-4 -translate-y-2" />
            <CarouselNext className="static translate-x-4 -translate-y-2" />
          </div>
        )}
      </Carousel>
    );
  }
}
