import VideoServer from "@/components/video/VideoServer"

export default function VideoPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <h1 className="mb-8 text-4xl font-bold">Video</h1>

      <section className="h-full space-y-12">
        <VideoServer />
      </section>
    </div>
  );
}
