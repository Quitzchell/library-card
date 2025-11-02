import TourContainer from "@/components/homepage/TourContainer";

export default function TourPage() {
  return (
    <div className="container flex grow-1 flex-col px-4 py-8">
      <h1 className="font-playfair mb-8 text-4xl font-bold">Tour</h1>
      <TourContainer />
    </div>
  );
}
