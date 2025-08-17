"use client";

import { useEffect, useState } from "react";
import { ConcertCard } from "../tour/ConcertCard";
import { services } from "@/lib/services.config";
import { TourResponse } from "@/lib/api/interfaces/tour";

export function TourContainer() {
  const [tourDates, setTourDates] = useState<TourResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setTourDates(await services.tour.getTourDates(0, 3));
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch tour dates:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      <h2>Tour</h2>
      <div className="flex flex-col gap-y-4">
        {loading ? (
          <p>loading...</p>
        ) : (
          tourDates?.data?.map((tourDate, index) => (
            <ConcertCard key={index} concert={tourDate} />
          ))
        )}
      </div>
    </div>
  );
}
