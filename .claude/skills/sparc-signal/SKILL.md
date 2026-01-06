---
name: sparc-signal
description: Detect companies exhibiting buying signals for research consulting. Use when monitoring for prospects, scanning for funding announcements, hiring signals, or identifying potential clients.
---

# SPARC Signal Stage

Detect and score companies exhibiting buying signals.

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
| Source Monitoring | Source config, keywords | Raw signal stream |
| Signal Scoring | Raw signals, strength criteria | Scored Signal Log |

## Signal Sources

| Source | Signal Type |
|--------|-------------|
| Crunchbase / PitchBook | Funding rounds (Series B+) |
| LinkedIn | Leadership posts, hiring activity |
| Job Boards | DevRel, AI/ML, technical writer roles |
| News / Alerts | Product launches, partnerships, pivots |
| GitHub / HuggingFace | Technical activity, open-source investment |

## Signal Strength Tiers

| Tier | Criteria | Action |
|------|----------|--------|
| Hot | Funding + AI hiring + public gap acknowledgment | Immediate Profile |
| Warm | Funding OR AI hiring + relevant vertical | Profile within 1 week |
| Watch | Single weak signal | Add to monitoring list |

## Skills to Execute

1. **web_search** - Search for company signals using keywords
2. **company_lookup** - Retrieve firmographic data
3. **job_search** - Find relevant job postings
4. **news_search** - Find recent announcements
5. **signal_scoring** - Score signals by strength

## Output Format

```yaml
date: YYYY-MM-DD
company: Company Name
signal_type: funding | hiring | announcement | social | technical
source: Source Name
url: https://...
strength: hot | warm | watch
notes: Brief context
```

## Quality Criteria

- [ ] Sources monitored on defined schedule
- [ ] Signals scored consistently against criteria
- [ ] Hot signals actioned within 48 hours
