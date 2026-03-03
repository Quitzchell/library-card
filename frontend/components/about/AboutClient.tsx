"use client";

import { Biography } from "@/lib/interfaces/biography";
import RichText from "../common/RichText";
import ImageCarousel from "../common/ImageCarousel";
import { CarouselImage } from "@/lib/interfaces/image";

interface AboutClientProps {
  biography: Biography;
  images: CarouselImage[];
}

export default function AboutClient({ biography, images }: AboutClientProps) {
  return (
    <section className="container space-y-8 gap-x-10 md:grid xl:grid-cols-2">
      <RichText richTextItem={biography} />
      <ImageCarousel images={images} />
    </section>
  );
}
