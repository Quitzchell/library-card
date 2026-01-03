import { NavigationLabel } from "@/lib/enums";
import SectionTitle from "@/components/common/SectionTitle";
import Biography from "@/components/common/RichText";
import { services } from "@/lib/services.config";
import ImageList from "@/components/common/ImageCarousel";

export default async function AboutContainer() {
  const biographyItem = await services.biography.getBiography();
  const imageList = await services.image.getImageItems({
    target: NavigationLabel.ABOUT,
  });

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title={NavigationLabel.ABOUT} />

      <div className="container space-y-8 gap-x-10 md:grid xl:grid-cols-2">
        <Biography biographyItem={biographyItem} />
        <ImageList imageList={imageList} />
      </div>
    </div>
  );
}
