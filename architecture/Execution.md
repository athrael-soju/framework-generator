# Executing PRAXIS

How to run SPARC and IDEAS stages using Claude Code skills.

```mermaid
---
config:
  layout: dagre
  look: handDrawn
  theme: base
  themeVariables:
    lineColor: gray
---
flowchart TB
    subgraph SPARC ["SPARC - Acquisition"]
        S["/signal"] --> P["/profile"]
        P --> A["/analyze"]
        A --> R["/rank"]
        R --> C["/craft"]
    end

    subgraph IDEAS ["IDEAS - Delivery"]
        I["/identify"] --> D["/develop"]
        D --> E["/evaluate"]
        E --> Ar["/articulate"]
        Ar --> Sh["/share"]
    end

    C --> |"signed agreement"| I
    Sh -.-> |"referral"| S
```

---

## Skills Overview

Each PRAXIS stage has a corresponding skill that defines its methodology:

| Methodology | Stage | Skill Command | Purpose |
|-------------|-------|---------------|---------|
| SPARC | Signal | `/signal` | Detect and score prospect signals |
| SPARC | Profile | `/profile` | Build comprehensive company profiles |
| SPARC | Analyze | `/analyze` | Assess competitive position |
| SPARC | Rank | `/rank` | Score and prioritize prospects |
| SPARC | Craft | `/craft` | Create personalized outreach |
| IDEAS | Identify | `/identify` | Define research opportunities |
| IDEAS | Develop | `/develop` | Formalize hypotheses |
| IDEAS | Evaluate | `/evaluate` | Test hypotheses |
| IDEAS | Articulate | `/articulate` | Create deliverables |
| IDEAS | Share | `/share` | Deliver and disseminate |

---

## Running a Stage

### 1. Invoke the Skill

Run the skill command for the stage you want to execute:

```
/signal
```

The skill will guide you through the stage methodology, prompting for inputs and decisions as needed.

### 2. Provide Inputs

Each stage expects specific inputs. The skill will request them or use outputs from prior stages:

| Stage | Required Inputs |
|-------|-----------------|
| Signal | Target criteria, signal types, lookback window |
| Profile | Signal log, profile template, priority tier |
| Analyze | Company profiles, positioning statement, analysis dimensions, expertise inventory |
| Rank | Prospect analyses, scoring criteria, thresholds |
| Craft | Priority ranking, prospect analyses, outreach templates, channel, service offerings |
| Identify | Signed agreement, prospect analysis, outreach brief (hypothesis seeds), expertise inventory |
| Develop | Research agenda, opportunity details, constraints |
| Evaluate | Hypothesis documents, scope definitions, feasibility scores |
| Articulate | Evaluation report, hypothesis documents, prior work review, contract summary, service offerings |
| Share | Client deliverable, audience profiles, contract summary |

### 3. Work Through the Process

The skill executes its methodology:
- Performs research and analysis
- Presents findings
- Requests decisions at key points
- Produces stage outputs

### 4. Approve and Proceed

At stage completion, review outputs and approve to proceed:
- **Approve** - Move to next stage
- **Revise** - Adjust outputs before proceeding
- **Retry** - Re-run stage with different approach
- **Abort** - Exit pipeline

---

## Execution Patterns

### Sequential Execution

Run stages in order, completing each before starting the next:

```
/signal
[complete stage, approve outputs]

/profile
[complete stage, approve outputs]

/analyze
...
```

### Partial Pipeline

Run specific stages when you have existing inputs:

```
# Already have company profiles from other research
/analyze
[provide profiles, complete analysis]
```

### Cross-Framework Handoff

When SPARC produces a signed agreement, transition to IDEAS:

```
/craft
[outreach succeeds, agreement signed]

/identify
[provide agreement and analysis from SPARC]
```

---

## Decision Points

Skills present structured choices at key moments:

### Clarification Menus

When inputs are ambiguous:
- Multiple valid interpretations
- Missing information
- Conflicting data

### Decision Menus

When strategic direction is needed:
- Multiple valid approaches exist
- Threshold or boundary conditions met
- Feedback loop conditions triggered

### Approval Menus

At stage completion:
- Summary of outputs produced
- Quality criteria check results
- Options: approve / revise / retry / abort

---

## Feedback Loops

Some conditions route back to earlier stages:

### SPARC Feedback Loops

| Condition | From | To |
|-----------|------|-----|
| Insufficient public data | Profile | Signal (monitor) |
| Problem doesn't match positioning | Analyze | Pass or Nurture |
| Score below threshold | Rank | Nurture or Pass |
| No response after 2 touches | Craft | Nurture |
| Response but no fit | Craft | Pass |
| Response + fit | Craft | Discovery -> Proposal -> IDEAS |

### IDEAS Feedback Loops

| Condition | From | To |
|-----------|------|-----|
| Idea not tractable | Develop | Identify |
| Wrong problem | Evaluate | Identify |
| Results don't support theory | Evaluate | Develop |
| Weak novelty | Articulate | Identify |
| Overclaiming results | Articulate | Evaluate |
| Peer review rejection | Share | Evaluate |
| Implementation issues | Share | Develop |
| Client feedback requires changes | Share | Articulate |
| Fundamental misalignment | Any | Exit/Renegotiate |

When a feedback condition is triggered, the skill will present options and guide you to the appropriate stage.

---

## Artifact Persistence

Each PRAXIS run persists two things:
1. **Decision log** — What the user decided at each stage and why
2. **Artifacts** — Complete outputs from each stage

### Run-Based Structure

```
praxis/
├── runs/
│   ├── 2025-01-15_vultr_sparc/
│   │   ├── run.yaml                    # Run metadata
│   │   ├── decisions.md                # Decision log
│   │   └── artifacts/
│   │       ├── 1_signal_log.yaml
│   │       ├── 2_company_profile.yaml
│   │       ├── 3_prospect_analysis.yaml
│   │       ├── 4_qualification_score.yaml
│   │       ├── 5_outreach_message.md
│   │       └── 5_outreach_brief.yaml
│   │
│   ├── 2025-02-01_vultr_ideas/
│   │   ├── run.yaml                    # Links to SPARC run
│   │   ├── decisions.md
│   │   └── artifacts/
│   │       ├── 1_contract_summary.yaml
│   │       ├── 1_research_agenda.yaml
│   │       ├── 2_hypothesis_h1.yaml
│   │       ├── 3_evaluation_h1.yaml
│   │       ├── 4_deliverable_report.md
│   │       └── 5_delivery_log.yaml
│   │
│   └── 2025-01-20_streamdata_sparc/
│       └── ...
│
├── nurture/                            # Prospects in nurture state
│   └── cloudscale.yaml
│
└── passed/                             # Archived pass records
    └── acme.yaml
```

### Run Naming Convention

```
YYYY-MM-DD_[entity-slug]_[type]
```

- **Date**: Run start date
- **Entity**: Prospect (SPARC) or client (IDEAS) name, lowercase with hyphens
- **Type**: `sparc` or `ideas`

Examples:
- `2025-01-15_vultr_sparc`
- `2025-02-01_vultr_ideas`
- `2025-01-20_streamdata_sparc`

### Artifact Numbering

Prefix artifacts with stage number to maintain execution order:

| Stage | SPARC Artifacts | IDEAS Artifacts |
|-------|-----------------|-----------------|
| 1 | `1_signal_log.yaml` | `1_contract_summary.yaml`, `1_research_agenda.yaml` |
| 2 | `2_company_profile.yaml` | `2_hypothesis_[id].yaml` |
| 3 | `3_prospect_analysis.yaml` | `3_evaluation_[id].yaml` |
| 4 | `4_qualification_score.yaml` | `4_deliverable_[id].md` |
| 5 | `5_outreach_message.md`, `5_outreach_brief.yaml` | `5_delivery_log.yaml` |

For single deliverables, use `report` as the id (for example, `4_deliverable_report.md`).

### Starting a Run

When beginning a new SPARC or IDEAS execution:

1. Create run directory: `praxis/runs/YYYY-MM-DD_entity_type/`
2. Initialize `run.yaml` with metadata
3. Create empty `decisions.md`
4. Create `artifacts/` directory

### During Execution

At each stage completion:

1. Save artifact to `artifacts/` with appropriate prefix
2. Append decision entry to `decisions.md`
3. Update `run.yaml` with current stage

### Completing a Run

When run finishes:

1. Update `run.yaml` status to `completed`
2. Set outcome (`signed_agreement`, `nurture`, `pass`, etc.)
3. For nurture/pass outcomes, copy record to `nurture/` or `passed/`

### Linking Runs

When an IDEAS run follows a SPARC run, link them via `linked_run` in `run.yaml`. This enables:
- Tracing client engagements back to acquisition
- Referencing SPARC artifacts from IDEAS stages

See [Templates.md](../implementation/Templates.md#run-templates) for `run.yaml` and `decisions.md` templates.

---

## Quality Gates

Each stage has quality criteria that must be met before approval:

### Verification

Before approving stage output, confirm:
- All required outputs produced
- Quality criteria checklist passed
- Outputs ready for next stage consumption

### Common Issues

| Issue | Resolution |
|-------|------------|
| Missing data | Note gaps, proceed with caveats or return to prior stage |
| Conflicting information | Resolve via clarification menu or document uncertainty |
| Quality criteria not met | Revise outputs before approval |
| Scope creep | Defer items to future or separate engagement |

---

## Tips

### Starting Fresh

Begin with `/signal` and work through SPARC sequentially. This builds context and ensures each stage has proper inputs.

### Resuming Work

If continuing from a prior session:
1. Review where you left off
2. Provide relevant prior outputs as context
3. Run the appropriate stage skill

### Parallel Prospects

For multiple prospects in SPARC:
- Run Signal once to generate full log
- Profile hot prospects in sequence or batch
- Analyze and Rank together for comparison
- Craft individually for personalization

### Multiple Engagements

For concurrent IDEAS engagements:
- Keep separate document folders per client
- Run stages independently per engagement
- Track status per engagement
