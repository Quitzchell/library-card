import { NavigationRoute } from "@/lib/enums/navigation";
import TourList from "@/components/common/TourList";
import SectionTitle from "../common/SectionTitle";
import SectionLink from "../common/SectionLink";
import { services } from "@/lib/services.config";

export default async function TourContainer() {
  const tourDates = await services.tour.getTourDates(0, 4);

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <TourList tourDates={tourDates} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.TOUR} text="All tourdates" />
        </div>
      </div>
    </div>
  );
}
