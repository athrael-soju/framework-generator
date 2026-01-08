---
name: profile
description: Execute SPARC Profile stage to build comprehensive company profiles. Use after Signal stage to deeply research prioritized prospects before competitive analysis.
---

# Profile

Build structured company profiles from public data for prioritized prospects.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage (`ideal_client.characteristics`) |
| signal_log | Signal stage (hot/warm prospects) |
| priority_tier | Which tier to profile (default: hot) |

## Process

**1. Firmographics** — Name, HQ, employees, funding, investors
**2. Technical** — GitHub presence, docs quality, stack
**3. Ecosystem** — Community, SDKs, integrations
**4. People** — Decision-makers, titles, backgrounds
**5. Activity** — Recent signals, news, hiring

## Output

Save to `output/sparc/{date}/{company}-profile.md`.

See [template.md](template.md) for format.

## Quality Criteria

- [ ] All categories populated or marked gaps
- [ ] Decision-makers identified
- [ ] Recent activity captured
- [ ] Sources documented

## Completion

Present: profiles completed, key findings, gaps. Approve → Analyze.
