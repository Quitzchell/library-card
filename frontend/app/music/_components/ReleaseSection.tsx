import { services } from "@/lib/services.config";
import { calculateEmptySlots } from "@/utils/page";
import ReleaseList from "@/app/music/_components/ReleaseList";
import PaginationLinks from "@/app/_components/pagination/PaginationLinks";

type MusicSectionProps = {
  page: number;
};

const PER_PAGE = 8;

export default async function ReleaseSection({ page }: MusicSectionProps) {
  let data, meta;
  try {
    ({ data, meta } = await services.music.getReleases(page, PER_PAGE));
  } catch {
    return null;
  }

  const totalPages = meta?.total_pages ?? 1;
  const emptySlots = calculateEmptySlots(data.length, totalPages, PER_PAGE);

  return (
    <div className="space-y-5">
      <section className="flex h-full flex-col items-center justify-center">
        <ReleaseList release={{ data }} emptySlots={emptySlots} />
      </section>
      {totalPages > 1 && (
        <PaginationLinks
          totalPages={totalPages}
          currentPage={page}
          paramName={"page"}
        />
      )}
    </div>
  );
}
