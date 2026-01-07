---
name: develop
description: Execute IDEAS Develop stage to formalize research hypotheses. Use after Identify to review prior work, refine hypotheses, assess feasibility, and define precise research scope.
---

# Develop Stage

Formalize research hypotheses and define execution scope.

## Objective

Transform prioritized opportunities into formal, testable hypotheses. Review prior work, assess feasibility, and define precise scope for each hypothesis.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| research_agenda | Identify stage | Prioritized opportunities |
| opportunity_details | Identify stage | Initial hypothesis seeds |
| constraints | Identify stage | Timeline, resources, access |

## Process

### 1. Prior Work Review

For each selected opportunity:

**Literature Search**
- Academic: Google Scholar, arXiv, ACM DL
- Industry: Company blogs, technical reports, conference talks

**Extract:**
| Element | What to Capture |
|---------|-----------------|
| Known Findings | Established facts in this area |
| Open Questions | Unresolved questions from prior work |
| Methodologies | Approaches used by others |
| Gaps | What hasn't been studied |

**Prior Work Summary:**
```
## Prior Work: [Opportunity Name]

### Seminal Work
- [Paper/Report]: [Key contribution]

### Recent Work (Last 2 Years)
- [Paper/Report]: [Key contribution]

### Established Findings
- [Finding 1]
- [Finding 2]

### Open Questions
- [Question 1]
- [Question 2]

### Methodological Approaches
- [Approach]: [When to use]

### Gap Our Work Addresses
- [How our research extends existing knowledge]
```

### 2. Hypothesis Refinement

Transform initial seeds into formal hypotheses:

**Hypothesis Structure:**
```
IF [intervention/condition]
THEN [expected outcome]
BECAUSE [mechanism/rationale]
MEASURABLE BY [metric/evidence]
```

**Example:**
```
IF we restructure the API documentation around use cases rather than endpoints
THEN developer time-to-first-success will decrease by 30%
BECAUSE developers think in terms of tasks, not API structure
MEASURABLE BY tracking onboarding completion rates before/after
```

**Required Elements:**
| Element | Description |
|---------|-------------|
| Assumptions | What must be true for hypothesis to hold |
| Required Evidence | What data types needed to test |
| Falsification Criteria | What would disprove this |

### 3. Feasibility Assessment

Score each hypothesis:

| Criterion | Weight | Questions |
|-----------|--------|-----------|
| Data Availability | 25% | Can we access needed data? |
| Resource Requirements | 25% | Time, compute, tools available? |
| Timeline Fit | 20% | Completable within engagement? |
| Skill Match | 15% | Requires expertise we have? |
| Client Dependency | 15% | How much depends on client responsiveness? |

**Scoring (1-5):** Apply to each criterion

**Thresholds:**
| Score | Recommendation |
|-------|----------------|
| 4.0+ | Proceed |
| 3.0-3.9 | Proceed with modifications |
| 2.0-2.9 | Defer or restructure |
| <2.0 | Abandon |

**Risk Identification:**
- Data risks: Access, quality, availability
- Technical risks: Complexity, tooling gaps
- Timeline risks: Delays, dependencies
- External risks: Client, third-party dependencies

### 4. Scope Definition

For each approved hypothesis:

```
## Scope: [Hypothesis Name]

### Included
- [Specific item in scope]
- [Specific item in scope]

### Excluded (with rationale)
- [Item]: [Why excluded]
- [Item]: [Why excluded]

### Data Sources
| Source | Access Method | Status |
|--------|---------------|--------|
| [Source] | [How to access] | Confirmed/Pending |

### Methodology
- [Method 1]: [How applied]
- [Method 2]: [How applied]

### Milestones
| Date | Checkpoint | Deliverable |
|------|------------|-------------|
| [Date] | [What] | [Output] |
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| prior_work_review | document | Literature summary per opportunity |
| hypothesis_documents | document | Formal hypotheses with structure |
| feasibility_scores | document | Scoring and risk assessment |
| scope_definitions | document | Precise scope per hypothesis |

## Decision Points

| Point | Type | Options |
|-------|------|---------|
| Hypothesis framing | Clarification | Refine IF/THEN/BECAUSE structure |
| Feasibility concerns | Decision | Proceed, adjust scope, return to Identify |
| Data source access | Decision | Use available sources, seek alternatives, descope |
| Methodology selection | Decision | Quantitative, qualitative, mixed methods |
| Stage completion | Approval | Approve → Evaluate, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] Prior work surveyed for each opportunity
- [ ] Hypotheses are specific and testable
- [ ] Assumptions explicitly stated
- [ ] Feasibility scored with rationale
- [ ] Scope boundaries unambiguous

## Completion

When finished, present for approval:
- Number of hypotheses formalized
- Feasibility summary (proceed/modify/defer)
- Key risks identified
- Recommendation: proceed to Evaluate or refine hypotheses
