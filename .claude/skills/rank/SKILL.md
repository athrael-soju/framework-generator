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

## Output

Save to `output/sparc/{date}/` (same date as Signal).

| File | Content |
|------|---------|
| `run.md` | Append Rank decisions |
| `qualification.md` | Ranked prospect list |

### Qualification Score (qualification.md)

```markdown
# Qualification Score: [Company Name]

Date: YYYY-MM-DD

---

## Scoring

| Criterion | Score (1-5) | Rationale |
|-----------|-------------|-----------|
| Budget | [Score] | [Why this score] |
| Problem Fit | [Score] | [Why this score] |
| Timing | [Score] | [Why this score] |
| Access | [Score] | [Why this score] |
| Strategic Value | [Score] | [Why this score] |

---

## Result

**Total Score:** [Sum or weighted average]
**Recommendation:** prioritize / qualified / nurture / pass

**Rationale:**
[Brief explanation of the recommendation]
```

### Pass Record

```markdown
# Pass Record: [Company Name]

**Passed Date:** YYYY-MM-DD
**Stage Exited:** signal / profile / analyze / rank / craft
**Reason:** Not in ICP / No budget indicators / Problem mismatch / Rejected outreach / [Other]

---

## Context

**Original Signal:** [What triggered initial interest]
**Time in Pipeline:** [Duration from signal to pass]

---

## Learnings

[Optional insight for ICP refinement, positioning adjustment, or process improvement]

---

## Re-engagement Conditions

- [ ] Would reconsider if: [Specific condition that would change assessment]
```

### Nurture Record

```markdown
# Nurture Record: [Company Name]

**Entered Nurture:** YYYY-MM-DD
**Reason:** Timing not right / Budget uncertain / Access blocked / Partial fit / [Other]
**Check-in Date:** YYYY-MM-DD (quarterly review)

---

## Context

**Original Score:** [Score from Rank stage]
**Key Blocker:** [Primary reason for nurture vs qualified]

---

## Re-engagement Triggers

- [Trigger 1: e.g., "New funding round"]
- [Trigger 2: e.g., "DevRel hiring resumes"]
- [Trigger 3: e.g., "New product launch in target area"]

---

## Engagement History

| Date | Activity | Notes |
|------|----------|-------|
| [Date] | [Content engagement, event, etc.] | [Outcome] |

---

## Next Review

**Date:** YYYY-MM-DD
**Action:** Review signals, update profile if warranted, re-score
```

### Run Log (run.md) - Append

```markdown
---

## Rank - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `qualification.md`
```

## Quality Criteria

- [ ] All criteria scored with rationale
- [ ] Weights applied correctly
- [ ] Thresholds applied consistently
- [ ] Priority order justified

## Completion

Present: distribution, top prospects, borderline cases. Approve → Craft.
