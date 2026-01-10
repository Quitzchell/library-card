import { VideoCategory } from "@/lib/enums/video";
import { VideoItemDisplay } from "@/lib/interfaces/video";
import VideoItem from "./VideoItem";
import SectionTitle from "../common/SectionTitle";

const PER_ROW = 2;

export default function VideoList({
  category,
  videos,
}: {
  category: VideoCategory;
  videos: VideoItemDisplay[];
}) {
  const emptySlots = Math.max(0, PER_ROW % videos.length);
  console.log(emptySlots);

  return (
    <section className="space-y-4">
      <SectionTitle title={category} />

      <ul className="container grid gap-4 md:grid-cols-2">
        {videos.map((video: VideoItemDisplay, index: number) => (
          <li key={index}>
            <VideoItem videoItem={video} />
          </li>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="hidden h-full w-full bg-black md:block"
          />
        ))}
      </ul>
    </section>
  );
}
