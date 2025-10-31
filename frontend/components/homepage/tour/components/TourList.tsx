import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { Button } from "../../../ui/button";
import { TourDateDisplay, TourResponse } from "@/lib/interfaces/tour";

export default function TourList({ tourDates }: { tourDates: TourResponse }) {
  return (
    <section className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-4">
      {tourDates.data.map((tourDate) => (
        <div className="relative border" key={tourDate.id}>
          <Button variant="ghost" className="w-full text-left">
            <div className="px-4 py-2">
              <p className="font-bold">
                {formatDate(tourDate.date, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="text-balance">{tourDate.venue}</p>
              <p className="text-sm text-balance">
                {tourDate.city}, {tourDate.country}
              </p>
            </div>
          </Button>

          <div className="absolute top-7 right-5 col-span-4 flex items-center justify-center">
            <TicketButtonContent tourDate={tourDate} />
          </div>
        </div>
      ))}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDateDisplay }) {
  if (tourDate.sold_out) {
    return (
      <div className="flex h-fit w-27 justify-center border bg-neutral-400 p-2">
        <p className="font-semibold line-through">Sold out</p>
      </div>
    );
  }

  if (tourDate.ticket_url) {
    return (
      <Button
        asChild
        variant="ghost"
        className="flex h-fit w-27 justify-center border bg-white p-2"
      >
        <Link href={tourDate.ticket_url}>
          <p className="font-semibold">Get tickets</p>
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex h-fit w-27 justify-center border bg-neutral-400 p-2">
      <p className="font-semibold">Free event</p>
    </div>
  );
}
