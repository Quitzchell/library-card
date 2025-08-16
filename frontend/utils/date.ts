export const formatDate = (
  date: Date | string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString(
    "en-EN",
    options || {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
};
