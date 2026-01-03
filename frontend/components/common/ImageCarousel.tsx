import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ImageItemDisplay, ImageItemResponse } from "@/lib/interfaces/image";
import Image from "next/image";

type ImageListProps = {
  imageList?: ImageItemResponse | null;
};

export default function ImageList({ imageList }: ImageListProps) {
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
            </CarouselItem>
          ))}
        </CarouselContent>
        {imageList.data.length > 1 && (
          <div className="my-4 flex justify-center gap-2">
            <CarouselPrevious className="static -translate-x-4 translate-y-0" />
            <CarouselNext className="static translate-x-4 translate-y-0" />
          </div>
        )}
      </Carousel>
    );
  }
}
