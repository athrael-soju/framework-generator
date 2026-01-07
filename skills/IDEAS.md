# IDEAS Skills

Stage-level skill definitions for IDEAS. Each skill defines the complete methodology for one stage of the IDEAS methodology.

> **Note:** For detailed tables (evidence strength, verdict criteria, contribution types, etc.), see the individual SKILL.md files linked below. For conceptual overview, see [IDEAS.md](../methodologies/IDEAS.md).

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
- **Inputs**: What the stage receives from prior stages
- **Process**: Step-by-step methodology with templates
- **Outputs**: What the stage produces
- **Quality Criteria**: Checklist before stage completion

---

## Skills Overview

| Skill | Command | Purpose |
|-------|---------|---------|
| `identify` | `/identify` | Define research opportunities from client engagement |
| `develop` | `/develop` | Formalize hypotheses and define execution scope |
| `evaluate` | `/evaluate` | Test hypotheses through data collection and analysis |
| `articulate` | `/articulate` | Transform findings into actionable deliverables |
| `share` | `/share` | Deliver and disseminate findings to stakeholders |

---

## Identify Skill

**File:** `.claude/skills/identify/SKILL.md`

**Purpose:** Transform a signed client engagement into a prioritized research agenda.

**Process:**
1. Contract Review — Extract scope, stakeholders, terms
2. Gap Analysis — Identify gaps between current and desired state
3. Opportunity Mapping — Map gaps to research directions
4. Prioritization — Rank and select opportunities

**Outputs:** contract_summary, research_agenda (includes gap_analysis and opportunity_map)

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Scope interpretation | Clarification | Confirm understanding of ambiguous contract terms |
| Gap prioritization | Decision | Which gaps to address first |
| Opportunity selection | Multi-select | Which opportunities to include in agenda |
| Resource constraints | Decision | Full scope, reduced scope, phased approach |
| Quality criteria check | Multi-select | Deliverables mapped, opportunities aligned, timeline actionable |
| Stage completion | Approval | Approve → Develop, Reject → retry, Edit → modify, Abort |

---

## Develop Skill

**File:** `.claude/skills/develop/SKILL.md`

**Purpose:** Transform prioritized opportunities into formal, testable hypotheses.

**Process:**
1. Prior Work Review — Survey literature and prior work
2. Hypothesis Refinement — Create IF/THEN/BECAUSE/MEASURABLE BY statements
3. Feasibility Assessment — Score and assess risks
4. Scope Definition — Define precise boundaries and methods

**Outputs:** prior_work_review, hypothesis_documents, feasibility_scores, scope_definitions

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Hypothesis framing | Clarification | Refine IF/THEN/BECAUSE structure |
| Feasibility concerns | Decision | Proceed, adjust scope, return to Identify |
| Data source access | Decision | Use available sources, seek alternatives, descope |
| Methodology selection | Decision | Quantitative, qualitative, mixed methods |
| Quality criteria check | Multi-select | Hypotheses falsifiable, evidence specified, assumptions stated |
| Stage completion | Approval | Approve → Evaluate, Reject → retry, Edit → modify, Abort |

---

## Evaluate Skill

**File:** `.claude/skills/evaluate/SKILL.md`

**Purpose:** Test hypotheses through evidence collection and analysis.

**Process:**
1. Data Collection — Gather evidence per methodology
2. Analysis Execution — Apply methods, generate results
3. Hypothesis Evaluation — Assess verdict and confidence
4. Quality Assurance — Run QA checklist

**Outputs:** raw_data, collection_log, analysis_results, evaluation_report, qa_report

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Evidence insufficiency | Decision | Collect more, proceed with caveats, revise hypothesis |
| Unexpected results | Decision | Report as-is, investigate further, return to Develop |
| Hypothesis not supported | Decision | Report negative, pivot to new hypothesis, return to Identify |
| Confidence level | Clarification | Confirm appropriate confidence assignment |
| Quality criteria check | Multi-select | Methods documented, analysis reproducible, alternatives considered |
| Stage completion | Approval | Approve → Articulate, Reject → retry, Edit → modify, Abort |

---

## Articulate Skill

**File:** `.claude/skills/articulate/SKILL.md`

**Purpose:** Transform evaluation results into audience-appropriate deliverables.

**Process:**
1. Contribution Positioning — Define novelty and significance
2. Audience Targeting — Adapt content per stakeholder
3. Recommendation Development — Convert findings to actions
4. Roadmap Creation — Organize into implementation phases

**Outputs:** contribution_statement, audience_profiles, recommendations, roadmap, client_deliverable

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Audience prioritization | Multi-select | Which stakeholders to target |
| Deliverable format | Decision | Report, presentation, workshop, documentation |
| Recommendation strength | Clarification | Confirm claim strength matches evidence |
| Novelty framing | Clarification | How to position contribution |
| Limitation disclosure | Decision | Which limitations to emphasize |
| Quality criteria check | Multi-select | Claims supported, recommendations actionable, limitations acknowledged |
| Stage completion | Approval | Approve → Share, Reject → retry, Edit → modify, Abort |

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

**Outputs:** delivery_log (includes feedback_log, handoff_materials, and engagement_closure), publication (if applicable)

**Decision Points:**
| Point | Type | Options |
|-------|------|---------|
| Channel selection | Multi-select | Executive brief, technical report, workshop, documentation |
| Publication decision | Decision | Pursue publication, client-only, defer decision |
| Venue selection | Clarification | Which publication venue to target |
| Feedback handling | Decision | Incorporate feedback, note for future, escalate |
| Knowledge transfer scope | Decision | Full handoff, partial, ongoing support |
| Quality criteria check | Multi-select | Deliverable reviewed, channel appropriate, feedback mechanism in place |
| Stage completion | Approval | Approve → Complete, Reject → retry, Edit → modify, Abort |

---

## Skill Execution

Run skills via command:

```
/identify        # Start with contract and gap analysis
/develop         # After research agenda defined
/evaluate        # After hypotheses formalized
/articulate      # After evaluation complete
/share           # After deliverables ready
```

Each skill guides you through its methodology, requests inputs, presents decision points, and produces outputs for the next stage.

See [Execution.md](../architecture/Execution.md) for detailed execution patterns.
