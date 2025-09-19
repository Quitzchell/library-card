import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export default function VideoList({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}) {
    return (
    <Carousel opts={{loop: true}} className="w-8/10 mx-auto bg-green-100 h-10">
        <CarouselContent>
            {/* todo: add youtube */}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
    </Carousel>
    );
}
