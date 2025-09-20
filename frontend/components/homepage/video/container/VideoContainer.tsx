import { NavigationLabel, NavigationRoute } from "@/lib/enums";
import SectionTitle from "@/components/homepage/common/SectionTitle";
import SectionLink from "@/components/homepage/common/SectionLink";
import VideoList from "@/components/homepage/video/components/VideoCarousel";
import { services } from "@/lib/services.config";

export default async function VideoContainer() {
  const data = await services.video.getVideoItems(0, 4);
  
  return (
    <section className="space-y-6">
      <SectionTitle title={NavigationLabel.VIDEO} />

      <div className="container space-y-6">
        <VideoList videoList={data} />

        <div className="flex justify-end">
            <SectionLink href={NavigationRoute.VIDEO} text="All Videos"/>
        </div>
      </div>
    </section>
  );
}
