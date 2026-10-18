# Briefing reference

## §1 Your day

Always the first segment, never empty. In this order:

1. **Overdue:** dated Tracking items before today, with how late they are.
2. **Meetings:** recurring series in one grouped line ("usual standups 09:00 to 09:30, three overlapping at 09:30"). One-off meetings named with their time. Flag clashes and the first free stretch. Skip cancelled ones.
3. **Prep links:** a meeting today that matches a Tracking person or item → say what to bring. A 1:1 with the manager → the Standing items from her section. This is the only place Standing items appear.
4. **Due today, then the next 7 days:** each cut to the action ("new hire: get her equipment choice, Monday"), not the full Tracking line.
5. **Needs a date:** at most 3, oldest first. Pick an undated "Watch points" item that hasn't been updated in more than 7 days, or that depends on something dated ("before the new hire starts"). Propose a specific day and say it's a proposal.
6. **Weather:** one line for the 05:40 ride and one for about 17:00–17:30. Mention rain, wind or cold only when it matters on a bike.

Skip "Longer horizon" items unless one is dated within 7 days.

## §2 News selection

Segment order: Sweden → Aira markets → Finance → France / NZ / Japan → Work tech → Hobbies.
The bar for each segment is in the Interest Profile.

1. **Segment:** start from the feed's or label's segment; move an Item when its topic belongs elsewhere.
2. **Cluster:** the same story from several sources becomes one story with all its sources, combining their facts.
3. **Repeat check:** compare with `chapters` and `dropped` in the last 7 logs. Covered with nothing new → drop ("covered MM-DD"). Covered but it moved → keep as an Update (one sentence).
4. **Bar test:** each story must pass its segment's bar, fit the profile, and respect the feedback log (recent lessons weigh more). If you can't write one sentence on why it matters to Jérémy, drop it.
5. **Guard:** more than about 6 stories in one segment → raise the bar, don't keep them all. There's no overall length cap.
6. **Full article:** fetch the page for each kept RSS story. Paywalled or failing → use the summary and say detail is thin. Newsletters are already full text.
7. **Near misses:** on-topic stories cut by the bar, the guard or the repeat check go into `dropped` with a reason. Everything else is only counted per segment.

## §3 Script style

- **Host:** a casual podcast host talking to Jérémy. Warm, contractions, light humour where it fits ("Right, Sweden. Big one this morning…"). Casual is not padding: no filler, no hype.
- **English**, whatever the source language. Swedish names useful at work stay (Riksbanken, Skatteverket).
- **Opening (about 15 s):** the date, then a rundown with the estimated length (150 words a minute), story counts per segment, and which segments are empty.
- **Segments:** a spoken signpost each ("Next: Sweden."). An empty segment gets one line.
- **Story:** headline sentence → 2–4 sentences on what happened → one sentence on why it matters to him. An Update is one sentence.
- **Closing:** "That's it. After the ride:", then the proposed dates again, so feedback mode has something to answer.
- **For the ear:** short sentences, plain prose. No markdown, lists, tables, emoji or URLs. Spoken numbers ("about 2 percent", "Monday", "half past nine"). If a source is thin, say so.
- Respect the profile's Style notes. They override this section.

## §4 Episode log template

`Episodes/YYYY-MM-DD.md`:

```markdown
---
date: YYYY-MM-DD
type: episode
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
proposedDates:
  - { item: "...", date: YYYY-MM-DD, status: proposed }   # → confirmed | changed
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
```
