import SectionLink from "@/app/(home)/_components/SectionLink";
import SectionTitle from "@/components/common/SectionTitle";
import ReleaseList from "@/components/music/ReleaseList";
import { NavigationRoute } from "@/lib/enums/navigation";
import { services } from "@/lib/services.config";

export default async function MusicContainer() {
  const musicItems = await services.music.getReleases(1, 4);

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title="Music" />

      <div className="container space-y-6">
        <ReleaseList release={musicItems} />
      </div>

      <div className="container flex justify-end">
        <SectionLink href={NavigationRoute.MUSIC} text="All music" />
      </div>
    </div>
  );
}
