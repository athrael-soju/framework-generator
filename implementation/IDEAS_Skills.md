# IDEAS Skills

Stage-level skill definitions for IDEAS agents. Each skill defines the complete methodology for one stage of the IDEAS methodology.

---

## Skill Architecture

```
.claude/skills/
├── identify/SKILL.md    # Identify stage methodology
├── develop/SKILL.md     # Develop stage methodology
├── evaluate/SKILL.md    # Evaluate stage methodology
├── articulate/SKILL.md  # Articulate stage methodology
└── share/SKILL.md       # Share stage methodology
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
| `identify` | Identify | Define research opportunities from client engagement |
| `develop` | Develop | Formalize hypotheses and define execution scope |
| `evaluate` | Evaluate | Test hypotheses through data collection and analysis |
| `articulate` | Articulate | Transform findings into actionable deliverables |
| `share` | Share | Deliver and disseminate findings to stakeholders |

---

## Identify Skill

**File:** `.claude/skills/identify/SKILL.md`

**Purpose:** Transform a signed client engagement into a prioritized research agenda.

**Process:**
1. Contract Review — Extract scope, stakeholders, terms
2. Gap Analysis — Identify gaps between current and desired state
3. Opportunity Mapping — Map gaps to research directions
4. Prioritization — Rank and select opportunities

**Tools:** `web_search`, `web_fetch`, `save_document`, `get_document`, `list_documents`

**Outputs:** contract_summary, gap_analysis, opportunity_map, research_agenda

---

## Develop Skill

**File:** `.claude/skills/develop/SKILL.md`

**Purpose:** Transform prioritized opportunities into formal, testable hypotheses.

**Process:**
1. Prior Work Review — Survey literature and prior work
2. Hypothesis Refinement — Create IF/THEN/BECAUSE/MEASURABLE BY statements
3. Feasibility Assessment — Score and assess risks
4. Scope Definition — Define precise boundaries and methods

**Tools:** `web_search`, `web_fetch`, `save_document`, `get_document`, `list_documents`

**Outputs:** prior_work_review, hypothesis_documents, feasibility_scores, scope_definitions

---

## Evaluate Skill

**File:** `.claude/skills/evaluate/SKILL.md`

**Purpose:** Test hypotheses through evidence collection and analysis.

**Process:**
1. Data Collection — Gather evidence per methodology
2. Analysis Execution — Apply methods, generate results
3. Hypothesis Evaluation — Assess verdict and confidence
4. Quality Assurance — Run QA checklist

**Tools:** `web_search`, `web_fetch`, `evaluate_hypothesis`, `save_document`, `get_document`, `list_documents`

**Outputs:** raw_data, collection_log, analysis_results, evaluation_report, qa_report

---

## Articulate Skill

**File:** `.claude/skills/articulate/SKILL.md`

**Purpose:** Transform evaluation results into audience-appropriate deliverables.

**Process:**
1. Contribution Positioning — Define novelty and significance
2. Audience Targeting — Adapt content per stakeholder
3. Recommendation Development — Convert findings to actions
4. Roadmap Creation — Organize into implementation phases

**Tools:** `save_document`, `get_document`, `list_documents`

**Outputs:** contribution_statement, audience_profiles, recommendations, roadmap, client_deliverable

---

## Share Skill

**File:** `.claude/skills/share/SKILL.md`

**Purpose:** Deliver findings and maximize impact.

**Process:**
1. Channel Selection — Choose delivery channels
2. Delivery Execution — Execute delivery plan
3. Feedback Collection — Gather and categorize feedback
4. Knowledge Transfer — Hand off for ongoing use

**Publication Path (when applicable):**
5. Venue Selection — Select publication venue
6. Paper Drafting — Create publication draft
7. Client Review — Obtain publication approval
8. Submission — Execute submission
9. Peer Review Response — Handle reviewer feedback
10. Post-Publication — Maximize impact

**Tools:** `save_document`, `get_document`, `list_documents`, `send_notification`

**Outputs:** delivery_log, feedback_log, handoff_materials, publication (if applicable)

---

## MCP Tool Reference

Tools available to IDEAS agents via MCP servers:

### research-mcp

| Tool | Purpose |
|------|---------|
| `web_search` | Search queries with filters |
| `web_fetch` | Fetch and parse URL content |

### analysis-mcp

| Tool | Purpose |
|------|---------|
| `evaluate_hypothesis` | Formal hypothesis assessment |

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
| Identify | `identify` | research-mcp, storage-mcp |
| Develop | `develop` | research-mcp, storage-mcp |
| Evaluate | `evaluate` | research-mcp, analysis-mcp, storage-mcp |
| Articulate | `articulate` | storage-mcp |
| Share | `share` | storage-mcp, notify-mcp |

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

# Example: Identify Agent
identify_agent = Agent(
    model="claude-sonnet-4-5-20250514",
    system_prompt=build_agent_prompt("identify", "ideas"),
    mcp_servers=["research-mcp", "storage-mcp"],
    allowed_tools=[
        "mcp__research-mcp__web_search",
        "mcp__research-mcp__web_fetch",
        "mcp__storage-mcp__*"
    ]
)
```

See [Agent_Architecture.md](Agent_Architecture.md) for complete agent definitions.
