import { NavigationRoute } from "@/lib/enums/navigation";
import SectionTitle from "@/components/common/SectionTitle";
import SectionLink from "@/components/common/SectionLink";
import { services } from "@/lib/services.config";
import MusicList from "../common/MusicList";

export default async function MusicContainer() {
  const musicItems = await services.music.getMusicItems(1, 4);

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title="Music" />

      <div className="container space-y-6">
        <MusicList musicItems={musicItems} />
      </div>

      <div className="container flex justify-end">
        <SectionLink href={NavigationRoute.MUSIC} text="All music" />
      </div>
    </div>
  );
}
