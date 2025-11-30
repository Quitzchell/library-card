import { services } from "@/lib/services.config";

export default async function VideoServer() {
  const { data } = await services.video.getAllVideoItems();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
