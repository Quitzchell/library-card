import { VideoCategory } from "@/lib/enums/video-category";
import { Video } from "@/lib/interfaces/video";
import SectionTitle from "@/components/common/SectionTitle";
import VideoItem from "@/app/video/_components/VideoItem";

const PER_ROW = 2;

export default function VideoList({
  category,
  videos,
}: {
  category: VideoCategory;
  videos: Video[];
}) {
  const emptySlots = Math.max(0, PER_ROW % videos.length);

  return (
    <section className="space-y-4">
      <SectionTitle title={category} />

      <ul className="container grid gap-4 md:grid-cols-2">
        {videos.map((video: Video, index: number) => (
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
