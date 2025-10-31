import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { Button } from "../../../ui/button";
import { TourDateDisplay, TourResponse } from "@/lib/interfaces/tour";
import { cn } from "@/utils/classnames";

export default function TourList({ tourDates }: { tourDates: TourResponse }) {
  return (
    <section className="grid grid-cols-1 divide-y border-y md:grid-cols-2 md:gap-x-5">
      {tourDates.data.map((tourDate) => (
        <div className="grid grid-cols-12 gap-x-5" key={tourDate.id}>
          <Button variant="ghost" className="col-span-7 text-left">
            <div>
              <p className="px-2 font-bold">
                {formatDate(tourDate.date, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="px-2 text-balance">{tourDate.venue}</p>
              <p className="mt-1 px-2 text-sm text-balance">
                {tourDate.city}, {tourDate.country}
              </p>
            </div>
          </Button>

          <TicketButtonContent tourDate={tourDate} />
        </div>
      ))}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDateDisplay }) {
  if (tourDate.sold_out) {
    return (
      <div className="col-span-5 flex justify-end">
        <div className={cn("h-fit w-fit p-2")}>
          <p className="line-through">Sold out</p>
        </div>
      </div>
    );
  }

  if (tourDate.ticket_url) {
    return (
      <div className="col-span-5 flex justify-end">
        <Button asChild variant="ghost" className="h-fit w-fit p-2">
          <Link href={tourDate.ticket_url} className="text-end">
            <p className="underline">Get tickets</p>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="col-span-5 flex justify-end">
      <div className={cn("h-fit w-fit p-2")}>
        <p>Free event</p>
      </div>
    </div>
  );
}
