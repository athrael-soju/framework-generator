---
name: profile
description: Execute SPARC Profile stage to build comprehensive company profiles. Use after Signal stage to deeply research prioritized prospects before competitive analysis.
---

# Profile Stage

Build comprehensive company profiles for prioritized prospects.

## Objective

Transform signal data into structured company profiles with enough depth to support competitive analysis and outreach personalization.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| signal_log | Signal stage | Companies to profile with initial signals |
| profile_template | Configuration | Standard profile structure |
| priority_tier | Signal stage | Which tier to profile (typically: hot) |

## Process

### 1. Firmographic Enrichment

For each company:

**Basic Data**
- Capture: Legal name, domain, founded, HQ location
- Capture: Employee count, funding history, investors

**Web Presence**
- Review company about page
- Capture: Mission, positioning, key products
- Capture: Leadership team mentions

### 2. Technical Footprint

**GitHub Analysis**
- Capture: Repo count, stars, contributors
- Capture: Primary languages, activity level
- Assess: Open source commitment, developer focus

**Documentation Review**
- Review docs site
- Assess: Depth (API ref, guides, tutorials)
- Assess: Freshness (last updated dates)
- Assess: Quality (structure, examples)

### 3. Developer Ecosystem

**Community Presence**
- Search for Discord, Slack, forum links
- Assess: Community size and activity

**SDK/Library Quality**
- Review GitHub repos for official SDKs
- Assess: Language coverage, maintenance

### 4. Key People

**Decision-Maker Identification**
- Search for relevant titles: VP Engineering, Head of DevRel, CTO, CMO
- Capture: Name, title, tenure, LinkedIn profile
- Assess: Decision-making authority, budget control

**Background Research**
- Review LinkedIn profiles
- Note: Previous companies, career trajectory
- Note: Public content, speaking engagements

### 5. Profile Synthesis

Combine all data into structured profile:

```
## Company Overview
- Name, domain, founded, location
- Employee count, funding stage
- Mission and positioning

## Technical Stack
- Primary languages
- Open source activity
- Documentation quality score (1-5)

## Developer Ecosystem
- Community size and channels
- SDK coverage
- Developer experience score (1-5)

## Key People
- Decision-makers identified
- Roles and tenure
- Background notes

## Recent Activity
- Key signals from Signal stage
- News and announcements
- Hiring patterns

## Data Gaps
- Fields with missing/uncertain data
- Recommended follow-up research
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| company_profile | document | Structured profile per company |
| profile_gaps | list | Missing data requiring follow-up |
| profile_summary | document | Overview of all profiled companies |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Incomplete data | Decision | Continue with gaps noted, return to Signal, request manual input |
| Conflicting information | Clarification | Which source to trust, how to reconcile |
| Key person identification | Clarification | Confirm decision-maker role and priority |
| Data staleness | Decision | Accept older data, flag for refresh, seek current source |
| Stage completion | Approval | Approve → Analyze, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] All template fields populated or marked as gaps
- [ ] Technical footprint assessed
- [ ] Developer ecosystem evaluated
- [ ] Key decision-makers identified
- [ ] Sources documented for key claims
- [ ] Cross-referenced for consistency

## Completion

When finished, present for approval:
- Number of profiles completed
- Key findings across profiles
- Significant data gaps
- Recommendation: proceed to Analyze or gather more data

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/2_profile_YYYY-MM-DD/`
2. Save company profile to `artifacts/2_profile_YYYY-MM-DD/company_profile.yaml`
3. Log decision to `decisions.md` with rationale
4. Update `run.yaml` with `current_stage: profile`

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
