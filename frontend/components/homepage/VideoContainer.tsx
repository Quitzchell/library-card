import { NavigationLabel, NavigationRoute } from "@/lib/enums";
import SectionTitle from "@/components/common/SectionTitle";
import SectionLink from "@/components/common/SectionLink";
import VideoList from "@/components/common/VideoCarousel";
import { services } from "@/lib/services.config";

export default async function VideoContainer() {
  const videoList = await services.video.getVideoItems(0, 4);

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title={NavigationLabel.VIDEO} />

      <div className="container space-y-6">
        <VideoList videoList={videoList} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.VIDEO} text="All Videos" />
        </div>
      </div>
    </div>
  );
}
