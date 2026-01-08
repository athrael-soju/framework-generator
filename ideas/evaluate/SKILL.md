---
name: evaluate
description: Execute IDEAS Evaluate stage to test hypotheses. Use after Develop to collect data, run analysis, assess evidence against hypotheses, and quality-check findings.
---

# Evaluate

Test hypotheses against evidence. Determine verdicts.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage |
| hypotheses | Develop stage |
| scope | Develop stage |

## Process

**1. Collect** — Gather data per hypothesis
**2. Analyze** — Apply methods, generate results
**3. Interpret** — Assess support for hypothesis
**4. QA** — Verify reproducibility, check biases

## Evidence Strength

| Type | Strength |
|------|----------|
| Quantitative (metrics) | High |
| Qualitative (interviews) | Medium-High |
| Secondary research | Medium |
| Expert opinion | Low-Medium |
| Anecdotal | Low |

## Verdicts

| Verdict | Meaning |
|---------|---------|
| Strongly Supported | Multiple evidence types converge |
| Supported | Evidence favors, some limitations |
| Inconclusive | Mixed evidence |
| Not Supported | Evidence contradicts |
| Refuted | Strong evidence against |

## Output Format

```markdown
# Evaluation: [H1] | YYYY-MM-DD

## Verdict: [Supported]
Confidence: High/Med/Low

## Evidence
| Source | Finding | Strength |
|--------|---------|----------|
| Source | Finding | High/Med |

## Analysis
Key finding summary

## Limitations
- Limitation 1
- Limitation 2

## Alternatives Considered
- Alternative explanation
```

## Quality Criteria

- [ ] Methods documented
- [ ] Analysis reproducible
- [ ] Alternatives considered
- [ ] Confidence appropriate
- [ ] Problem-fit assessed

## Completion

Present: verdicts, confidence, limitations. Approve → Articulate.
