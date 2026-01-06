# SPARC Skills

Atomic skill definitions for SPARC agents.

---

## Signal Stage Skills

### web_search

**Purpose:** Search the web for specific queries.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| query | string | yes | Search query |
| filters | object | no | Date range, domain restrictions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| results | array | Ranked results with title, snippet, url |

**Tools:** Web search API, MCP web_search

---

### company_lookup

**Purpose:** Retrieve firmographic data for a company.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| identifier | string | yes | Company name or domain |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| name | string | Legal name |
| domain | string | Primary domain |
| founded | string | Year founded |
| employees | number | Employee count |
| funding | array | Funding rounds with amount, date, investors |
| location | string | HQ location |

**Tools:** Crunchbase MCP, Clearbit API

---

### job_search

**Purpose:** Find job postings for a company.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| company | string | yes | Company name |
| keywords | array | no | Role keywords (e.g., "DevRel", "AI Engineer") |
| posted_within | number | no | Days since posted |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| postings | array | Jobs with title, location, posted_date, url |

**Tools:** LinkedIn MCP, Indeed API

---

### news_search

**Purpose:** Find recent news about a company or topic.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| query | string | yes | Company name or topic |
| days | number | no | Lookback period (default 30) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| articles | array | News items with title, source, date, url, snippet |

**Tools:** research-mcp (web_search with news filters)

---

### signal_scoring

**Purpose:** Score signals by strength against defined criteria.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| signals | array | yes | Raw signal records |
| criteria | object | yes | Scoring rules by signal type |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| scored_signals | array | Signals with strength tier (hot/warm/watch) |

**Process:**
1. For each signal, match against criteria rules
2. Apply signal type weights
3. Check for signal combinations (funding + hiring = hot)
4. Assign tier based on composite score

---

## Profile Stage Skills

### web_fetch

**Purpose:** Fetch and parse content from a URL.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | yes | URL to fetch |
| extract | string | no | What to extract: "text", "links", "structured" |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| content | string | Extracted content |
| metadata | object | Title, description, publish date if available |

**Tools:** MCP web_fetch

---

### github_profile

**Purpose:** Analyze a GitHub organization's presence.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| org | string | yes | GitHub org name |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| repos | number | Public repository count |
| stars | number | Total stars across repos |
| contributors | number | Unique contributors |
| recent_activity | string | Activity level (active/moderate/stale) |
| top_repos | array | Top 5 repos by stars |
| languages | array | Primary languages used |

**Tools:** GitHub MCP, GitHub API

---

### profile_synthesis

**Purpose:** Synthesize collected data into structured company profile.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| firmographics | object | yes | From company_lookup |
| github | object | no | From github_profile |
| jobs | array | no | From job_search |
| news | array | no | From news_search |
| web_content | array | no | From web_fetch (about pages, docs) |
| template | string | yes | Profile template |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| profile | object | Structured company profile |
| gaps | array | Fields with missing/uncertain data |

**Process:**
1. Populate template fields from collected data
2. Cross-reference for consistency
3. Flag fields with conflicting or missing data
4. Generate recent_activity summary from news + jobs
5. Assess technical_footprint from GitHub + docs

---

## Analyze Stage Skills

### competitor_identify

**Purpose:** Identify competitors for a company.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| company | string | yes | Target company name |
| vertical | string | yes | Industry vertical |
| signals | array | no | Known competitor mentions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| competitors | array | Competitor names with rationale |

**Process:**
1. Search "[company] competitors" and "[company] alternatives"
2. Check industry reports and comparison sites
3. Extract from company's own positioning ("unlike X, we...")
4. Rank by directness of competition

---

### compare_competitors

**Purpose:** Generate gap matrix comparing target to competitors.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| target_profile | object | yes | Target company profile |
| competitor_profiles | array | yes | Competitor profiles |
| dimensions | array | yes | Comparison dimensions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| matrix | object | Scores by company × dimension |
| gaps | array | Dimensions where target underperforms |
| strengths | array | Dimensions where target outperforms |

**Process:**
1. For each dimension, score each company (1-5)
2. Calculate target vs competitor deltas
3. Identify gaps (target < avg competitor)
4. Identify strengths (target > avg competitor)
5. Prioritize gaps by market importance

**Dimensions (examples):**
- documentation_depth
- community_size
- pricing_transparency
- global_coverage
- ai_ml_offerings
- developer_experience

---

### review_sentiment

**Purpose:** Aggregate customer sentiment from review sources.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| company | string | yes | Company name |
| sources | array | no | Review sources (G2, Reddit, HN) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| sentiment | string | Overall (positive/mixed/negative) |
| themes | array | Common praise/complaint themes |
| quotes | array | Representative quotes |

**Tools:** G2 API, web_search + web_fetch for Reddit/HN

---

### content_audit

**Purpose:** Assess documentation and developer experience quality.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| company | string | yes | Company name |
| docs_url | string | no | Documentation site URL |
| github_profile | object | no | From github_profile skill |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| documentation | object | Depth, structure, freshness scores (1-5) |
| community | object | Size, activity, responsiveness scores (1-5) |
| developer_experience | object | Onboarding, SDK quality, examples scores (1-5) |
| gaps | array | Identified weaknesses |

**Process:**
1. Fetch and analyze documentation site structure
2. Assess content depth (API reference, guides, tutorials)
3. Check freshness (last updated dates, version coverage)
4. Evaluate community presence (Discord, Slack, forums)
5. Review SDK/library quality from GitHub
6. Identify gaps relative to developer expectations

**Tools:** web_fetch, github_profile

---

### analysis_synthesis

**Purpose:** Generate prospect analysis report from collected analysis.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| profile | object | yes | Company profile |
| competitor_matrix | object | yes | From compare_competitors |
| sentiment | object | no | From review_sentiment |
| positioning | string | yes | Your positioning statement |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| report | string | Markdown analysis report |
| opportunities | array | Identified engagement opportunities |
| entry_point | object | Recommended buyer, budget estimate |

**Process:**
1. Summarize competitive position
2. Map gaps to your capabilities
3. Identify strategic priorities from signals + hiring
4. Assess entry point (who buys, budget indicators)
5. Generate opportunity recommendations

---

## Rank Stage Skills

### score_prospect

**Purpose:** Score prospect against qualification criteria.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| analysis | object | yes | Prospect analysis report |
| criteria | object | yes | Scoring criteria with weights |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| scores | object | Score per criterion with rationale |
| total | number | Weighted total (0-5) |
| recommendation | string | prioritize/qualified/nurture/pass |

**Criteria:**
| Criterion | Weight | Scoring Rubric |
|-----------|--------|----------------|
| budget_indicators | 25% | Funding stage, employee count, stated budgets |
| problem_fit | 25% | Alignment with your positioning |
| timing | 20% | Urgency signals, active buying behavior |
| access | 15% | Path to decision-maker |
| strategic_value | 15% | Ongoing potential, referral value |

**Thresholds:**
- 4.0+ → prioritize
- 3.0-3.9 → qualified
- 2.0-2.9 → nurture
- <2.0 → pass

---

## Craft Stage Skills

### decision_maker_profile

**Purpose:** Build profile of target decision-maker.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | yes | Person's name |
| company | string | yes | Company name |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| title | string | Current role |
| background | string | Career summary |
| interests | array | Topics they post/engage about |
| content | array | Recent posts/articles |
| connection_path | string | Mutual connections or none |

**Tools:** LinkedIn MCP

---

### outreach_draft

**Purpose:** Draft personalized outreach message.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| analysis | object | yes | Prospect analysis |
| decision_maker | object | yes | Decision-maker profile |
| templates | array | yes | Outreach templates |
| channel | string | yes | linkedin_dm/email |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| message | string | Drafted outreach |
| variants | array | 2-3 alternative versions |
| brief | object | Talking points for response |

**Message Structure:**
1. **Hook** — Reference specific signal or their content
2. **Insight** — Non-obvious observation from analysis
3. **Bridge** — Connect gap to your capability
4. **Ask** — Low-commitment next step

**Process:**
1. Select template matching channel and context
2. Inject specifics from analysis (signals, gaps, quotes)
3. Reference decision-maker's recent content if relevant
4. Generate 2-3 variants with different hooks
5. Prepare brief with likely questions and responses

---

## Shared Skills

### save_document

**Purpose:** Persist document to storage.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | yes | Document type (signal_log, profile, analysis, etc.) |
| content | object | yes | Document content |
| metadata | object | no | Tags, timestamps, relationships |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Document identifier |

**Tools:** storage-mcp

---

### get_document

**Purpose:** Retrieve document from storage.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Document identifier |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| content | object | Document content |
| metadata | object | Document metadata |

**Tools:** storage-mcp

---

### list_documents

**Purpose:** Query documents from storage by type and filters.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | yes | Document type to query |
| filters | object | no | Filter criteria (date range, tags, status) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| ids | array | Matching document identifiers |

**Tools:** storage-mcp

---

### update_pipeline

**Purpose:** Update pipeline state for a prospect or project.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| stage | string | yes | Current pipeline stage |
| status | string | yes | Stage status (in_progress, complete, blocked) |
| data | object | no | Additional state data |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| confirmation | boolean | Update success status |

**Tools:** storage-mcp

---

### send_notification

**Purpose:** Send notification to human via configured channel.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| channel | string | yes | Notification channel (slack, email) |
| message | string | yes | Notification content |
| priority | string | no | Priority level (low, normal, high) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| confirmation | boolean | Delivery confirmation |

**Tools:** notify-mcp

---

### request_approval

**Purpose:** Request human approval for stage transition.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| stage | string | yes | Current stage |
| summary | string | yes | Summary of outputs |
| outputs | array | yes | Output document IDs |
| next_stage | string | yes | Proposed next stage |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| decision | string | approve/reject/edit/abort |
| feedback | string | Human feedback if rejected |
| edits | object | Modifications if edited |

**Tools:** notify-mcp

---

## Skill → Agent Mapping

| Skill | Signal | Profile | Analyze | Rank | Craft |
|-------|--------|---------|---------|------|-------|
| web_search | ✓ | ✓ | ✓ | | ✓ |
| web_fetch | | ✓ | ✓ | | |
| company_lookup | ✓ | ✓ | | | |
| job_search | ✓ | | | | |
| news_search | ✓ | | | | |
| signal_scoring | ✓ | | | | |
| github_profile | | ✓ | | | |
| profile_synthesis | | ✓ | | | |
| competitor_identify | | | ✓ | | |
| compare_competitors | | | ✓ | | |
| review_sentiment | | | ✓ | | |
| content_audit | | | ✓ | | |
| analysis_synthesis | | | ✓ | | |
| score_prospect | | | | ✓ | |
| decision_maker_profile | | | | | ✓ |
| outreach_draft | | | | | ✓ |
| save_document | ✓ | ✓ | ✓ | ✓ | ✓ |
| get_document | | ✓ | ✓ | ✓ | ✓ |
| list_documents | ✓ | ✓ | ✓ | ✓ | ✓ |
| update_pipeline | ✓ | ✓ | ✓ | ✓ | ✓ |
| send_notification | ✓ | ✓ | ✓ | ✓ | ✓ |
| request_approval | ✓ | ✓ | ✓ | ✓ | ✓ |
