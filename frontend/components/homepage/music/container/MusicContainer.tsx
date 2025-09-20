import MusicList from "@/components/homepage/music/components/MusicList";
import { NavigationRoute } from "@/lib/enums/navigation";
import SectionTitle from "@/components/homepage/common/SectionTitle";
import SectionLink from "@/components/homepage/common/SectionLink";
import { services } from "@/lib/services.config";

export default async function MusicContainer() {
  const musicItems = await services.music.getMusicItems(0, 4);

  return (
    <section className="space-y-6">
      <SectionTitle title="Music" />

      <div className="container space-y-6">
        <MusicList musicItems={musicItems}/>
        
        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.MUSIC} text="All music" />
        </div>
      </div>
    </section>
  );
}
