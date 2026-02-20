import TourSection from "@/app/tour/_components/TourSection";
import { TourDateEnum } from "@/lib/enums/tour-date";
import { sanitizePageParam } from "@/utils/page";

type TourPageProps = {
  searchParams: Promise<{ upcoming_page?: string; past_page?: string }>;
};

export default async function TourPage({ searchParams }: TourPageProps) {
  const params = await searchParams;
  const upcomingPage = sanitizePageParam(params.upcoming_page);
  const pastPage = sanitizePageParam(params.past_page);

  return (
    <div className="flex grow-1 flex-col py-8">
      <h1 className="container mb-8 text-4xl font-bold">Tour</h1>

      <section className="h-full space-y-12">
        <TourSection direction={TourDateEnum.UPCOMING} page={upcomingPage} />
        <TourSection direction={TourDateEnum.PAST} page={pastPage} />
      </section>
    </div>
  );
}
