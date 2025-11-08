import TourContainer from "@/components/tour/TourContainer";
import { TourDateEnum } from "@/lib/enums/tour";

export default function TourPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <h1 className="mb-8 text-4xl font-bold">Tour</h1>

      <section className="h-full space-y-12">
        <h2 className="mb-8 text-2xl font-bold">Upcoming Shows</h2>
        <TourContainer direction={TourDateEnum.UPCOMING} />

        <h2 className="mb-8 text-2xl font-bold">Previous Shows</h2>
        <TourContainer direction={TourDateEnum.PAST} />
      </section>
    </div>
  );
}
