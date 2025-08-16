import { TourSection } from "@/components/tour/TourSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 py-16">
        {/* Tour + Music Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <TourSection />
        </div>
      </section>
    </div>
  );
}
