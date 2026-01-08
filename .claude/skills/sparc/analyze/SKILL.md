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

## Output Format

```markdown
# Analysis: [Company] | YYYY-MM-DD

## Position
- Leads: strength 1, strength 2
- Lags: gap 1, gap 2

## Competitors
| Dimension | Prospect | Comp1 | Comp2 |
|-----------|----------|-------|-------|
| Docs | 3 | 5 | 4 |

## Gaps → Capabilities
| Gap | Severity | Your Capability | Opportunity |
|-----|----------|-----------------|-------------|
| Gap | High/Med | Capability | Primary/Secondary |

## Entry Point
- Contact: Name (Title)
- Budget: Indicators
- Timing: Assessment
- Approach: Recommended angle
```

## Quality Criteria

- [ ] Top competitors identified
- [ ] Dimensions scored with evidence
- [ ] Gaps mapped to capabilities
- [ ] Entry point recommended

## Completion

Present: competitive insights, opportunities, entry points. Approve → Rank.
