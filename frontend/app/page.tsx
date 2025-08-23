import TourContainer from "@/components/homepage/tour/TourSection";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="md:hidden">
        <Mobile />
      </section>
    </div>
  );
}

function Mobile() {
  return (
    <main>
      <section className="h-dvh">
        <div className="bg-primary flex h-[92%] items-center justify-center">
          <Image
            src="/images/library-card.jpg"
            width={1080}
            height={1080}
            className="size-50"
            alt={"Snakes Illustration by Lot van Teylingen"}
          />
        </div>
        <div className="flex h-[8%] items-center bg-white">
          <h1 className="px-4 text-2xl text-black">This is Library Card</h1>
        </div>
      </section>

      {/* todo: create tour overview */}
      {/* interface for Tour is TourDateDisplay */}
      <section>
        <TourContainer />
      </section>

      {/* todo: insert music embed through cms */}
      {/* <section className="space-y-6 bg-white py-4">
        <div>
          <iframe
            src="https://bandcamp.com/EmbeddedPlayer/album=3263517600/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/"
            className="outline-black rounded m-auto h-30 w-[90%] shadow outline-2"
            seamless
          >
            <a href="https://thisislibrarycard.bandcamp.com/album/nothing-interesting">
              Nothing, Interesting by Library Card
            </a>
          </iframe>
        </div>

        <div>
          <iframe
            src="https://bandcamp.com/EmbeddedPlayer/track=920608957/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/"
            className="m-auto h-30 w-[90%] rounded shadow outline-2 outline-black"
            seamless
          >
            <a href="https://thisislibrarycard.bandcamp.com/track/art-school">
              Art School by Library Card
            </a>
          </iframe>
        </div>
      </section> */}
    </main>
  );
}
