---
name: analyze
description: Execute SPARC Analyze stage to assess competitive position and identify opportunities. Use after Profile stage to compare prospects against competitors and find engagement angles.
---

# Analyze

Compare prospects against competitors. Identify gaps matching your capabilities.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage (`positioning`, `expertise`) |
| company_profiles | Profile stage |

## Process

**1. Competitors** — Identify top 3-5 direct competitors
**2. Compare** — Score across dimensions (docs, community, DX, pricing)
**3. Sentiment** — G2 reviews, Reddit, HN mentions
**4. Gaps** — Map gaps to your capabilities
**5. Entry points** — Identify buyer, budget, timing

## Output

Save to `output/sparc/{date}/` (same date as Signal).

| File | Content |
|------|---------|
| `run.md` | Append Analyze decisions |
| `{company}-analysis.md` | Prospect analysis |

See [template.md](template.md) for formats.

## Quality Criteria

- [ ] Top competitors identified
- [ ] Dimensions scored with evidence
- [ ] Gaps mapped to capabilities
- [ ] Entry point recommended

## Completion

Present: competitive insights, opportunities, entry points. Approve → Rank.
