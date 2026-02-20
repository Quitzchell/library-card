import { VideoCategory } from "@/lib/enums/video-category";
import { services } from "@/lib/services.config";
import VideoList from "@/app/video/_components/VideoList";

type VideoSectionProps = {
  categories: Array<VideoCategory>;
};

export default async function VideoSection({ categories }: VideoSectionProps) {
  const { data } = await services.video.getVideoItems();
  const videosByCategory = Object.groupBy(data, (video) => video.category);

  return (
    <section className="flex flex-col space-y-5">
      <div className="grid gap-4">
        {categories
          .filter((category) => videosByCategory[category]?.length)
          .map((category) => (
            <VideoList
              key={category}
              category={category}
              videos={videosByCategory[category] ?? []}
            />
          ))}
      </div>
    </section>
  );
}
