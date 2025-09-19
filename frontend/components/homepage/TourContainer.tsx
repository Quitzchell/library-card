import { NavigationRoute } from "@/lib/enums/navigation";
import TourList from "@/components/tour/TourList";
import SectionTitle from "./common/SectionTitle";
import SectionLink from "./common/SectionLink";

export default function TourContainer() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <TourList perPage={3} />

        <div className="flex justify-end">
          <SectionLink href={NavigationRoute.TOUR} text="All tourdates" />
        </div>
      </div>
    </section>
  );
}
