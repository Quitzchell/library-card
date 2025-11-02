import { NavigationRoute } from "@/lib/enums/navigation";
import TourList from "@/components/tour/TourList";
import SectionTitle from "../common/SectionTitle";
import SectionLink from "../common/SectionLink";
import { services } from "@/lib/services.config";
import { TourDateEnum } from "@/lib/enums/tour";

export default async function TourSection() {
  const tourDates = await services.tour.getTourDates(1, 3, TourDateEnum.UPCOMING);

  return (
    <div className="space-y-8 md:space-y-10">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <section className="grid grid-cols-1 gap-y-4">
          <TourList tourDates={tourDates} direction={TourDateEnum.UPCOMING}/>
        </section>

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.TOUR} text="All tourdates" />
        </div>
      </div>
    </div>
  );
}
