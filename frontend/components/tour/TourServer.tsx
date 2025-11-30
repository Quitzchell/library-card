import { services } from "@/lib/services.config";
import TourClient from "@/components/tour/TourClient";
import { TourDateEnum } from "@/lib/enums/tour";

export default async function TourServer({
  direction,
}: {
  direction: TourDateEnum;
}) {
  const fetcher =
    direction === TourDateEnum.UPCOMING
      ? services.tour.getUpcomingDates
      : services.tour.getPastDates;

  const { data } = await fetcher();
  return <TourClient items={data} direction={direction} />;
}
