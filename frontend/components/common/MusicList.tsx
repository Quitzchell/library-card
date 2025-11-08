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
          className="group bg-primary/20 flex w-full cursor-default flex-col space-y-2 border border-black p-4"
        >
          <div className="flex aspect-square w-full items-center justify-center" />
          <div className="h-12 w-full" />
        </div>
      ))}
    </div>
  );
}
