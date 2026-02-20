import ReleaseSection from "@/app/music/_components/ReleaseSection";

type MusicPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function MusicPage({ searchParams }: MusicPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Math.floor(Number(params.page) || 1));

  return (
    <div className="container flex grow-1 flex-col py-8">
      <h1 className="mb-8 text-4xl font-bold">Music</h1>

      <section className="h-full space-y-12">
        <ReleaseSection page={page} />
      </section>
    </div>
  );
}
