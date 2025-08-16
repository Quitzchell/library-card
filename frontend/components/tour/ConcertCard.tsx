import { TourDateDisplay } from "@/lib/api/services";
import { ConcertDateDisplay } from "./ConcertDateDisplay";
import { TicketButton } from "./TicketButton";

export function ConcertCard({ concert }: { concert: TourDateDisplay }) {
  const { venue, city, country, ticket_url, sold_out, date } = concert;
  return (
    <div className="flex items-center gap-6 rounded-lg border border-gray-200 bg-gray-50 p-4 transition-shadow hover:shadow-md">
      <ConcertDateDisplay date={date} />

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{venue}</h3>
        <p className="text-gray-900">
          {city}, {country}
        </p>
      </div>

      <div>
        <TicketButton sold_out={sold_out} ticket_url={ticket_url} />
      </div>
    </div>
  );
}
