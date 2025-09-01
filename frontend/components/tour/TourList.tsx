import { services } from "@/lib/services.config";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";

export default async function TourList({
  page,
  perPage,
}: {
  page?: number;
  perPage?: number;
}) {
  const tourDates = await services.tour.getTourDates(page, perPage);

  return (
    <section className="grid grid-cols-12 gap-x-5">
      {tourDates.data.map((tourDate) => (
        <React.Fragment key={tourDate.id}>
          {/* todo: make this a link to the tourdate detail page */}
          <div className="col-span-7 border-b border-black py-2 hover:bg-black hover:text-white">
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
              <p className="my-2 text-gray-600">Free event</p>
            )}
            {tourDate.ticket_url && !tourDate.sold_out && (
              <Link
                href={tourDate.ticket_url}
                className="my-2 h-fit underline hover:bg-black hover:text-white"
              >
                Get tickets
              </Link>
            )}
            {tourDate.sold_out && (
              <p className="my-2 text-gray-600">Sold out</p>
            )}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
