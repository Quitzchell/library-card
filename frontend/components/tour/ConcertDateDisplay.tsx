import { formatDate } from "@/utils/date";

export function ConcertDateDisplay({ date }: { date: Date }) {
  return (
    <div className="min-w-[100px] rounded-lg bg-gray-900 px-4 py-3 text-center text-gray-50">
      <div className="text-sm tracking-wide uppercase opacity-80">
        {formatDate(date, { weekday: "short" })}
      </div>
      <div className="text-3xl font-bold">
        {formatDate(date, { day: "2-digit" })}
      </div>
      <div className="text-sm">
        {formatDate(date, { month: "short" })}{" "}
        {formatDate(date, { year: "numeric" })}
      </div>
    </div>
  );
}
