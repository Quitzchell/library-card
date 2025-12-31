import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { VideoItemDisplay, VideoItemResponse } from "@/lib/interfaces/video";
import VideoItem from "@/components/common/VideoItem";

export default function VideoCarousel({
  videoList,
}: {
  videoList?: VideoItemResponse | null;
}) {
  if (videoList) {
    return (
      <Carousel
        opts={{ loop: true }}
        className="mx-auto max-w-2xl lg:max-w-3xl xl:max-w-5xl"
      >
        <CarouselContent>
          {videoList.data.map((videoItem: VideoItemDisplay) => (
            <CarouselItem key={videoItem.id}>
              <VideoItem videoItem={videoItem} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {videoList.data.length > 1 && (
          <div className="my-4 flex justify-center gap-2">
            <CarouselPrevious className="static -translate-x-4 translate-y-0" />
            <CarouselNext className="static translate-x-4 translate-y-0" />
          </div>
        )}
      </Carousel>
    );
  }
}
