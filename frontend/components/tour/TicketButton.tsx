export function TicketButton({
  sold_out,
  ticket_url,
}: {
  sold_out?: boolean;
  ticket_url?: string;
}) {
  if (sold_out) {
    return (
      <span className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-900">
        Sold Out
      </span>
    );
  }

  if (ticket_url) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={ticket_url}
        className="inline-block rounded-lg bg-gray-900 px-4 py-2 font-medium text-gray-50 transition-colors hover:bg-gray-700 hover:shadow"
      >
        Get Tickets
      </a>
    );
  }

  return (
    <span className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-900">
      Free
    </span>
  );
}