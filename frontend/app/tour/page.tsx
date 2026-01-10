import TourContainer from "@/components/tour/TourServer";
import { TourDateEnum } from "@/lib/enums/tour";

export default function TourPage() {
  return (
    <div className="flex grow-1 flex-col py-8">
      <h1 className="container mb-8 text-4xl font-bold">Tour</h1>

      <section className="h-full space-y-12">
        <TourContainer direction={TourDateEnum.UPCOMING} />
        <TourContainer direction={TourDateEnum.PAST} />
      </section>
    </div>
  );
}
