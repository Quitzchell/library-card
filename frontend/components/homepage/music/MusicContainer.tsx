import MusicList from "@/components/music/MusicList";
import { MUSIC_ROUTE } from "@/components/navigation";
import SectionTitle from "../common/SectionTitle";
import SectionLink from "../common/SectionLink";

export default function MusicContainer() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Music" />

      <div className="container space-y-6">
        <MusicList />
        
        <div className="flex justify-end">
          <SectionLink href={MUSIC_ROUTE} text="All music" />
        </div>
      </div>
    </section>
  );
}
