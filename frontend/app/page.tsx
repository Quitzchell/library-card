import { TourContainer } from "@/components/homepage/TourContainer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16">
        {/* Tour + Music Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <section className="col-span-3">
            <TourContainer />
          </section>

          <section>{/* <MusicSection /> */}</section>
        </div>
      </section>
    </div>
  );
}
