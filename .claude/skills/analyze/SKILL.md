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

### Input Format

**From Identity profile (`output/identity/profile.md`):**

```yaml
positioning:
  who_you_help: [Audience]
  with_what_problem: [Problem]
  differentiation: [Why you]

expertise:
  primary_skills: [Skills]
  methods: [Approaches]
```

**From Profile stage (`output/sparc/{date}/{company}-profile.md`):**

```markdown
## Company Overview
**Employees:** [Number]
**Vertical:** [Industry]

## Market Position
**Differentiation:** [How they position]
### Competitors
- [Competitor list]

## Key People
| Name | Title | Notes |
```

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

### Prospect Analysis ({company}-analysis.md)

```markdown
# Prospect Analysis: [Company Name]

Date: YYYY-MM-DD
Analyst: [Name]

---

## Executive Summary

- [Position in market]
- [Key gaps identified]
- [Primary opportunity]

---

## Competitive Position

### Leads In
- [Area where prospect excels]

### Lags In
- [Area where prospect trails]

### Market Perception
[How the market views this company]

---

## Gap Analysis

| Gap | Severity | Your Capability | Opportunity |
|-----|----------|-----------------|-------------|
| [Gap description] | critical / major / minor | [How you address this] | primary / secondary / none |

---

## Entry Point

**Buyer Persona:** [Who would buy]
**Budget Indicators:** [Signs of available budget]
**Timing Assessment:** [Why now is the right time]
**Access Path:** [How to reach the buyer]

---

## Recommended Approach

**Value Proposition:**
[What you offer and why it matters to them]

### Supporting Evidence
- [Evidence point 1]
- [Evidence point 2]

### Potential Objections
- [Likely objection 1]
- [Likely objection 2]
```

### Competitor Matrix

```markdown
# Competitor Matrix: [Prospect Name]

Date: YYYY-MM-DD

---

## Competitors

| Name | Type |
|------|------|
| [Competitor] | direct / indirect / adjacent / emerging |

---

## Dimension Comparison

### [Dimension Name] (e.g., Documentation Depth)

| Entity | Score | Notes |
|--------|-------|-------|
| [Prospect] | [1-5] | [Assessment] |
| [Competitor 1] | [1-5] | [Assessment] |
| [Competitor 2] | [1-5] | [Assessment] |

**Gap:** [Prospect score - competitor average]

### [Another Dimension]

| Entity | Score | Notes |
|--------|-------|-------|
| [Prospect] | [1-5] | [Assessment] |
| [Competitor 1] | [1-5] | [Assessment] |

**Gap:** [Calculation]

---

## Summary

### Leads In
- [Area]

### Lags In
- [Area]

### Biggest Gaps
- [Gap with largest negative differential]
```

### Run Log (run.md) - Append

```markdown
---

## Analyze - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{company}-analysis.md`
```

## Quality Criteria

- [ ] Top competitors identified
- [ ] Dimensions scored with evidence
- [ ] Gaps mapped to capabilities
- [ ] Entry point recommended

## Completion

Present: competitive insights, opportunities, entry points. Approve → Rank.
