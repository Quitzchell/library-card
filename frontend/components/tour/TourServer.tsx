import { services } from "@/lib/services.config";
import TourClient from "./TourClient";
import { TourDateEnum } from "@/lib/enums/tour";

export default async function MusicServer({
  direction,
}: {
  direction: TourDateEnum;
}) {
  const { data } =
    direction === TourDateEnum.UPCOMING
      ? await services.tour.getUpcomingDates()
      : await services.tour.getPastDates();

  return <TourClient items={data} direction={direction} />;
}
