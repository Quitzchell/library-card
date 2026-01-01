import { VideoCategory } from "@/lib/enums/video";
import { VideoItemDisplay } from "@/lib/interfaces/video";

export default function VideoList({
  category,
  videos,
}: {
  category: VideoCategory;
  videos: VideoItemDisplay[];
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold">{category}</h2>

      <ul className="space-y-2">
        {videos.map((video) => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </section>
  );
}
