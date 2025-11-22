import { services } from "@/lib/services.config";
import MusicClient from "./MusicClient";

export default async function MusicServer() {
  const { data } = await services.music.getAllMusicItems();

  return <MusicClient items={data} />;
}
