---
name: sparc-rank
description: Score and rank prospects against qualification criteria. Use when prioritizing pipeline, deciding which prospects to pursue, or assessing fit against ideal client profile.
---

# SPARC Rank Stage

Score prospects against qualification criteria.

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
| Criteria Scoring | Prospect Analysis, scorecard | Score breakdown |
| Pipeline Positioning | Score, current pipeline | Priority recommendation |

## Qualification Scorecard

| Criterion | Weight | 1 (Poor) | 3 (Moderate) | 5 (Strong) |
|-----------|--------|----------|--------------|------------|
| Budget Indicators | 25% | Pre-seed, <20 emp | Series A, 50-200 emp | Series B+, >200 emp |
| Problem Fit | 25% | Tangential | Adjacent | Direct match |
| Timing | 20% | No urgency | General interest | Active signals |
| Access | 15% | No path | Mutual connections | Direct/warm intro |
| Strategic Value | 15% | One-off | Ongoing potential | Ongoing + referrals |

## Thresholds

| Score | Recommendation | Action |
|-------|----------------|--------|
| 4.0+ | Prioritize | Active outreach |
| 3.0-3.9 | Qualified | Outreach when capacity allows |
| 2.0-2.9 | Nurture | Monitor, engage with content |
| <2.0 | Pass | Do not pursue |

## Skills to Execute

1. **score_prospect** - Apply scorecard to prospect analysis

## Output Format

```yaml
company:
date:
scores:
  budget: {score: , rationale: }
  problem_fit: {score: , rationale: }
  timing: {score: , rationale: }
  access: {score: , rationale: }
  strategic_value: {score: , rationale: }
total:
recommendation: prioritize | qualified | nurture | pass
```

## Quality Criteria

- [ ] All criteria scored with rationale
- [ ] Score reflects current pipeline capacity
- [ ] Threshold action followed
