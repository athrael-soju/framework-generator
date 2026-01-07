# SPARC Skills

Stage-level skill definitions for SPARC. Each skill defines the complete methodology for one stage of the SPARC methodology.

> **Note:** For detailed tables (signal scoring, qualification rubrics, etc.), see the individual SKILL.md files linked below. For conceptual overview, see [SPARC.md](../methodologies/SPARC.md).

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
- **Inputs**: What the stage receives from prior stages
- **Process**: Step-by-step methodology with templates
- **Outputs**: What the stage produces
- **Quality Criteria**: Checklist before stage completion

---

## Skills Overview

| Skill | Command | Purpose |
|-------|---------|---------|
| `signal` | `/signal` | Detect and score prospect signals |
| `profile` | `/profile` | Build comprehensive company profiles |
| `analyze` | `/analyze` | Assess competitive position and opportunities |
| `rank` | `/rank` | Score and prioritize prospects |
| `craft` | `/craft` | Create personalized outreach |

---

## Signal Skill

**File:** `.claude/skills/signal/SKILL.md`

**Purpose:** Detect buying signals and prioritize them for follow-up.

**Process:**
1. Signal Detection — Monitor sources for trigger events
2. Signal Scoring — Apply strength criteria (hot/warm/watch)
3. Output Generation — Create signal log for profiling

**Signal Types:** Funding (high weight), Hiring (medium-high), Product (medium), Content (low-medium), News (variable). See [signal/SKILL.md](../.claude/skills/signal/SKILL.md) for detailed scoring criteria.

**Outputs:** signal_log with company identifiers and scores

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Multiple hot signals | Clarification | Prioritize by type (funding/hiring/product) or weight equally |
| Signal source conflict | Decision | Trust source A, trust source B, flag for manual verification |
| Stage completion | Approval | Approve → Profile, Reject → retry, Edit → modify, Abort |

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

**Outputs:** company_profile with gap annotations

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Incomplete data | Decision | Continue with gaps, return to Signal, request manual input |
| Conflicting information | Clarification | Which source to trust, how to reconcile |
| Key person identification | Clarification | Confirm decision-maker role and priority |
| Stage completion | Approval | Approve → Analyze, Reject → retry, Edit → modify, Abort |

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
- Developer experience
- Content quality
- Pricing transparency
- Enterprise features

**Outputs:** prospect_analysis, competitor_matrix, opportunity_summary

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Competitor set selection | Clarification | Which competitors to include in analysis |
| Problem-solution mismatch | Decision | Pass (not a fit), Nurture (revisit later), adjust positioning |
| Opportunity prioritization | Decision | Rank order of identified opportunities |
| Quality criteria check | Multi-select | Confirm each criterion met before completion |
| Stage completion | Approval | Approve → Rank, Reject → retry, Edit → modify, Abort |

---

## Rank Skill

**File:** `.claude/skills/rank/SKILL.md`

**Purpose:** Score prospects against qualification criteria.

**Process:**
1. Criteria Application — Score each criterion
2. Weighted Calculation — Compute total score
3. Recommendation Assignment — Prioritize/Qualified/Nurture/Pass

**Scoring Criteria:** Budget Indicators (25%), Problem Fit (25%), Timing (20%), Access (15%), Strategic Value (15%).

**Thresholds:** 4.0+ → Prioritize, 3.0-3.9 → Qualified, 2.0-2.9 → Nurture, <2.0 → Pass.

See [rank/SKILL.md](../.claude/skills/rank/SKILL.md) for detailed scoring rubric and [SPARC.md](../methodologies/SPARC.md#rank) for the 1/3/5 scale.

**Outputs:** qualification_score with breakdown and recommendation

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Threshold boundary (score near cutoff) | Decision | Nurture, Qualify anyway, Pass |
| Criterion weighting adjustment | Clarification | Override default weights for this prospect |
| Pipeline capacity check | Decision | Proceed, defer to next cycle, fast-track |
| Quality criteria check | Multi-select | Confirm scoring rationale documented |
| Stage completion | Approval | Approve → Craft, Reject → retry, Edit → modify, Abort |

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

**Outputs:** decision_maker_profile, outreach_message, variants, talking_points, outreach_brief

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Decision-maker selection | Clarification | Which contact to target first |
| Channel selection | Decision | Email, LinkedIn, warm intro, event |
| Message variant selection | Decision | Choose from generated variants |
| Tone/positioning adjustment | Clarification | Formal/casual, technical/business focus |
| Quality criteria check | Multi-select | Hook references signal, insight shows depth, ask is concrete |
| Stage completion | Approval | Approve → Send/IDEAS, Reject → retry, Edit → modify, Abort |

---

## Skill Execution

Run skills via command:

```
/signal          # Start with signal detection
/profile         # After signals identified
/analyze         # After profiles complete
/rank            # After analysis complete
/craft           # After ranking complete
```

Each skill guides you through its methodology, requests inputs, presents decision points, and produces outputs for the next stage.

See [Execution.md](../architecture/Execution.md) for detailed execution patterns.
