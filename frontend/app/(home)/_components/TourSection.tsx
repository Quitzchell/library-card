import { NavigationRoute } from "@/lib/enums/navigation";
import TourList from "@/components/tour/TourList";
import SectionTitle from "@/components/common/SectionTitle";
import SectionLink from "@/app/(home)/_components/SectionLink";
import { services } from "@/lib/services.config";
import { TourDateEnum } from "@/lib/enums/tour";

export default async function TourSection() {
  const tourDates = await services.tour.getTourDates(
    1,
    3,
    TourDateEnum.UPCOMING,
  );

  if (tourDates.data.length <= 1) return null;

  return (
    <section className="space-y-8 md:space-y-10">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <TourList tourDates={tourDates} direction={TourDateEnum.UPCOMING} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.TOUR} text="All tourdates" />
        </div>
      </div>
    </section>
  );
}
