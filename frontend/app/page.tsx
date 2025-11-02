import Hero from "@/components/common/Hero";
import AboutContainer from "@/components/homepage/AboutContainer";
import MusicContainer from "@/components/homepage/MusicContainer";
import TourSection from "@/components/homepage/TourSection";
import VideoContainer from "@/components/homepage/VideoContainer";

import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mb-8 space-y-8">
        <TourSection />
        <MusicContainer />
        <VideoContainer />
        <AboutContainer />
      </section>
    </main>
  );
}
