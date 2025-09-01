import { MusicItemDisplay } from "@/lib/api/interfaces/music";
import { services } from "@/lib/services.config";
import Image from "next/image";

export default async function MusicList() {
  const musicItems = await services.music.getMusicItems(0, 4);

  return (
    <section className="grid grid-cols-2 gap-8">
      {musicItems.data.map((musicItem: MusicItemDisplay, index: number) => (
        <div key={index} className="h-75 w-full space-y-2">
          <Image src={musicItem.cover_image} width={1080} height={1080} alt={musicItem.title} />
          <div>
            <p>{musicItem.title}</p>
            <p className="text-sm">Listen online</p>
          </div>
        </div>
      ))}
    </section>
  );
}
