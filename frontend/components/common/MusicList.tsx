import { MusicItemDisplay, MusicItemResponse } from "@/lib/interfaces/music";
import MusicItem from "./MusicItem";

type musicListProps = {
  musicItems: MusicItemResponse;
  emptySlots?: number;
};

export default function MusicList({
  musicItems,
  emptySlots = 0,
}: musicListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {musicItems.data.map((musicItem: MusicItemDisplay, index: number) => (
        <MusicItem key={index} musicItem={musicItem} />
      ))}

      {Array.from({ length: emptySlots }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="relative w-full border border-black bg-black before:block before:bg-inherit before:pt-[100%] before:content-[''] after:block after:h-14 after:bg-inherit after:content-['']"
        />
      ))}
    </div>
  );
}
