"use client";

import { Biography } from "@/lib/interfaces/biography";
import { ImageItemResponse } from "@/lib/interfaces/image";
import RichText from "../common/RichText";
import ImageCarousel from "../common/ImageCarousel";

export default function AboutClient({
  biography,
  images,
}: {
  biography: Biography;
  images: ImageItemResponse;
}) {
  return (
    <section className="container space-y-8 gap-x-10 md:grid xl:grid-cols-2">
      <RichText richTextItem={biography} />
      <ImageCarousel imageList={images} />
    </section>
  );
}
