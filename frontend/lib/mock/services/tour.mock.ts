import { TourDateDisplay, TourResponse } from "@/lib/interfaces/tour";

export const tourMock = {
  async getTourDates(
    page = 1,
    perPage = 20,
    direction: string,
  ): Promise<TourResponse> {
    const from = page * perPage - perPage;
    const to = from + perPage;
    const rawData =
      direction === "asc"
        ? TourDateList.sort(
            (a, b) => b.date.getTime() - a.date.getTime(),
          ).filter((tourDate) => tourDate.date <= new Date())
        : TourDateList.sort(
            (a, b) => a.date.getTime() - b.date.getTime(),
          ).filter((tourDate) => tourDate.date > new Date());
    const data: TourDateDisplay[] = rawData.slice(from, to);
    const totalItems = rawData.length;
    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data: data,
      meta: {
        current_page: page,
        total_pages: totalPages,
        per_page: perPage,
        total: totalItems,
      },
    };
  },
};

// Mockdata
const TourDateList: Array<TourDateDisplay> = [
  {
    id: 1,
    venue: "Rotown",
    city: "Rotterdam",
    country: "NL",
    ticket_url: "https://ticketurl.com",
    sold_out: false,
    description: undefined,
    date: new Date("2025-01-01"),
  },
  {
    id: 2,
    venue: "Paradiso",
    city: "Amsterdam",
    country: "NL",
    ticket_url: undefined,
    sold_out: undefined,
    description: undefined,
    date: new Date("2025-01-02"),
  },
  {
    id: 3,
    venue: "Doornroosje",
    city: "Nijmegen",
    country: "NL",
    ticket_url: "https://ticketurl.com",
    sold_out: true,
    description: undefined,
    date: new Date("2025-01-03"),
  },
  {
    id: 4,
    venue: "The Bowery Ballroom",
    city: "New York",
    country: "USA",
    ticket_url: "https://boweryballroom.com/tickets",
    sold_out: false,
    description: "Special acoustic set",
    date: new Date("2025-01-04"),
  },
  {
    id: 5,
    venue: "The Troubadour",
    city: "Los Angeles",
    country: "USA",
    ticket_url: "https://troubadour.com/shows",
    sold_out: true,
    description: undefined,
    date: new Date("2025-01-05"),
  },
  {
    id: 6,
    venue: "First Avenue",
    city: "Minneapolis",
    country: "USA",
    ticket_url: undefined,
    sold_out: false,
    description: "All ages show",
    date: new Date("2025-01-06"),
  },
  {
    id: 7,
    venue: "O2 Academy Brixton",
    city: "London",
    country: "UK",
    ticket_url: "https://academymusicgroup.com/o2academybrixton",
    sold_out: true,
    description: undefined,
    date: new Date("2025-01-07"),
  },
  {
    id: 8,
    venue: "The Roundhouse",
    city: "London",
    country: "UK",
    ticket_url: "https://roundhouse.org.uk",
    sold_out: false,
    description: "Album release show",
    date: new Date("2026-01-08"),
  },
  {
    id: 9,
    venue: "La Cigale",
    city: "Paris",
    country: "FR",
    ticket_url: undefined,
    sold_out: false,
    description: undefined,
    date: new Date("2026-01-01"),
  },
  {
    id: 10,
    venue: "Olympia",
    city: "Paris",
    country: "FR",
    ticket_url: "https://olympiahall.com/tickets",
    sold_out: true,
    description: "Live recording",
    date: new Date("2026-01-02"),
  },
  {
    id: 11,
    venue: "Columbiahalle",
    city: "Berlin",
    country: "DE",
    ticket_url: "https://columbiahalle.de",
    sold_out: false,
    description: undefined,
    date: new Date("2026-01-03"),
  },
  {
    id: 12,
    venue: "Batschkapp",
    city: "Frankfurt",
    country: "DE",
    ticket_url: undefined,
    sold_out: false,
    description: "Meet & greet available",
    date: new Date("2026-01-04"),
  },
  {
    id: 13,
    venue: "Sala Apolo",
    city: "Barcelona",
    country: "ES",
    ticket_url: "https://sala-apolo.com",
    sold_out: true,
    description: undefined,
    date: new Date("2026-01-05"),
  },
  {
    id: 14,
    venue: "Joy Eslava",
    city: "Madrid",
    country: "ES",
    ticket_url: "https://joyeslava.com/eventos",
    sold_out: false,
    description: undefined,
    date: new Date("2026-01-06"),
  },
  {
    id: 15,
    venue: "The Opera House",
    city: "Toronto",
    country: "CA",
    ticket_url: undefined,
    sold_out: true,
    description: "Festival warm-up show",
    date: new Date("2026-01-07"),
  },
  {
    id: 16,
    venue: "Vera",
    city: "Groningen",
    country: "NL",
    ticket_url: undefined,
    sold_out: true,
    description: undefined,
    date: new Date("2026-01-08"),
  },
];
