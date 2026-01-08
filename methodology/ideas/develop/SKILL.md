---
name: develop
description: Execute IDEAS Develop stage to formalize research hypotheses. Use after Identify to review prior work, refine hypotheses, assess feasibility, and define precise research scope.
---

# Develop

Transform opportunities into testable hypotheses with clear scope.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage |
| research_agenda | Identify stage |
| constraints | Timeline, resources, access |

## Process

**1. Prior Work** — Review existing research, identify gaps
**2. Refine** — Sharpen hypotheses into testable form
**3. Feasibility** — Score against constraints
**4. Scope** — Define boundaries and deliverables

## Hypothesis Structure

```
IF [intervention/condition]
THEN [expected outcome]
BECAUSE [mechanism]
MEASURABLE BY [metric/evidence]
```

## Feasibility Criteria

| Criterion | Weight |
|-----------|--------|
| Data Availability | 25% |
| Resource Requirements | 25% |
| Timeline Fit | 20% |
| Skill Match | 15% |
| Client Dependency | 15% |

## Output Format

```markdown
# Hypothesis: [H1] | YYYY-MM-DD

## Statement
IF X THEN Y BECAUSE Z MEASURABLE BY W

## Prior Work
- Finding 1 (source)
- Gap: What's unknown

## Feasibility: X.X/5
| Criterion | Score | Notes |
|-----------|-------|-------|

## Scope
- In: X, Y
- Out: Z
- Dependencies: X
- Risks: X
```

## Quality Criteria

- [ ] Hypotheses falsifiable
- [ ] Evidence requirements specified
- [ ] Data sources identified
- [ ] Timeline realistic
- [ ] Assumptions stated

## Completion

Present: hypotheses, feasibility scores, scope. Approve → Evaluate.
