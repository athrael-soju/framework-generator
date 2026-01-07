---
name: articulate
description: Execute IDEAS Articulate stage to communicate findings. Use after Evaluate to position contribution, target audiences, develop recommendations, and create implementation roadmaps.
---

# Articulate Stage

Transform findings into actionable deliverables.

## Objective

Convert evaluation results into clear, audience-appropriate deliverables. Position contribution, develop recommendations, and create implementation roadmaps.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| evaluation_report | Evaluate stage | Findings and verdicts |
| hypothesis_documents | Develop stage | Original hypotheses |
| prior_work_review | Develop stage | Literature context |
| contract_summary | Identify stage | Stakeholders and constraints |
| service_offerings | Configuration | What you deliver and how you position it |

## Process

### 1. Contribution Positioning

Define what this work contributes:

**Contribution Types:**
| Type | Description |
|------|-------------|
| Novel Finding | New insight not previously documented |
| Quantified Confirmation | Evidence for suspected truth |
| Framework | New way to organize thinking |
| Benchmark | Comparison point for evaluation |
| Recommendation | Actionable guidance |

**Positioning Statement:**
```
## Contribution: [Title]

Type: [Novel Finding / Quantified Confirmation / Framework / Benchmark / Recommendation]

### What's New
[What this work adds to existing knowledge]

### Relation to Prior Work
[How this extends, confirms, or challenges existing work]

### Significance
[Why this matters to the audience]
```

### 2. Audience Targeting

Adapt content for each stakeholder:

**Audience Profiles:**
| Audience | Format | Depth | Focus |
|----------|--------|-------|-------|
| Executive | Summary + recommendations | High-level | Business impact |
| Technical Lead | Technical report | Deep | Implementation |
| Marketing/DevRel | Slides + talking points | Medium | Story, differentiation |
| Board/Investors | Executive brief | Minimal | Strategic value |

**Per Audience:**
```
## Audience: [Role]

### Their Needs
- [What they care about]
- [Decisions they need to make]

### Format Decision
[Document type and length]

### Depth Level
[How much detail]

### Key Messages
1. [Core insight for this audience]
2. [Primary implication]
3. [Recommended action]
```

### 3. Recommendation Development

Convert findings to actionable guidance:

**Recommendation Structure:**
```
## Recommendation: [Title]

Priority: High / Medium / Low
Effort: High / Medium / Low

### Action
[Specific action to take]

### Rationale
[Evidence from findings supporting this]

### Dependencies
[Prerequisites for implementation]

### Risk if Not Implemented
[Consequence of inaction]

### Success Metrics
[How to measure if this worked]
```

**Prioritization Criteria:**
- Impact on client objectives
- Feasibility with current resources
- Time to value
- Risk of inaction

### 4. Roadmap Creation

Organize recommendations into phases:

**Roadmap Structure:**
```
## Implementation Roadmap

### Quick Wins (Immediate)
- [Action]: [Expected outcome]
Timeline: < 2 weeks

### Phase 1: [Name]
Timeline: [Duration]
Prerequisites: [Dependencies]

Actions:
1. [Action with owner]
2. [Action with owner]

Milestone: [What marks completion]
Success Metric: [How to measure]

### Phase 2: [Name]
...

### Future Considerations
- [Items beyond current scope]
```

### 5. Deliverable Assembly

Create final deliverables per audience:

**Executive Summary:**
- 1-2 pages maximum
- Key findings (3-5 bullets)
- Recommendations (prioritized)
- Immediate next steps

**Technical Report:**
- Full methodology
- Detailed findings
- Supporting data
- Reproducibility notes

**Presentation Deck:**
- Narrative arc
- Visualizations
- Talking points per slide
- Appendix for backup

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| contribution_statement | document | Positioning and significance |
| audience_profiles | document | Targeting decisions |
| recommendations | document | Prioritized actions |
| roadmap | document | Phased implementation plan |
| client_deliverable | document | Final deliverable(s) |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Audience prioritization | Multi-select | Which stakeholders to target |
| Deliverable format | Decision | Report, presentation, workshop, documentation |
| Recommendation strength | Clarification | Confirm claim strength matches evidence |
| Novelty framing | Clarification | How to position contribution |
| Limitation disclosure | Decision | Which limitations to emphasize |
| Stage completion | Approval | Approve → Share, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] Contribution clearly positioned
- [ ] Each audience has appropriate content
- [ ] Recommendations are actionable
- [ ] Roadmap has realistic phases
- [ ] Deliverables match contract requirements

## Completion

When finished, present for approval:
- Deliverables ready for review
- Audience coverage
- Recommendation summary
- Next steps: proceed to Share or refine deliverables

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/4_articulate_YYYY-MM-DD/`
2. Save client deliverable to `artifacts/4_articulate_YYYY-MM-DD/deliverable_report.md`
3. Log decision to `decisions.md` with rationale
4. Update `run.yaml` with `current_stage: articulate`

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
