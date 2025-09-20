import { MusicItemDisplay, MusicItemResponse } from "@/lib/interfaces/music";
import MusicItem from "./MusicItem";

export default function MusicList({ musicItems }: { musicItems: MusicItemResponse }) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {musicItems.data.map((musicItem: MusicItemDisplay, index: number) => (
        <MusicItem key={index} musicItem={musicItem} />
      ))}
    </section>
  );
}
