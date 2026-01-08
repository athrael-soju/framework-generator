---
name: signal
description: Execute SPARC Signal stage to detect and score prospect signals. Use when starting client acquisition to identify companies showing buying indicators like funding, hiring, or strategic shifts.
---

# Signal

Detect companies exhibiting buying signals. Score by strength to prioritize profiling.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage (`ideal_client.signals`) |
| target_criteria | Industry, size, geography filters |
| signal_types | Funding, hiring, product, news |
| lookback_days | Default: 30 |

### Input Format

**From Identity profile (`output/identity/profile.md`):**

```yaml
# Required sections from Identity
ideal_client:
  characteristics:
    - [Company attributes]
  signals:
    - [Buying indicators]
  red_flags:
    - [Warning signs]
```

**User-provided criteria:**

```yaml
target_criteria:
  industries: [Developer tools, API platforms]
  company_size: [50-500 employees]
  geography: [US, Europe]

signal_types: [funding, hiring, product, news]
lookback_days: 30
```

## Process

**1. Detect** — Search for signals by type:
- Funding: Series A+, growth rounds
- Hiring: DevRel, AI/ML, Platform roles
- Product: API launches, platform releases
- News: Partnerships, expansions

**2. Score** — Tier by signal strength:
| Tier | Criteria |
|------|----------|
| Hot | Multiple strong signals, recent (14 days) |
| Warm | Single strong OR multiple moderate |
| Watch | Weak signals, early indicators |

**3. Output** — Compact signal log

## Output

Save to `output/sparc/{date}/` where `{date}` is today (YYYY-MM-DD).

| File | Content |
|------|---------|
| `run.md` | Initialize run log |
| `signal-log.md` | Signal log |

### Run Log (run.md) - Initialize

```markdown
# SPARC Run: {Prospect Name}

Started: {date}
Status: in_progress

---

## Signal - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `signal-log.md`
```

### Signal Log (signal-log.md)

```markdown
# Signal Log

Date: YYYY-MM-DD

---

## Signals

| Company | Signal Type | Source | Strength | Notes |
|---------|-------------|--------|----------|-------|
| [Name] | funding / hiring / announcement / social / technical | [Source + URL] | hot / warm / watch | [Brief context] |

---

## Signal Details

### [Company Name]

**Date Detected:** YYYY-MM-DD
**Signal Type:** funding / hiring / announcement / social / technical
**Source:** [Source Name]
**URL:** [Link]
**Strength:** hot / warm / watch

**Notes:**
[Brief context about why this signal matters]
```

## Quality Criteria

- [ ] All signal types searched
- [ ] Each signal has source and date
- [ ] Tier assignments have rationale
- [ ] Hot prospects identified

## Completion

Present: tier counts, hot prospects, gaps. Approve → Profile.
