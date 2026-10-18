export const TZ = "Europe/Stockholm";

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: TZ, ...opts }).format(d);

/** YYYY-MM-DD of `d` in Stockholm. */
export const stockholmDate = (d: Date = new Date()) =>
  fmt(d, { year: "numeric", month: "2-digit", day: "2-digit" });

/** HH:MM of `d` in Stockholm. */
export const stockholmTime = (d: Date) =>
  fmt(d, { hour: "2-digit", minute: "2-digit", hour12: false });

/** The instant of 00:00 Stockholm time on `date` (YYYY-MM-DD). Handles DST. */
export const stockholmMidnight = (date: string): Date => {
  for (const offset of ["+01:00", "+02:00"]) {
    const d = new Date(`${date}T00:00:00${offset}`);
    if (stockholmDate(d) === date && stockholmTime(d) === "00:00") return d;
  }
  throw new Error(`Cannot resolve Stockholm midnight for ${date}`);
};
