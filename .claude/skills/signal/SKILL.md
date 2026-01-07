---
name: signal
description: Execute SPARC Signal stage to detect and score prospect signals. Use when starting client acquisition to identify companies showing buying indicators like funding, hiring, or strategic shifts.
---

# Signal Stage

Detect and score signals indicating prospect readiness for engagement.

## Objective

Identify companies exhibiting signals that suggest they may need your services. Score signals by strength to prioritize which prospects to profile.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| target_criteria | Configuration | Industry, size, geography filters |
| signal_types | Configuration | What signals to look for |
| lookback_days | Configuration | How far back to search (default: 30) |

## Process

### 1. Signal Detection

Search for each signal type:

**Funding Signals**
- Search: "[industry] startup funding announcement"
- Look for: Series A/B/C, growth rounds, strategic investment
- Tool: `web_search`

**Hiring Signals**
- Search company job boards for relevant roles
- Look for: DevRel, AI/ML, Platform, Documentation roles
- Tool: `job_search`

**News Signals**
- Search: "[company] launch OR partnership OR expansion"
- Look for: Product launches, partnerships, market expansion
- Tool: `web_search`

**Company Data**
- Get firmographics for detected companies
- Look for: Employee count, funding stage, location
- Tool: `company_lookup`

### 2. Signal Scoring

Score each signal by strength:

| Tier | Criteria | Examples |
|------|----------|----------|
| **Hot** | Multiple strong signals, recent timing | Funding + hiring DevRel in last 14 days |
| **Warm** | Single strong or multiple moderate signals | Series B announced, or 3+ relevant job posts |
| **Watch** | Weak signals, early indicators | Mentioned AI strategy, 1 relevant hire |

**Combination Bonuses:**
- Funding + Hiring → +2 tiers
- Launch + Hiring → +1 tier
- News + Job posting → +1 tier

### 3. Output Generation

Produce signal log with:
- Company identifiers (name, domain)
- Signals detected with dates and sources
- Tier assignment with rationale
- Recommended next action

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| signal_log | document | All detected signals with metadata |
| hot_prospects | list | Companies requiring immediate profiling |
| warm_prospects | list | Companies to queue for profiling |
| watch_list | list | Companies to monitor |

## Tools Available

| Tool | Purpose |
|------|---------|
| `web_search` | Search for funding, news, announcements |
| `company_lookup` | Get firmographic data |
| `job_search` | Find job postings |
| `save_document` | Persist signal log |
| `list_documents` | Check for existing signals |

## Quality Criteria

- [ ] All target signal types searched
- [ ] Each signal has source and date
- [ ] Tier assignments have rationale
- [ ] Hot prospects identified for immediate action
- [ ] No duplicate companies in output

## Completion

When finished:
1. Save signal_log using `save_document`
2. Call `request_approval` with:
   - Count of signals detected per tier
   - List of hot prospects for profiling
   - Any gaps in signal coverage
