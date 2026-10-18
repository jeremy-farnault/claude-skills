// Usage: tsx feeds.ts <path-to-Sources.md> <since-ISO-datetime>
// Fetches every feed in the "RSS feeds" table of Sources.md, keeps items published after
// `since`, and prints them as JSON Items: { segment, source, title, text, url, publishedAt }.
import { readFileSync } from "node:fs";
import Parser from "rss-parser";

const [sourcesPath, sinceArg] = process.argv.slice(2);
if (!sourcesPath || !sinceArg) {
  console.error("Usage: tsx feeds.ts <path-to-Sources.md> <since-ISO-datetime>");
  process.exit(1);
}
const since = new Date(sinceArg);
if (Number.isNaN(since.getTime())) {
  console.error(`Invalid since date: ${sinceArg}`);
  process.exit(1);
}

type Feed = { segment: string; source: string; url: string };
type Item = { segment: string; source: string; title: string; text: string; url: string; publishedAt: string };

/** Rows of the table under "## RSS feeds": | Segment | Feed | URL | */
const readFeeds = (markdown: string): Feed[] => {
  const section = markdown.split(/^## RSS feeds\s*$/m)[1]?.split(/^#{2,3} /m)[0] ?? "";
  return section
    .split("\n")
    .map((line) => line.split("|").map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 5 && /^https?:\/\//.test(cells[3]))
    .map(([, segment, source, url]) => ({ segment, source, url }));
};

const TEXT_LIMIT = 300;
const parser = new Parser({ timeout: 15000, headers: { "User-Agent": "Mozilla/5.0 (briefing)" } });

const feeds = readFeeds(readFileSync(sourcesPath, "utf8"));
const results = await Promise.allSettled(feeds.map((f) => parser.parseURL(f.url)));

const seen = new Set<string>();
const items: Item[] = [];
const errors: { source: string; error: string }[] = [];
for (const [i, result] of results.entries()) {
  const feed = feeds[i];
  if (result.status === "rejected") {
    errors.push({ source: feed.source, error: String(result.reason?.message ?? result.reason) });
    continue;
  }
  for (const entry of result.value.items) {
    const published = entry.isoDate ? new Date(entry.isoDate) : null;
    if (!published || published <= since || !entry.link || seen.has(entry.link)) continue;
    seen.add(entry.link);
    const text = (entry.contentSnippet ?? entry.content ?? "").replace(/\s+/g, " ").trim();
    items.push({
      segment: feed.segment,
      source: feed.source,
      title: (entry.title ?? "").trim(),
      text: text.length > TEXT_LIMIT ? `${text.slice(0, TEXT_LIMIT)}…` : text,
      url: entry.link,
      publishedAt: published.toISOString(),
    });
  }
}

console.log(JSON.stringify({ since: since.toISOString(), feeds: feeds.length, items, errors }, null, 2));

// Lingering keep-alive sockets would otherwise hold the process open.
process.exit(0);
