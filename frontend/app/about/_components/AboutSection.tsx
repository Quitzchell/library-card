import { services } from "@/lib/services.config";
import RichText from "@/components/common/RichText";
import ImageCarousel from "@/components/common/ImageCarousel";

export default async function AboutSection() {
  const biography = await services.biography.getBiography();
  const images = await services.image.getCarouselImages();

  return (
    <section className="container space-y-8 gap-x-10 md:grid xl:grid-cols-2">
      <RichText richTextItem={biography} />
      {/*<ImageCarousel images={images} />*/}
    </section>
  );
}
