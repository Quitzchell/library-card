"use client";

import TourList from "@/components/homepage/tour/components/TourList";
import { services } from "@/lib/services.config";
import { useEffect, useState } from "react";
import { TourResponse } from "@/lib/interfaces/tour";

export default function TourPage() {
  const [tourDates, setTourDates] = useState<TourResponse>({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTourDates() {
      try {
        const response = await services.tour.getTourDates(0, 20);
        setTourDates(response);
      } catch (error) {
        console.error("Error fetching tourdates:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTourDates();
  }, []);

  return (
    <div className="container flex grow-1 flex-col px-4 py-8">
      <h1 className="font-playfair mb-8 text-4xl font-bold">Tour</h1>
      {tourDates.data.length > 0 ? (
        <TourList tourDates={tourDates} />
      ) : (
        <p>No tourdates found</p>
      )}
    </div>
  );
}
