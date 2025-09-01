import Link from "next/link";
import React from "react";
import { TOUR_ROUTE } from "@/components/navigation";
import TourList from "@/components/tour/TourList";
import HomeTitle from "../common/homeTitle";

export default function TourContainer() {
  return (
    <section className="space-y-6">
      {/* title */}
      <HomeTitle title="Tour dates" />

      {/* list */}
      <TourList perPage={3}/>

      {/* to tour overview */}
      <div className="flex justify-end px-2">
        <Link
          href={TOUR_ROUTE}
          className="px-2 underline hover:bg-black hover:text-white"
        >
          {"All tourdates >>>"}
        </Link>
      </div>
    </section>
  );
}
