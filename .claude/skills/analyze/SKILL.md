---
name: analyze
description: Execute SPARC Analyze stage to assess competitive position and identify opportunities. Use after Profile stage to compare prospects against competitors and find engagement angles.
---

# Analyze Stage

Analyze competitive position and identify engagement opportunities.

## Objective

Compare profiled prospects against their competitors to identify gaps where your services provide value. Generate actionable analysis reports.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| identity_profile | Identity stage | Your `positioning` and `expertise` for finding angles |
| company_profiles | Profile stage | Structured profiles to analyze |
| analysis_dimensions | Configuration | What to compare (docs, community, DX, etc.) |

## Process

### 1. Competitor Identification

For each prospect:

**Direct Competitors**
- Search "[company] competitors" and "[company] alternatives"
- Check G2, Gartner, industry reports

**Competitive Landscape**
- Categorize: Direct, indirect, adjacent, emerging
- Prioritize top 3-5 for comparison

### 2. Competitive Comparison

Build comparison matrix:

**Dimensions to Compare**
| Dimension | How to Assess |
|-----------|---------------|
| Documentation depth | Review docs site structure |
| Community size | Check Discord/Slack member counts |
| Developer experience | Evaluate onboarding, SDKs |
| Content quality | Assess blogs, tutorials |
| Pricing transparency | Check pricing page |
| Enterprise features | Review feature comparison |

**Scoring**
- Score each company 1-5 per dimension
- Calculate gaps: prospect score - competitor average

### 3. Sentiment Analysis

**Customer Perception**
- Search for G2 reviews, Reddit, HN mentions
- Read review content
- Categorize: Praise themes, complaint themes
- Extract representative quotes

### 4. Content Audit

**Developer-Facing Content**
- Documentation: Depth, structure, freshness
- Blog: Technical content, frequency
- Tutorials: Quality, coverage

### 5. Opportunity Synthesis

Map findings to your capabilities:

```
## Executive Summary
[3 bullets: position, key gaps, opportunity]

## Competitive Position
- Where they lead
- Where they lag
- Market perception

## Gap Analysis
| Gap | Severity | Your Capability | Opportunity |
|-----|----------|-----------------|-------------|
| Docs outdated | High | Doc strategy | Primary |
| No tutorials | Medium | Content dev | Secondary |

## Engagement Entry Point
- Recommended buyer persona
- Budget indicators
- Timing assessment

## Recommended Approach
- Primary value proposition
- Supporting evidence
- Potential objections
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| prospect_analysis | document | Full analysis per prospect |
| competitor_matrix | document | Comparison scores |
| opportunity_summary | document | Prioritized opportunities |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Competitor set selection | Clarification | Which competitors to include in analysis |
| Problem-solution mismatch | Decision | Pass (not a fit), Nurture (revisit later), adjust positioning |
| Opportunity prioritization | Decision | Rank order of identified opportunities |
| Insufficient competitor data | Decision | Proceed with gaps, expand search, reduce competitor count |
| Stage completion | Approval | Approve → Rank, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] Top competitors identified with rationale
- [ ] All dimensions scored with evidence
- [ ] Gaps mapped to your capabilities
- [ ] Entry point recommended
- [ ] Sentiment assessed

## Completion

When finished, present for approval:
- Key competitive insights
- Top opportunities identified
- Recommended prospects for Rank stage

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/3_analyze_YYYY-MM-DD/`
2. Save prospect analysis to `artifacts/3_analyze_YYYY-MM-DD/prospect_analysis.md`
3. Save competitor matrix to `artifacts/3_analyze_YYYY-MM-DD/competitor_matrix.md`
4. Log decision to `decisions.md` with rationale
5. Update `run.yaml` with `current_stage: analyze`

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
