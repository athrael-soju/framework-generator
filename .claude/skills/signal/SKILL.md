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

Save to `output/sparc/{date}/signal-log.md`.

See [template.md](template.md) for format.

## Quality Criteria

- [ ] All signal types searched
- [ ] Each signal has source and date
- [ ] Tier assignments have rationale
- [ ] Hot prospects identified

## Completion

Present: tier counts, hot prospects, gaps. Approve → Profile.
