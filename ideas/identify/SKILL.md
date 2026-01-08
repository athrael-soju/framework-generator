---
name: identify
description: Execute IDEAS Identify stage to define research opportunities. Use at project start to review contracts, identify gaps, map opportunities, and prioritize the research agenda.
---

# Identify

Surface research opportunities from client context. Prioritize agenda.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage |
| contract | Signed agreement (scope, deliverables) |
| prospect_analysis | SPARC Analyze stage |
| outreach_brief | SPARC Craft stage (hypothesis seeds) |

## Process

**1. Contract Review** — Extract scope, deliverables, constraints
**2. Gap Analysis** — Identify gaps between current and desired state
**3. Opportunity Mapping** — Match gaps to expertise
**4. Prioritization** — Rank by value within timeline

## Output Format

```markdown
# Research Agenda | [Client] | YYYY-MM-DD

## Contract Summary
- Scope: X
- Deliverables: X
- Timeline: X
- Constraints: X

## Opportunities
| Priority | Opportunity | Hypothesis | Feasibility |
|----------|-------------|------------|-------------|
| 1 | Opportunity | IF X THEN Y | High/Med/Low |

## Selected Focus
**Primary:** Opportunity 1
**Rationale:** Why this creates most value
```

## Quality Criteria

- [ ] Contract deliverables mapped
- [ ] Opportunities aligned with client priorities
- [ ] At least one actionable within timeline
- [ ] Hypotheses are testable

## Completion

Present: agenda, selected focus, rationale. Approve → Develop.
