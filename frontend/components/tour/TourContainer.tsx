"use client";

import { useEffect, useState } from "react";
import { TourResponse } from "@/lib/interfaces/tour";
import { services } from "@/lib/services.config";
import TourList from "../common/TourList";


export default function TourContainer() {
  const [tourDates, setTourDates] = useState<TourResponse>({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDates = async () => {
      try {
        const response = await services.tour.getTourDates(0, 20);
        setTourDates(response);
      } catch (error) {
        console.error("Error fetching tour dates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDates();
  }, []);

  if (loading) {
    return <p>Loading tour dates...</p>;
  }

  return (
    <>
      {tourDates.data.length > 0 ? (
        <TourList tourDates={tourDates} />
      ) : (
        <p>No tour dates found.</p>
      )}
    </>
  );
}
