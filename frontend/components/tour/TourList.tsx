import { formatDate } from "@/utils/date";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TourDateDisplay, TourResponse } from "@/lib/interfaces/tour";
import { cn } from "@/utils/classnames";
import { TourDateEnum } from "@/lib/enums/tour";

type TourListProps = {
  tourDates: TourResponse;
  direction: TourDateEnum;
};

export default function TourList({ tourDates, direction }: TourListProps) {
  const isUpcoming = direction === TourDateEnum.UPCOMING;

  return (
    <div className="flex flex-col gap-2">
      {tourDates.data.map((tourDate) => (
        <TourRow
          key={tourDate.id}
          tourDate={tourDate}
          showTickets={isUpcoming}
        />
      ))}
    </div>
  );
}

function TourRow({
  tourDate,
  showTickets,
}: {
  tourDate: TourDateDisplay;
  showTickets: boolean;
}) {
  return (
    <section className="grid grid-cols-12 gap-x-2">
      <Button
        variant="outline"
        className={cn(
          "text-left",
          showTickets ? "col-span-8 md:col-span-10" : "col-span-full",
        )}
      >
        <div className="px-4 py-2">
          <p className="font-bold">
            {formatDate(tourDate.date, "full", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="text-balance">{tourDate.venue}</p>
          <p className="text-sm text-balance">
            {tourDate.city}, {tourDate.country}
          </p>
        </div>
      </Button>

      {showTickets && <TicketButtonContent tourDate={tourDate} />}
    </section>
  );
}

function TicketButtonContent({ tourDate }: { tourDate: TourDateDisplay }) {
  const baseClasses =
    "col-span-4 md:col-span-2 px-4 text-center flex size-full items-center justify-center border";

  if (tourDate.sold_out)
    return (
      <div className={baseClasses}>
        <p className="font-semibold text-balance line-through">Sold out</p>
      </div>
    );

  if (tourDate.ticket_url)
    return (
      <Button asChild variant="outline" className={baseClasses}>
        <Link href={tourDate.ticket_url}>
          <p className="font-semibold text-balance">Get tickets</p>
        </Link>
      </Button>
    );

  return (
    <div className={baseClasses}>
      <p className="font-semibold text-balance">Free event</p>
    </div>
  );
}
