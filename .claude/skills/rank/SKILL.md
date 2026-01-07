---
name: rank
description: Execute SPARC Rank stage to score and prioritize prospects. Use after Analyze stage to apply qualification criteria and determine which prospects warrant outreach.
---

# Rank Stage

Score prospects against qualification criteria and prioritize for outreach.

## Objective

Apply systematic qualification scoring to analyzed prospects. Determine priority order and recommended action for each.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| identity_profile | Identity stage | Your `ideal_client` and `constraints` for scoring weights |
| prospect_analyses | Analyze stage | Analysis reports to score |
| scoring_criteria | Configuration | Weighted qualification criteria |
| thresholds | Configuration | Score-to-action thresholds |

## Process

### 1. Qualification Scoring

Apply scoring criteria to each prospect:

| Criterion | Weight | Scoring Rubric |
|-----------|--------|----------------|
| **Budget Indicators** | 25% | Funding stage, employee count, stated budgets |
| **Problem Fit** | 25% | Alignment with your positioning |
| **Timing** | 20% | Urgency signals, active buying behavior |
| **Access** | 15% | Path to decision-maker, warm intros |
| **Strategic Value** | 15% | Ongoing potential, referral value, logo value |

**Scoring Scale (1-5):**
- 5: Excellent fit, strong evidence
- 4: Good fit, some evidence
- 3: Moderate fit, limited evidence
- 2: Weak fit, concerns present
- 1: Poor fit, significant blockers

**Detailed Scoring Rubric:**

| Criterion | 1 (Poor) | 3 (Moderate) | 5 (Strong) |
|-----------|----------|--------------|------------|
| Budget Indicators | Pre-seed, <20 emp | Series A, 50-200 emp | Series B+, >200 emp |
| Problem Fit | Tangential | Adjacent | Direct match |
| Timing | No urgency | General interest | Active signals |
| Access | No path | Mutual connections | Direct/warm intro |
| Strategic Value | One-off | Ongoing potential | Ongoing + referrals |

### 2. Score Calculation

For each prospect:

```python
# Example scoring
scores = {
    "budget_indicators": 4,  # Series B, 200 employees
    "problem_fit": 5,        # Clear doc gaps matching our service
    "timing": 3,             # Hiring but no urgency signal
    "access": 4,             # LinkedIn connection to VP Eng
    "strategic_value": 4     # Strong logo, good referral potential
}

weighted_total = (
    scores["budget_indicators"] * 0.25 +
    scores["problem_fit"] * 0.25 +
    scores["timing"] * 0.20 +
    scores["access"] * 0.15 +
    scores["strategic_value"] * 0.15
)
# = 4.05
```

### 3. Action Assignment

Based on weighted total:

| Score | Recommendation | Action |
|-------|----------------|--------|
| 4.0+ | **Prioritize** | Immediate personalized outreach |
| 3.0-3.9 | **Qualified** | Standard outreach sequence |
| 2.0-2.9 | **Nurture** | Add to nurture campaign |
| <2.0 | **Pass** | Do not pursue |

### 4. Priority Ranking

Order qualified prospects by:
1. Weighted score (primary)
2. Timing score (tiebreaker)
3. Strategic value (secondary tiebreaker)

### 5. Output Generation

Produce qualification report:

```
## Qualification Summary

| Prospect | Score | Recommendation | Key Factor |
|----------|-------|----------------|------------|
| Acme Corp | 4.2 | Prioritize | Strong problem fit |
| Beta Inc | 3.6 | Qualified | Good access |
| Gamma Ltd | 2.4 | Nurture | Timing not right |

## Prioritize Tier (4.0+)
[Detailed breakdown for each]

## Qualified Tier (3.0-3.9)
[Summary for each]

## Nurture Tier (2.0-2.9)
[Brief notes on re-engagement triggers]

## Passed
[Reasons for exclusion]
```

### 6. Nurture and Pass Processing

**Pass Actions (Score <2.0):**
- Document reason for exclusion
- Capture learnings (refine ICP, positioning)
- No further outreach unless they re-signal

**Nurture Actions (Score 2.0-2.9):**
- Add to watch list for re-engagement triggers
- Continue content engagement (not direct outreach)
- Set quarterly check-in review date

**Re-engagement Triggers:**
When a nurture trigger fires:
1. Create new Signal entry with "Nurture re-engagement" source
2. Re-run Profile (update stale data)
3. Re-score through Rank
4. If score improves to 3.0+, proceed to Craft

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| qualification_score | document | Detailed scoring per prospect, including priority ranking and action assignments |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Threshold boundary (score near cutoff) | Decision | Nurture, Qualify anyway, Pass |
| Criterion weighting adjustment | Clarification | Override default weights for this prospect |
| Pipeline capacity | Decision | Proceed, defer to next cycle, fast-track |
| Scoring disagreement | Clarification | Re-evaluate criterion, accept with note |
| Stage completion | Approval | Approve → Craft, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] All criteria scored with rationale
- [ ] Weights applied correctly
- [ ] Thresholds applied consistently
- [ ] Priority order justified
- [ ] Pass decisions documented

## Completion

When finished, present for approval:
- Distribution across tiers
- Top prospects for Craft stage
- Any borderline cases for discussion
- Recommendation: proceed to Craft or adjust rankings

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/4_rank_YYYY-MM-DD/`
2. Save qualification score to `artifacts/4_rank_YYYY-MM-DD/qualification_score.md`
3. Log decision to `decisions.md` with rationale
4. Update `run.yaml` with `current_stage: rank`
5. For nurture/pass outcomes, copy record to `nurture/` or `passed/`

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
