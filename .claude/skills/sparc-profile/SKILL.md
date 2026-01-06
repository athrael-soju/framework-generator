---
name: sparc-profile
description: Build structured company profiles from public data. Use when researching a prospect company, gathering firmographics, analyzing technical footprint, or identifying key decision-makers.
---

# SPARC Profile Stage

Build structured company profiles from public data.

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
| Data Collection | Company identifiers, source list | Raw data by category |
| Profile Synthesis | Raw data, template | Company Profile |

## Data Categories

| Category | Fields |
|----------|--------|
| Firmographics | Name, HQ, employees, funding history |
| Market Position | Vertical, competitors, differentiation |
| Technical Footprint | Stack, open-source presence, docs quality |
| Key People | Decision-makers, backgrounds |
| Recent Activity | Last 90 days: announcements, hires, launches |

## Skills to Execute

1. **web_search** - Search for company information
2. **web_fetch** - Fetch and parse company pages
3. **company_lookup** - Retrieve firmographic data
4. **github_profile** - Analyze GitHub org presence
5. **profile_synthesis** - Synthesize into structured profile

## Output Format

```yaml
company:
  legal_name:
  hq:
  founded:
  employees:
  funding_history:
    - round:
      amount:
      date:

market:
  vertical:
  competitors: []
  differentiation:

people:
  - name:
    title:
    notes:

technical:
  github:
  docs_quality:
  community:

recent_activity: []
```

## Quality Criteria

- [ ] All data categories populated or marked unavailable
- [ ] Key decision-makers identified
- [ ] Recent activity captured (last 90 days)
