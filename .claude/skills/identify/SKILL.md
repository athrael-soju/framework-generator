---
name: identify
description: Execute IDEAS Identify stage to define research opportunities. Use at project start to review contracts, identify gaps, map opportunities, and prioritize the research agenda.
---

# Identify Stage

Define research opportunities from client engagement scope.

## Objective

Transform a signed client engagement into a prioritized research agenda. Identify gaps between client's current and desired state, then map those gaps to tractable research opportunities.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| identity_profile | Identity stage | Your `expertise.primary` for filtering to strengths |
| signed_agreement | SPARC Craft | Client contract |
| prospect_analysis | SPARC Analyze | Analysis from acquisition |
| outreach_brief | SPARC Craft | Hypothesis seeds and engagement context |

## Process

### 1. Contract Review

Extract key constraints and requirements:

**Scope Definition**
- What is explicitly in scope
- What is explicitly excluded
- Deliverable formats and deadlines

**Stakeholders**
- Key contacts and their roles
- Approval chain
- Communication preferences

**Terms**
- IP ownership
- Publication rights
- Confidentiality constraints
- Review periods


### 2. Gap Analysis

Identify gaps between current and desired state:

**Current State Assessment**
- What does client have now?
- What are they doing today?
- Where are the pain points?
- Source: prospect_analysis, contract scope

**Desired State Definition**
- What does client want to achieve?
- What does success look like?
- What are the stated objectives?
- Source: contract scope, stakeholder input

**Gap Identification**
| Gap | Current | Desired | Severity |
|-----|---------|---------|----------|
| [Gap name] | [Current state] | [Desired state] | Critical/Major/Minor |

**Severity Criteria:**
- Critical: Blocks primary business objectives
- Major: Significant impact on outcomes
- Minor: Improvement opportunity, not blocking


### 3. Opportunity Mapping

Map gaps to research opportunities:

For each gap:
- Can this be addressed through research?
- Does it match your expertise?
- Is it tractable within constraints?

**Opportunity Structure:**
```
## Opportunity: [Name]

Gap Reference: [Which gap this addresses]
Research Direction: [What to investigate]
Initial Hypothesis: [Preliminary idea to test]
Expertise Alignment: [How this matches your skills]
Feasibility Flag: Proceed / Caution / Blocked
Resource Requirements: [Time, data, access needed]
```

### 4. Prioritization

Rank opportunities for execution:

**Scoring Factors:**
| Factor | Weight | Description |
|--------|--------|-------------|
| Client Value | 40% | Impact on client objectives |
| Feasibility | 30% | Likelihood of completion |
| Timeline Fit | 20% | Fits engagement window |
| Strategic Value | 10% | Future relationship potential |

**Selection Decision:**
- Select top opportunities for this engagement
- Document deferred opportunities with reasoning
- Note dependencies between opportunities

### 5. Research Agenda Output

```
## Research Agenda

### Engagement Overview
- Client: [Name]
- Timeline: [Start - End]
- Key Stakeholders: [Names and roles]

### Selected Opportunities
1. [Opportunity 1] - Priority: High
   - Hypothesis seed: [Initial direction]
   - Timeline allocation: [Portion of engagement]

2. [Opportunity 2] - Priority: Medium
   ...

### Deferred Opportunities
- [Opportunity X]: [Reason for deferral]

### Constraints and Dependencies
- [Key constraints from contract]
- [Dependencies between opportunities]

### Success Criteria
- [How we'll know if we succeeded]
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| contract_summary | document | Extracted scope, stakeholders, terms |
| research_agenda | document | Prioritized opportunities for execution, including gap_analysis and opportunity_map |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Scope interpretation | Clarification | Confirm understanding of ambiguous contract terms |
| Gap prioritization | Decision | Which gaps to address first |
| Opportunity selection | Multi-select | Which opportunities to include in agenda |
| Resource constraints | Decision | Full scope, reduced scope, phased approach |
| Stage completion | Approval | Approve → Develop, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] Contract constraints clearly extracted
- [ ] Gaps have severity ratings
- [ ] Opportunities aligned to expertise
- [ ] Prioritization rationale documented
- [ ] Deferred items captured for future

## Completion

When finished, present for approval:
- Number of opportunities identified
- Selected vs deferred count
- Key constraints affecting scope
- Recommendation: proceed to Develop or refine agenda

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/1_identify_YYYY-MM-DD/`
2. Save contract summary to `artifacts/1_identify_YYYY-MM-DD/contract_summary.yaml`
3. Save research agenda to `artifacts/1_identify_YYYY-MM-DD/research_agenda.yaml`
4. Log decision to `decisions.md` with rationale
5. Update `run.yaml` with `current_stage: identify`

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
