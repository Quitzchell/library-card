import { VideoCategory } from "@/lib/enums/video";
import { VideoItemDisplay } from "@/lib/interfaces/video";
import VideoItem from "./VideoItem";

const PER_ROW = 2;

export default function VideoList({
  category,
  videos,
}: {
  category: VideoCategory;
  videos: VideoItemDisplay[];
}) {
  const emptySlots = Math.max(0, PER_ROW % videos.length);
  console.log(emptySlots)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">{category}</h2>

      <ul className="grid md:grid-cols-2 gap-4">
        {videos.map((video: VideoItemDisplay, index: number) => (
          <li key={index}>
            <VideoItem videoItem={video} />
          </li>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="h-full w-full bg-black hidden md:block"
          />
        ))}
      </ul>
    </section>
  );
}
