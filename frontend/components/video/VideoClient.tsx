"use client";

import { VideoItemDisplay, VideosByCategory } from "@/lib/interfaces/video";
import VideoList from "@/components/video/VideoList";
import React from "react";

export default function VideoClient({ items }: { items: VideosByCategory }) {
  return (
    <section className="flex flex-col space-y-5">
      <section className="grid gap-4">
        {(
          Object.entries(items) as [
            keyof VideosByCategory,
            VideoItemDisplay[],
          ][]
        ).map(([category, videos]) => (
          <VideoList key={category} category={category} videos={videos} />
        ))}
      </section>
    </section>
  );
}
