---
name: rank
description: Execute SPARC Rank stage to score and prioritize prospects. Use after Analyze stage to apply qualification criteria and determine which prospects warrant outreach.
---

# Rank

Score prospects against qualification criteria. Prioritize for outreach.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage (`ideal_client`, `constraints`) |
| prospect_analyses | Analyze stage |

## Scoring Criteria

| Criterion | Weight | 1 (Poor) | 5 (Strong) |
|-----------|--------|----------|------------|
| Budget | 25% | Pre-seed, <20 emp | Series B+, >200 emp |
| Problem Fit | 25% | Tangential | Direct match |
| Timing | 20% | No urgency | Active signals |
| Access | 15% | No path | Warm intro |
| Strategic Value | 15% | One-off | Ongoing + referrals |

## Thresholds

| Score | Action |
|-------|--------|
| 4.0+ | **Prioritize** — immediate outreach |
| 3.0-3.9 | **Qualified** — standard outreach |
| 2.0-2.9 | **Nurture** — monitor, content engage |
| <2.0 | **Pass** |

## Output Format

```markdown
# Qualification | YYYY-MM-DD

## Summary
| Rank | Prospect | Score | Action | Key Factor |
|------|----------|-------|--------|------------|
| 1 | Name | 4.2 | Prioritize | Factor |

## Scoring Detail
### [Prospect]
| Criterion | Score | Evidence |
|-----------|-------|----------|
| Budget | 4 | Series B, 200 emp |
| ... | | |
**Total: X.XX** → Action
```

## Quality Criteria

- [ ] All criteria scored with rationale
- [ ] Weights applied correctly
- [ ] Thresholds applied consistently
- [ ] Priority order justified

## Completion

Present: distribution, top prospects, borderline cases. Approve → Craft.
