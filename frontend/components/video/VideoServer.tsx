import { services } from "@/lib/services.config";
import VideoClient from "./VideoClient";

export default async function VideoServer() {
  const { data } = await services.video.getAllVideoItems();

  return <VideoClient items={data}/>;
}
