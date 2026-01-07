# SPARC Skills

Stage-level skill definitions for SPARC agents. Each skill defines the complete methodology for one stage of the SPARC framework.

---

## Skill Architecture

```
.claude/skills/
├── signal/SKILL.md    # Signal stage methodology
├── profile/SKILL.md   # Profile stage methodology
├── analyze/SKILL.md   # Analyze stage methodology
├── rank/SKILL.md      # Rank stage methodology
└── craft/SKILL.md     # Craft stage methodology
```

Each skill is a self-contained instruction set that defines:
- **Inputs**: What the agent receives from prior stages
- **Process**: Step-by-step methodology with templates
- **Outputs**: What the agent produces
- **Tools**: MCP tools available for execution
- **Quality Criteria**: Checklist before stage completion

---

## Skills Overview

| Skill | Stage | Purpose |
|-------|-------|---------|
| `signal` | Signal | Detect and score prospect signals |
| `profile` | Profile | Build comprehensive company profiles |
| `analyze` | Analyze | Assess competitive position and opportunities |
| `rank` | Rank | Score and prioritize prospects |
| `craft` | Craft | Create personalized outreach |

---

## Signal Skill

**File:** `.claude/skills/signal/SKILL.md`

**Purpose:** Detect buying signals and prioritize them for follow-up.

**Process:**
1. Signal Detection — Monitor sources for trigger events
2. Signal Scoring — Apply strength criteria (hot/warm/watch)
3. Output Generation — Create signal log for profiling

**Signal Types:**
| Type | Weight | Examples |
|------|--------|----------|
| Funding | High | Series A+, growth round |
| Hiring | Medium-High | DevRel, API, Developer roles |
| Product | Medium | New API launch, platform release |
| Content | Low-Medium | Blog posts about relevant topics |
| News | Variable | Depends on event type |

**Tools:** `web_search`, `company_lookup`, `job_search`, `save_document`, `list_documents`

**Outputs:** signal_log with company identifiers and scores

---

## Profile Skill

**File:** `.claude/skills/profile/SKILL.md`

**Purpose:** Build comprehensive company profiles from collected data.

**Process:**
1. Data Collection — Gather firmographics, GitHub, jobs, news, web content
2. Profile Synthesis — Populate template, cross-reference for consistency
3. Gap Identification — Flag missing or uncertain data

**Profile Template:**
- Company basics (name, domain, founded, employees, funding)
- Technical footprint (GitHub stats, languages, activity)
- Market position (vertical, competitors, positioning)
- Recent activity (news, hiring, product launches)

**Tools:** `web_search`, `web_fetch`, `company_lookup`, `github_profile`, `save_document`, `get_document`

**Outputs:** company_profile with gap annotations

---

## Analyze Skill

**File:** `.claude/skills/analyze/SKILL.md`

**Purpose:** Assess competitive position and identify engagement opportunities.

**Process:**
1. Competitor Identification — Map competitive landscape
2. Gap Matrix Generation — Compare across dimensions
3. Sentiment Analysis — Aggregate customer perception
4. Content Audit — Assess documentation and developer experience
5. Synthesis — Generate analysis report with opportunities

**Comparison Dimensions:**
- Documentation depth
- Community size
- Pricing transparency
- Global coverage
- AI/ML offerings
- Developer experience

**Tools:** `web_search`, `web_fetch`, `compare_competitors`, `save_document`, `get_document`, `list_documents`

**Outputs:** prospect_analysis_report, competitive_matrix, opportunities

---

## Rank Skill

**File:** `.claude/skills/rank/SKILL.md`

**Purpose:** Score prospects against qualification criteria.

**Process:**
1. Criteria Application — Score each criterion
2. Weighted Calculation — Compute total score
3. Recommendation Assignment — Prioritize/Qualified/Nurture/Pass

**Scoring Criteria:**
| Criterion | Weight | Focus |
|-----------|--------|-------|
| Budget Indicators | 25% | Funding, employee count, stated budgets |
| Problem Fit | 25% | Alignment with your positioning |
| Timing | 20% | Urgency signals, active buying |
| Access | 15% | Path to decision-maker |
| Strategic Value | 15% | Ongoing potential, referral value |

**Thresholds:**
- 4.0+ → Prioritize
- 3.0-3.9 → Qualified
- 2.0-2.9 → Nurture
- <2.0 → Pass

**Tools:** `score_prospect`, `save_document`, `get_document`, `list_documents`

**Outputs:** qualification_score with breakdown and recommendation

---

## Craft Skill

**File:** `.claude/skills/craft/SKILL.md`

**Purpose:** Create personalized outreach for qualified prospects.

**Process:**
1. Decision-Maker Profiling — Build target profile
2. Message Drafting — Create personalized outreach
3. Variant Generation — Produce 2-3 alternatives
4. Brief Preparation — Prepare talking points for response

**Message Structure:**
1. Hook — Reference specific signal or their content
2. Insight — Non-obvious observation from analysis
3. Bridge — Connect gap to your capability
4. Ask — Low-commitment next step

**Tools:** `web_search`, `web_fetch`, `save_document`, `get_document`, `list_documents`

**Outputs:** decision_maker_profile, outreach_message, variants, response_brief

---

## MCP Tool Reference

Tools available to SPARC agents via MCP servers:

### research-mcp

| Tool | Purpose |
|------|---------|
| `web_search` | Search queries with filters |
| `web_fetch` | Fetch and parse URL content |
| `company_lookup` | Firmographic data retrieval |
| `job_search` | Find job postings |
| `github_profile` | GitHub org analysis |

### analysis-mcp

| Tool | Purpose |
|------|---------|
| `score_prospect` | Apply qualification scorecard |
| `compare_competitors` | Generate gap matrix |

### storage-mcp

| Tool | Purpose |
|------|---------|
| `save_document` | Persist artifacts |
| `get_document` | Retrieve artifacts by ID |
| `list_documents` | Query artifacts by type |
| `update_pipeline` | Update pipeline state |

### notify-mcp

| Tool | Purpose |
|------|---------|
| `request_approval` | Human approval gate |
| `send_notification` | Alert human |

---

## Skill → Agent Mapping

One skill per agent. The skill defines what to do; the agent executes it.

| Agent | Skill | MCP Servers |
|-------|-------|-------------|
| Signal | `signal` | research-mcp, storage-mcp |
| Profile | `profile` | research-mcp, storage-mcp |
| Analyze | `analyze` | research-mcp, analysis-mcp, storage-mcp |
| Rank | `rank` | analysis-mcp, storage-mcp |
| Craft | `craft` | research-mcp, storage-mcp |

---

## Agent Loading

Each agent loads its stage skill at initialization:

```python
def load_skill(stage: str) -> str:
    """Load skill definition for a stage."""
    path = f".claude/skills/{stage}/SKILL.md"
    return read_file(path)

def build_agent_prompt(stage: str, framework: str) -> str:
    """Build complete agent system prompt."""
    return f"""
You are the {stage.title()} Agent for {framework.upper()}.

{load_skill(stage)}

When finished, call request_approval with your outputs summary.
"""

# Example: Signal Agent
signal_agent = Agent(
    model="claude-sonnet-4-5-20250514",
    system_prompt=build_agent_prompt("signal", "sparc"),
    mcp_servers=["research-mcp", "storage-mcp"],
    allowed_tools=[
        "mcp__research-mcp__web_search",
        "mcp__research-mcp__company_lookup",
        "mcp__research-mcp__job_search",
        "mcp__storage-mcp__save_document",
        "mcp__storage-mcp__list_documents"
    ]
)
```

See [Agent_Architecture.md](Agent_Architecture.md) for complete agent definitions.
