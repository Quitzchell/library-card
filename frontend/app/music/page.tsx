import MusicContainer from "@/components/music/MusicContainer";

export default function MusicPage() {
  return (
    <div className="container flex grow-1 flex-col py-8">
      <h1 className="mb-8 text-4xl font-bold">Music</h1>

      <section className="h-full space-y-12">
        <MusicContainer />
      </section>
    </div>
  );
}
