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
          <div className="col-span-7 border-b border-black py-2 cursor-pointer hover:bg-black hover:text-white">
            <p className="font-bold px-2">
              {formatDate(tourDate.date, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="px-2">{tourDate.venue}</p>

            <div className="flex">
              <p className="px-2">
                {tourDate.city}, {tourDate.country}
              </p>
            </div>
          </div>

          <div className="col-span-5 flex justify-end border-b border-black">
            {!tourDate.ticket_url && !tourDate.sold_out && (
              <p className="p-2 cursor-default text-gray-600 line-through">
                Free event
              </p>
            )}
            {tourDate.ticket_url && !tourDate.sold_out && (
              <Link
                href={tourDate.ticket_url}
                className="p-2 h-fit underline cursor-pointer hover:bg-black hover:text-white"
              >
                Get tickets
              </Link>
            )}
            {tourDate.sold_out && (
              <p className="p-2 cursor-default text-gray-600 line-through">
                Sold out
              </p>
            )}
          </div>
        </React.Fragment>
      ))}
    </section>
  );
}
