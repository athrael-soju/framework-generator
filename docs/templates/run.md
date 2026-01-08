# Run Templates

Templates for tracking PRAXIS pipeline execution. Used by both SPARC and IDEAS runs.

---

## run.yaml

Metadata file created at run start, updated throughout execution.

> **Note:** `run.yaml` remains YAML because it's machine-read state data, not a human-reviewed artifact. It tracks run status programmatically.

### SPARC Example

```yaml
# Run metadata
id: 2025-01-15_vultr_sparc
type: sparc                             # sparc | ideas
entity: vultr                           # Prospect or client slug
status: active                          # active | completed | aborted

# Timestamps
created: 2025-01-15T09:00:00Z
updated: 2025-01-15T14:30:00Z
completed:                              # Set when status changes to completed

# Progress
current_stage: profile                  # Last completed or in-progress stage
stages_completed:
  - signal
  - profile

# Outcome (set on completion)
outcome:                                # signed_agreement | nurture | pass | delivered | aborted
outcome_details:                        # Brief explanation

# Linking
linked_run:                             # For IDEAS: reference to SPARC run ID
referral_source:                        # If this run came from a referral

# Notes
notes: |
  Free-form notes about the run.
  CMO responded quickly, good engagement.
```

### IDEAS Example (with link to SPARC)

```yaml
id: 2025-02-01_vultr_ideas
type: ideas
entity: vultr
status: active

created: 2025-02-01T10:00:00Z
updated: 2025-02-15T16:00:00Z
completed:

current_stage: evaluate
stages_completed:
  - identify
  - develop

outcome:
outcome_details:

linked_run: 2025-01-15_vultr_sparc      # Reference to acquisition run
referral_source:

notes: |
  Research engagement following successful SPARC acquisition.
  Focus on AI retrieval benchmarking per contract.
```

---

## decisions.md

Decision log capturing choices made at each stage. This is human-readable documentation of the reasoning behind each stage transition.

### Template

```markdown
# Decisions: [Entity Name]

Run: `[run-id]`
Type: SPARC / IDEAS
Started: [date]

---

## Signal - [date]

**Decision Point:** [What triggered a decision]

**Options Considered:**
1. [Option A]
2. [Option B]
3. [Option C]

**Decision:** [Which option was chosen]
**Rationale:** [Why this decision was made]
**Artifacts:** `artifacts/1_signal_[date]/`

---

## Profile - [date]

**Decision Point:** [What triggered a decision]

**Options Considered:**
1. [Option A]
2. [Option B]

**Decision:** [Which option was chosen]
**Rationale:** [Why this decision was made]
**Artifacts:** `artifacts/2_profile_[date]/`

---

## [Stage] - [date]

...

---

## Run Outcome - [date]

**Final Status:** completed / aborted
**Outcome:** signed_agreement / nurture / pass / delivered
**Summary:** [Brief summary of the run result]
**Next Steps:** [What happens next, if anything]
```

### Worked Example

```markdown
# Decisions: Vultr

Run: `2025-01-15_vultr_sparc`
Type: SPARC
Started: 2025-01-15

---

## Signal - 2025-01-15

**Decision Point:** Multiple hot signals detected for same company

**Options Considered:**
1. Prioritize by funding signal (strongest budget indicator)
2. Prioritize by hiring signal (strongest timing indicator)
3. Weight all signals equally

**Decision:** Prioritize by funding signal
**Rationale:** $333M funding round indicates immediate budget availability and strategic investment in growth areas matching our positioning.
**Artifacts:** `artifacts/1_signal_2025-01-15/`

---

## Profile - 2025-01-16

**Decision Point:** Incomplete data for community presence

**Options Considered:**
1. Continue with gaps noted
2. Return to Signal for more monitoring
3. Request manual research input

**Decision:** Continue with gaps noted
**Rationale:** Sufficient data exists for competitive analysis. Community gap is itself a finding that supports our value proposition.
**Artifacts:** `artifacts/2_profile_2025-01-16/`

---

## Analyze - 2025-01-17

**Decision Point:** Competitor set selection

**Options Considered:**
1. Include only direct competitors (DigitalOcean, Linode)
2. Include adjacent competitors (AWS, GCP at lower tier)
3. Include emerging competitors (Hetzner, OVHcloud)

**Decision:** Include direct + emerging competitors
**Rationale:** Direct competitors show clear gaps we can address. Emerging competitors reveal market positioning opportunities.
**Artifacts:** `artifacts/3_analyze_2025-01-17/`

---

## Rank - 2025-01-18

**Decision Point:** Stage completion approval

**Options Considered:**
1. Approve - proceed to Craft
2. Edit - adjust scoring
3. Retry - re-evaluate with different weights

**Decision:** Approve
**Rationale:** Score of 4.8 clearly qualifies for Prioritize tier. All criteria scored with strong evidence.
**Artifacts:** `artifacts/4_rank_2025-01-18/`

---

## Craft - 2025-01-19

**Decision Point:** Channel selection

**Options Considered:**
1. LinkedIn DM (CMO active on platform)
2. Email (more formal, detailed)
3. Warm intro (check for mutual connections)

**Decision:** LinkedIn DM
**Rationale:** CMO actively posts about developer experience; DM allows casual tone and quick response. Can escalate to email if no response.
**Artifacts:** `artifacts/5_craft_2025-01-19/`

---

## Run Outcome - 2025-01-22

**Final Status:** completed
**Outcome:** signed_agreement
**Summary:** CMO responded within 24 hours. Discovery call on 2025-01-20, proposal sent same day, agreement signed 2025-01-22. $15K/month research retainer.
**Next Steps:** Initiate IDEAS run for research delivery.
```
