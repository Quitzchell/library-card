import { VideoItemDisplay } from "@/lib/interfaces/video";

export default function VideoItem({video}: {video: VideoItemDisplay}) {
  return (
    <div className="aspect-video">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${video.video_id}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
