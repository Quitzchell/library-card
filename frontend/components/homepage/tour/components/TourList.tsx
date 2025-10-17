import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { Button } from "../../../ui/button";
import { TourDateDisplay, TourResponse } from "@/lib/interfaces/tour";
import { cn } from "@/utils/styling";

export default function TourList({ tourDates }: { tourDates: TourResponse }) {
  const midpoint = tourDates.data.length / 2 - 1;

  const getBorderClasses = (idx: number) => {
    const isFirstRow = idx === 0;
    const isMidpoint = midpoint === idx;
    return cn(
      "border-b border-black",
      (isFirstRow || isMidpoint) && "md:border-t",
    );
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
      {tourDates.data.map((tourDate, idx) => (
        <div className="grid grid-cols-12 gap-x-5" key={tourDate.id}>
          <Button
            variant="ghost"
            className={cn("col-span-7 text-left", getBorderClasses(idx))}
          >
            <div>
              <p className="px-2 font-bold">
                {formatDate(tourDate.date, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p className="px-2 text-balance">{tourDate.venue}</p>
              <p className="mt-2 px-2 text-sm text-balance">
                {tourDate.city}, {tourDate.country}
              </p>
            </div>
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "col-span-5 flex justify-end p-2",
              getBorderClasses(idx),
            )}
          >
            <TicketButtonContent tourDate={tourDate} />
          </Button>
        </div>
      ))}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDateDisplay }) {
  if (tourDate.sold_out) {
    return <p className="line-through">Sold out</p>;
  }

  if (tourDate.ticket_url) {
    return (
      <Link href={tourDate.ticket_url} className="h-full w-full text-end">
        <p className="underline">Get tickets</p>
      </Link>
    );
  }

  return <p>Free event</p>;
}
