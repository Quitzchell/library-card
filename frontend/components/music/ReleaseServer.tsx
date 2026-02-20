import ReleaseClient from "@/components/music/ReleaseClient";
import { services } from "@/lib/services.config";

export default async function ReleaseServer() {
  const { data } = await services.music.getReleases();

  return <ReleaseClient items={data} />;
}
