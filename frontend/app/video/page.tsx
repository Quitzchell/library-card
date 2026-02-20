import { VideoCategory } from "@/lib/enums/video-category";
import VideoSection from "@/app/video/_components/VideoSection";

export default function VideoPage() {
  const categories = Object.values(VideoCategory);

  return (
    <div className="flex grow-1 flex-col py-8">
      <h1 className="container mb-8 text-4xl font-bold">Video</h1>

      <section className="h-full space-y-12">
        <VideoSection categories={categories} />
      </section>
    </div>
  );
}
