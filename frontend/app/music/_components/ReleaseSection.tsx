import { services } from "@/lib/services.config";
import ReleaseList from "@/app/music/_components/ReleaseList";
import PaginationLinks from "@/components/common/PaginationLinks";

type MusicSectionProps = {
  page: number;
};

const PER_PAGE = 8;

export default async function ReleaseSection({ page }: MusicSectionProps) {
  const { data, meta } = await services.music.getReleases(page, PER_PAGE);
  const totalPages = meta?.total_pages ?? 1;
  const emptySlots = totalPages > 1 ? Math.max(0, PER_PAGE - data.length) : 0;

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
