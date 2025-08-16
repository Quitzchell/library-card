import { TourDateDisplay } from "@/lib/api/services";
import { ConcertCard } from "./ConcertCard";

export function TourSection() {
  const TourDateList: Array<TourDateDisplay> = [
    {
      id: 1,
      venue: "Rotown",
      city: "Rotterdam",
      country: "Netherlands",
      ticket_url: "https://ticketurl.com",
      sold_out: false,
      description: undefined,
      date: new Date("11-11-2025"),
    },
    {
      id: 2,
      venue: "Paradiso",
      city: "Amsterdam",
      country: "Netherlands",
      ticket_url: undefined,
      sold_out: undefined,
      description: undefined,
      date: new Date("01-11-2025"),
    },
    {
      id: 3,
      venue: "Doornroosje",
      city: "Nijmegen",
      country: "Netherlands",
      ticket_url: "https://ticketurl.com",
      sold_out: true,
      description: undefined,
      date: new Date("02-23-2026"),
    },
  ];

  return (
    <div className="col-span-1 flex flex-col space-y-4">
      <h2>Tour</h2>
      <div className="flex flex-col gap-y-4">
        {TourDateList.map((tourDate, index) => (
          <ConcertCard key={index} concert={tourDate} />
        ))}
      </div>
    </div>
  );
}