export function buildGoogleCalendarUrl({
  title,
  location,
  start,
  durationHours = 3,
}: {
  title: string;
  location?: string;
  start: Date;
  durationHours?: number;
}) {
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
  const toUtcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
  });
  if (location) params.set("location", location);

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
