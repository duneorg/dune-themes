/** Format dates like Massively upstream (e.g. "April 25, 2017"). */
export function formatMassivelyDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
