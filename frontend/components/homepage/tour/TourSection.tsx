import { services } from "@/lib/services.config";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { TOUR_ROUTE } from "@/components/navigation";

export default function TourContainer() {
  return (
    <>
      {/* title */}
      <h2 className="my-2 bg-black px-4 py-4 text-end text-2xl text-white">
        Tour dates
      </h2>

      {/* list */}
      <TourList />

      {/* to tour overview */}
      <div className="flex justify-end px-2 py-2">
        <Link
          href={TOUR_ROUTE}
          className="my-2 px-2 underline hover:bg-black hover:text-white"
        >
          {"All tourdates >>>"}
        </Link>
      </div>
    </>
  );
}

async function TourList() {
  const tourDates = await services.tour.getTourDates(0, 3);
  return (
    <section className="grid grid-cols-12 gap-x-5 px-2 py-2">
      {tourDates.data.map((tourDate) => (
        <React.Fragment key={tourDate.id}>
          {/* todo: make this a link to the tourdate detail page */}
          <div className="col-span-7 border-b border-black px-2 py-2 hover:bg-black hover:text-white">
            <p className="font-bold">
              {formatDate(tourDate.date, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p>{tourDate.venue}</p>

            <div className="flex">
              <p>
                {tourDate.city}, {tourDate.country}
              </p>
            </div>
          </div>

          <div className="col-span-5 flex justify-end border-b border-black">
            {!tourDate.ticket_url && !tourDate.sold_out && (
              <p className="px-2 py-2 text-gray-600">Free event</p>
            )}
            {tourDate.ticket_url && !tourDate.sold_out && (
              <Link
                href={tourDate.ticket_url}
                className="h-fit px-2 py-2 underline hover:bg-black hover:text-white"
              >
                Get tickets
              </Link>
            )}
            {tourDate.sold_out && (
              <p className="px-2 py-2 text-gray-600">Sold out</p>
            )}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
