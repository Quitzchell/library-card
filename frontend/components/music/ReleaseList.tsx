import Release from "@/components/music/Release";
import { ReleaseDisplay, ReleaseResponse } from "@/lib/interfaces/music";

type ReleaseListProps = {
  release: ReleaseResponse;
  emptySlots?: number;
};

export default function ReleaseList({
  release,
  emptySlots = 0,
}: ReleaseListProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {release.data.map((release: ReleaseDisplay, index: number) => (
        <Release key={index} release={release} />
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
