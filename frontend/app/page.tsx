import MusicContainer from "@/components/homepage/MusicContainer";
import TourContainer from "@/components/homepage/TourContainer";
import VideoContainer from "@/components/homepage/VideoContainer";
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
      {/* Header */}
      <section className="h-dvh">
        <div className="bg-primary flex h-[90%] items-center justify-center">
          <Image
            src="/images/library-card.jpg"
            width={1080}
            height={1080}
            className="size-50"
            alt={"Snakes Illustration by Lot van Teylingen"}
          />
        </div>
        <div className="flex h-[10%] items-center bg-white">
          <h1 className="container text-2xl text-black">This is Library Card</h1>
        </div>
      </section>

      <section className="space-y-8 mb-8">
        <TourContainer />
        <MusicContainer />
        <VideoContainer />
      </section>
    </main>
  );
}
