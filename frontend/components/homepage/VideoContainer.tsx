import { NavigationLabel, NavigationRoute } from "@/lib/enums";
import SectionTitle from "./common/SectionTitle";
import SectionLink from "./common/SectionLink";
import VideoList from "../video/VideoList";

export default function VideoContainer() {
  return (
    <section className="space-y-6">
      <SectionTitle title={NavigationLabel.VIDEO} />

      <div className="container space-y-6">
        <VideoList perPage={4}/>

        <div className="flex justify-end">
            <SectionLink href={NavigationRoute.VIDEO} text="All Videos"/>
        </div>
      </div>
    </section>
  );
}
