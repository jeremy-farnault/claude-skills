// Usage: tsx calendar.ts <ics-url> [YYYY-MM-DD]
// Prints one day's meetings (Stockholm time) as JSON, with recurring series expanded.
// Uses ical.js directly: ical-expander mixed up titles when several series share a start time.
import ICAL from "ical.js";
import { stockholmDate, stockholmMidnight, stockholmTime } from "./time.ts";

const [url, day = stockholmDate()] = process.argv.slice(2);
if (!url) {
  console.error("Usage: tsx calendar.ts <ics-url> [YYYY-MM-DD]");
  process.exit(1);
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Calendar fetch failed: HTTP ${res.status}`);
  process.exit(1);
}

const root = new ICAL.Component(ICAL.parse(await res.text()));
// Outlook uses Windows zone names ("W. Europe Standard Time"); register the file's VTIMEZONEs.
for (const tz of root.getAllSubcomponents("vtimezone")) {
  ICAL.TimezoneService.register(new ICAL.Timezone(tz));
}

const from = stockholmMidnight(day).getTime();
const to = from + 24 * 3600 * 1000;
const overlaps = (start: Date, end: Date) => start.getTime() < to && end.getTime() > from;

type Meeting = {
  start: string;
  end: string;
  allDay: boolean;
  title: string;
  location: string | null;
  recurring: boolean;
  cancelled: boolean;
};

const toMeeting = (e: ICAL.Event, start: ICAL.Time, end: ICAL.Time, recurring: boolean): Meeting => {
  const title = (e.summary ?? "").trim();
  const status = String(e.component.getFirstPropertyValue("status") ?? "");
  return {
    start: start.isDate ? "all-day" : stockholmTime(start.toJSDate()),
    end: end.isDate ? "all-day" : stockholmTime(end.toJSDate()),
    allDay: start.isDate,
    title,
    location: e.location || null,
    recurring,
    cancelled: status.toUpperCase() === "CANCELLED" || /^(canceled|cancelled):/i.test(title),
  };
};

const all = root.getAllSubcomponents("vevent").map((c) => new ICAL.Event(c));
// Moved or edited occurrences, keyed by series UID + original start.
const exceptions = new Map<string, ICAL.Event>();
for (const e of all) {
  if (e.isRecurrenceException()) exceptions.set(`${e.uid}|${e.recurrenceId.toJSDate().getTime()}`, e);
}

const meetings: Meeting[] = [];
for (const e of all) {
  if (e.isRecurrenceException()) continue;

  if (!e.isRecurring()) {
    if (overlaps(e.startDate.toJSDate(), e.endDate.toJSDate())) {
      meetings.push(toMeeting(e, e.startDate, e.endDate, false));
    }
    continue;
  }

  const duration = e.endDate.toJSDate().getTime() - e.startDate.toJSDate().getTime();
  const it = e.iterator(); // applies RRULE and EXDATE
  for (let next = it.next(); next; next = it.next()) {
    const originalStart = next.toJSDate().getTime();
    if (originalStart >= to + 7 * 24 * 3600 * 1000) break; // a moved occurrence can land up to a week away

    const moved = exceptions.get(`${e.uid}|${originalStart}`);
    const ev = moved ?? e;
    const start = moved ? moved.startDate : next;
    const end = moved ? moved.endDate : ICAL.Time.fromJSDate(new Date(originalStart + duration), true);
    if (overlaps(start.toJSDate(), end.toJSDate())) meetings.push(toMeeting(ev, start, end, true));
  }
}

meetings.sort((a, b) => a.start.localeCompare(b.start));
console.log(JSON.stringify({ day, meetings }, null, 2));
