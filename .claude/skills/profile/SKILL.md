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

### Input Format

**From Identity profile (`output/identity/profile.md`):**

```yaml
ideal_client:
  characteristics:
    - [Company attributes indicating fit]
```

**From Signal stage (`output/sparc/{date}/signal-log.md`):**

```markdown
## Signals

| Company | Signal Type | Source | Strength | Notes |
|---------|-------------|--------|----------|-------|
| [Name] | [Type] | [Source] | hot / warm / watch | [Context] |
```

**User-provided:**

```yaml
priority_tier: hot  # Which tier to profile: hot, warm, or watch
```

## Process

**1. Firmographics** — Name, HQ, employees, funding, investors
**2. Technical** — GitHub presence, docs quality, stack
**3. Ecosystem** — Community, SDKs, integrations
**4. People** — Decision-makers, titles, backgrounds
**5. Activity** — Recent signals, news, hiring

## Output

Save to `output/sparc/{date}/` (same date as Signal).

| File | Content |
|------|---------|
| `run.md` | Append Profile decisions |
| `{company}-profile.md` | Company profile |

### Company Profile ({company}-profile.md)

```markdown
# Company Profile: [Company Name]

Date: YYYY-MM-DD

---

## Company Overview

**Legal Name:**
**DBA:**
**HQ:**
**Founded:**
**Employees:**

### Funding History

| Round | Amount | Date | Valuation |
|-------|--------|------|-----------|
| [Series] | [Amount] | [Date] | [Valuation] |

---

## Market Position

**Vertical:**
**Differentiation:**

### Competitors
- [Competitor 1]
- [Competitor 2]

---

## Key People

| Name | Title | Notes |
|------|-------|-------|
| [Name] | [Title] | [Relevant background, activity] |

---

## Technical Presence

**GitHub:** [URL or assessment]
**Docs Quality:** [Assessment]
**Community:** [Assessment]

---

## Recent Activity

- [Date]: [Activity description]
```

### Run Log (run.md) - Append

```markdown
---

## Profile - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{company}-profile.md`
```

## Quality Criteria

- [ ] All categories populated or marked gaps
- [ ] Decision-makers identified
- [ ] Recent activity captured
- [ ] Sources documented

## Completion

Present: profiles completed, key findings, gaps. Approve → Analyze.
