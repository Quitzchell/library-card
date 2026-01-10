import { services } from "@/lib/services.config";
import VideoClient from "./VideoClient";

export default async function VideoServer() {
  const { data } = await services.video.getVideosByCategory();

  return <VideoClient items={data} />;
}
