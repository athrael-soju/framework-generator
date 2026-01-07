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
- Tool: `company_lookup`
- Capture: Legal name, domain, founded, HQ location
- Capture: Employee count, funding history, investors

**Web Presence**
- Tool: `web_fetch` on company about page
- Capture: Mission, positioning, key products
- Capture: Leadership team mentions

### 2. Technical Footprint

**GitHub Analysis**
- Tool: `github_profile`
- Capture: Repo count, stars, contributors
- Capture: Primary languages, activity level
- Assess: Open source commitment, developer focus

**Documentation Review**
- Tool: `web_fetch` on docs site
- Assess: Depth (API ref, guides, tutorials)
- Assess: Freshness (last updated dates)
- Assess: Quality (structure, examples)

### 3. Developer Ecosystem

**Community Presence**
- Search for Discord, Slack, forum links
- Tool: `web_search`, `web_fetch`
- Assess: Community size and activity

**SDK/Library Quality**
- Review GitHub repos for official SDKs
- Assess: Language coverage, maintenance

### 4. Profile Synthesis

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

## Tools Available

| Tool | Purpose |
|------|---------|
| `web_search` | Find additional company info |
| `web_fetch` | Retrieve page content |
| `company_lookup` | Get firmographic data |
| `github_profile` | Analyze GitHub presence |
| `save_document` | Persist profiles |
| `get_document` | Retrieve signal log |

## Quality Criteria

- [ ] All template fields populated or marked as gaps
- [ ] Technical footprint assessed
- [ ] Developer ecosystem evaluated
- [ ] Sources documented for key claims
- [ ] Cross-referenced for consistency

## Completion

When finished:
1. Save each company_profile using `save_document`
2. Call `request_approval` with:
   - Number of profiles completed
   - Key findings across profiles
   - Significant data gaps
   - Readiness for Analyze stage
