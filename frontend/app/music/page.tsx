import ReleaseSection from "@/app/music/_components/ReleaseSection";
import PageHeader from "@/app/_components/PageHeader";
import { sanitizePageParam } from "@/utils/page";

type MusicPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function MusicPage({ searchParams }: MusicPageProps) {
  const params = await searchParams;
  const page = sanitizePageParam(params.page);

  return (
    <div className="container flex grow-1 flex-col py-8">
      <PageHeader title="music" />

      <section className="h-full content-center space-y-12">
        <ReleaseSection page={page} />
      </section>
    </div>
  );
}
