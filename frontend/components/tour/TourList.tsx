import { services } from "@/lib/services.config";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TourDateDisplay } from "@/lib/interfaces/tour";

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
          <Button
            variant={"ghost"}
            className="col-span-7 border-b border-black text-left"
          >
            {/* todo: make this a link to the tourdate detail page */}
            <div>
              <p className="px-2 font-bold">
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
          </Button>

          <Button
            variant={"ghost"}
            className="col-span-5 flex justify-end border-b border-black p-2"
          >
            <TicketButtonContent tourDate={tourDate} />
          </Button>
        </React.Fragment>
      ))}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDateDisplay }) {
  if (!tourDate.ticket_url && !tourDate.sold_out) {
    return (
      <div>
        <p className="line-through">Free event</p>
      </div>
    );
  }

  if (tourDate.ticket_url && !tourDate.sold_out) {
    return (
      <Link href={tourDate.ticket_url} className="w-full h-full text-end">
        <p className="underline">Get tickets</p>
      </Link>
    );
  }

  if (tourDate.sold_out) {
    return (
      <div>
        <p className="line-through">Sold out</p>
      </div>
    );
  }
}
