import MusicList from "@/components/music/MusicList";
import { MUSIC_ROUTE } from "@/components/navigation";
import Link from "next/link";
import HomeTitle from "../common/homeTitle";

export default function MusicContainer() {
  return (
    <section className="space-y-6">
      {/* title */}
      <HomeTitle title="Music" />

      {/* list */}
      <MusicList />

      {/* to music overview */}
      <div className="flex justify-end px-2">
        <Link
          href={MUSIC_ROUTE}
          className="px-2 underline hover:bg-black hover:text-white"
        >
          {"All music >>>"}
        </Link>
      </div>
    </section>
  );
}
