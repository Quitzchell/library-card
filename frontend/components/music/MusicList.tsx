import { MusicItemDisplay } from "@/lib/interfaces/music";
import MusicItem from "./MusicItem";
import { services } from "@/lib/services.config";

export default async function MusicList() {
  const musicItems = await services.music.getMusicItems(0, 4);

  return (
    <section className="grid grid-cols-2 gap-3">
      {musicItems.data.map((musicItem: MusicItemDisplay, index: number) => (
        <MusicItem key={index} musicItem={musicItem} />
      ))}
    </section>
  );
}
