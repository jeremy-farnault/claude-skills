# Briefing reference

## §1 Your day

Always the first segment, never empty. In this order:

1. **Overdue:** dated Tracking items before today, with how late they are.
2. **Meetings:** recurring series in one grouped line ("usual standups 09:00 to 09:30, three overlapping at 09:30"). One-off meetings named with their time. Flag clashes and the first free stretch. Skip cancelled ones.
3. **Prep links:** a meeting today that matches a Tracking person or item → say what to bring. A 1:1 with the manager → the Standing items from her section. This is the only place Standing items appear.
4. **Due today, then the next 7 days:** each cut to the action ("new hire: get her equipment choice, Monday"), not the full Tracking line.
5. **Weather:** one line for **today's ride home** (about 17:00–17:30) and one for **tomorrow's ride to work** (05:40). Skip this morning's ride: he's already on it. Mention rain, wind or cold only when it matters on a bike.

Never propose dates for undated items. Jérémy sets them himself.

Skip "Longer horizon" items unless one is dated within 7 days.

## §2 News selection

Segment order: Sweden → Aira markets → Finance → France / NZ / Japan → Work tech → Hobbies.
The bar for each segment is in the Interest Profile.

1. **Segment:** start from the feed's or label's segment; move an Item when its topic belongs elsewhere.
2. **Cluster:** the same story from several sources becomes one story with all its sources, combining their facts.
3. **Repeat check:** compare with `chapters` and `dropped` in the last 7 logs. Covered with nothing new → drop ("covered MM-DD"). Covered but it moved → keep as an Update (one sentence).
4. **Bar test:** each story must pass its segment's bar, fit the profile, and respect the feedback log (recent lessons weigh more). Test it by asking whether you could say why it matters to Jérémy. That sentence is only for the test. Don't say it in the script unless the Style notes ask for it.
5. **Guard:** more than about 6 stories in one segment → raise the bar, don't keep them all. There's no overall length cap.
6. **Full story:** for each kept RSS story:
   - Fetch the article.
   - Google News links (`news.google.com/rss/articles/…`) are redirects. Web-search the headline to find the publisher's article and log that URL instead.
   - Paywalled, blocked or failing → keep the feed summary and web-search the headline for other outlets' coverage. Combine their facts and add their URLs to `sources`.
   - Nothing more turned up → tell the story with what you have, silently.
   - Searches carry the story's headline and keywords only, never Tracking content.
   - Newsletters are already full text.
7. **Every drop gets a reason:**
   - On-topic near misses (cut by the bar, the guard or the repeat check) go into frontmatter `dropped`. The repeat check reads them.
   - Every other dropped Item goes into the log's `## Dropped` section, one line each, grouped by segment: `- [title](url) · reason`.
   - Group obvious noise in one line with a count ("12 SVT local crime and sports briefs · local, no Stockholm angle").
   - Name every newsletter section dropped, one by one.

## §3 Script style

- **Host:** a casual podcast host talking to Jérémy. Warm, contractions, light humour where it fits ("Right, Sweden. Big one this morning…"). Casual is not padding: no filler, no hype.
- **English**, whatever the source language. Swedish names useful at work stay (Riksbanken, Skatteverket).
- **Opening (about 15 s):** the date, then a rundown with the estimated length (150 words a minute), story counts per segment, and which segments are empty.
- **Segments:** a spoken signpost each ("Next: Sweden."). An empty segment gets one line.
- **Story:** headline sentence → 2–4 sentences on what happened. An Update is one sentence.
- **Closing:** "That's it." plus anything from "Your day" that needs an action today. Then sign off.
- **For the ear:** short sentences, plain prose. No markdown, lists, tables, emoji or URLs. Spoken numbers ("about 2 percent", "Monday", "half past nine").
- **No sourcing talk:** never mention thin detail, paywalls, blocked or failed fetches, or anything you couldn't access. Just tell what you have.
- Respect the profile's Style notes. They override this section.

## §4 Episode log template

`Log/YYYY-MM-DD.md`:

```markdown
---
type: log
project: monorepo
app: daily-podcast
status: done
created: YYYY-MM-DD
kind: episode
generatedAt: <ISO, Stockholm offset>   # next run's "since"
window: { from: <ISO>, to: <ISO> }
estimatedMinutes: 11
errors: []
chapters:
  - segment: sweden            # your-day | sweden | aira | finance | world | tech | hobbies
    title: "..."
    sources: [https://...]
    update: false
    people: false              # true when it names people from Tracking
    feedback: null             # 👍 | 👎, set in feedback mode
    saved: null                # "[[Saved note]]", set in feedback mode
dropped:
  - { segment: finance, title: "...", url: "...", reason: "covered MM-DD, nothing new", wronglyDropped: false }
droppedCounts: { sweden: 0, aira: 0, finance: 0, world: 0, tech: 0, hobbies: 0 }
---

# Episode YYYY-MM-DD

Previous: [[YYYY-MM-DD]] · [[Tracking]] · [[Interest Profile]]

## Your day
<script as spoken>

## Sweden
<script as spoken>

Sources: [title](url) · [title](url)

…one section per segment, empty ones included as one line…

## Dropped

### Sweden
- [title](url) · reason

…one subsection per segment…
```

## §5 Saved story note

`Log/YYYY-MM-DD - <Title>.md`, written in feedback mode when Jérémy flags a story (kept or dropped) to dig into later.

1. Fetch every source. Blocked or paywalled → web-search the headline for other coverage (headline and keywords only).
2. Write a **full** summary for reading, not listening: every key number quoted exactly, the method and caveats, the authors' conclusions. Sections and tables are fine here.
3. End with a `## To dig` checklist of open questions it raises for him.
4. Nothing from memory: every fact comes from a source listed in the frontmatter.

```markdown
---
type: log
project: monorepo
app: daily-podcast
status: planned           # → done once dug into (set done: <date>)
created: YYYY-MM-DD       # episode date
kind: story
segment: tech
episode: YYYY-MM-DD
tags: [podcast, saved]
sources: [https://...]
---

# <Title>

From [[YYYY-MM-DD]]. <one line on why he flagged it, in his words>

## <Source or theme>
…

## To dig
- [ ] …
```
