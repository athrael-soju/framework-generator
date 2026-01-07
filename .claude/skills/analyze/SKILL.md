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
| company_profiles | Profile stage | Structured profiles to analyze |
| positioning | Configuration | Your service positioning statement |
| analysis_dimensions | Configuration | What to compare (docs, community, DX, etc.) |

## Process

### 1. Competitor Identification

For each prospect:

**Direct Competitors**
- Tool: `web_search` "[company] competitors"
- Tool: `web_search` "[company] alternatives"
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
- Tool: `compare_competitors`
- Calculate gaps: prospect score - competitor average

### 3. Sentiment Analysis

**Customer Perception**
- Tool: `web_search` for G2 reviews, Reddit, HN mentions
- Tool: `web_fetch` to read review content
- Categorize: Praise themes, complaint themes
- Extract representative quotes

### 4. Content Audit

**Developer-Facing Content**
- Documentation: Depth, structure, freshness
- Blog: Technical content, frequency
- Tutorials: Quality, coverage
- Tool: `web_fetch` on key pages

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

## Tools Available

| Tool | Purpose |
|------|---------|
| `web_search` | Find competitors, reviews |
| `web_fetch` | Read content for assessment |
| `compare_competitors` | Generate gap matrix |
| `save_document` | Persist analysis |
| `get_document` | Retrieve profiles |
| `list_documents` | Find related documents |

## Quality Criteria

- [ ] Top competitors identified with rationale
- [ ] All dimensions scored with evidence
- [ ] Gaps mapped to your capabilities
- [ ] Entry point recommended
- [ ] Sentiment assessed

## Completion

When finished:
1. Save prospect_analysis for each company using `save_document`
2. Call `request_approval` with:
   - Key competitive insights
   - Top opportunities identified
   - Recommended prospects for Rank stage
