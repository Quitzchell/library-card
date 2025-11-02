import AboutContainer from "@/components/homepage/AboutContainer";
import MusicContainer from "@/components/homepage/MusicContainer";
import TourContainer from "@/components/homepage/TourContainer";
import VideoContainer from "@/components/homepage/VideoContainer";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mb-8 space-y-8">
        <TourContainer />
        <MusicContainer />
        <VideoContainer />
        <AboutContainer />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <section className="h-dvh">
      <div className="bg-primary flex h-9/10 items-center justify-center">
        <Image
          src="/images/library-card.jpg"
          width={1080}
          height={1080}
          className="size-50 md:size-100"
          alt={"Snakes Illustration by Lot van Teylingen"}
        />
      </div>
      <div className="flex h-1/10 items-center bg-white">
        <h1 className="container text-end text-2xl text-black md:text-5xl">
          This is Library Card
        </h1>
      </div>
    </section>
  );
}
