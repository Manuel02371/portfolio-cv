export function formatDate(value?: string) {
  if (!value) {
    return "Actual";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("es", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateRange(startDate?: string, endDate?: string, isCurrent = false) {
  const start = formatDate(startDate);
  const end = isCurrent ? "Actual" : formatDate(endDate);
  return `${start} - ${end}`;
}
