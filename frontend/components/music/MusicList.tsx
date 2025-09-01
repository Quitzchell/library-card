import { MusicItemDisplay } from "@/lib/api/interfaces/music";
import { services } from "@/lib/services.config";
import Image from "next/image";

export default async function MusicList() {
  const musicItems = await services.music.getMusicItems(0, 4);

  return (
    <section className="grid grid-cols-2 gap-3">
      {musicItems.data.map((musicItem: MusicItemDisplay, index: number) => (
        <div key={index} className="cursor-pointer group h-75 p-2 w-full space-y-2 hover:bg-black">
          <Image
            src={musicItem.cover_image}
            width={1080}
            height={1080}
            alt={musicItem.title}
          />
          <div>
            <p className="w-fit underline group-hover:text-white">
              {musicItem.title}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
