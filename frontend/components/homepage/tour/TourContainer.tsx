import React from "react";
import { TOUR_ROUTE } from "@/components/navigation";
import TourList from "@/components/tour/TourList";
import SectionTitle from "../common/SectionTitle";
import SectionLink from "../common/SectionLink";

export default function TourContainer() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Tour dates" />

      <div className="container space-y-6">
        <TourList perPage={3} />

        <div className="flex justify-end">
          <SectionLink href={TOUR_ROUTE} text="All tourdates" />
        </div>
      </div>
    </section>
  );
}
