"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { services } from "@/lib/services.config";
import { VideoItemResponse } from "@/lib/interfaces/video";
import VideoItem from "./VideoItem";

export default function VideoList({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [videoList, setVideoList] = useState<VideoItemResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await services.video.getVideoItems(page, perPage);
        setVideoList(data);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [page, perPage]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (loading || !videoList) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="mx-auto max-w-2xl"
      >
        <CarouselContent>
          {videoList.data.map((video) => (
            <CarouselItem key={video.id}>
              <VideoItem video={video} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${
              current === index + 1 ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
