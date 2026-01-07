# PRAXIS Templates

Artifact templates for SPARC and IDEAS stage outputs.

See [Execution.md](../architecture/Execution.md#artifact-persistence) for the complete persistence structure.

---

## Stage Output Templates

### Signal Log Entry
```yaml
date: YYYY-MM-DD
company: Company Name
signal_type: funding | hiring | announcement | social | technical
source: Source Name
url: https://...
strength: hot | warm | watch
notes: Brief context
```

### Company Profile
```yaml
company:
  legal_name:
  dba:
  hq:
  founded:
  employees:
  funding_history:
    - round:
      amount:
      date:
      valuation:

market:
  vertical:
  competitors: []
  differentiation:

people:
  - name:
    title:
    notes:

technical:
  github:
  docs_quality:
  community:

recent_activity: []
```

### Qualification Score
```yaml
company:
date:
scores:
  budget: {score: , rationale: }
  problem_fit: {score: , rationale: }
  timing: {score: , rationale: }
  access: {score: , rationale: }
  strategic_value: {score: , rationale: }
total:
recommendation: prioritize | qualified | nurture | pass
```

### Hypothesis Document
```yaml
id:
opportunity:
statement:
  if:
  then:
  because:
  measurable_by:

prior_work: []

feasibility:
  data_availability: {score: , notes: }
  resources: {score: , notes: }
  timeline: {score: , notes: }
  skill_match: {score: , notes: }
  client_dependency: {score: , notes: }
  total:

scope:
  included: []
  excluded: []

risks: []
```

### Prospect Analysis Report
```yaml
company:
date:
analyst:

executive_summary: |
  [3 bullets: position, key gaps, opportunity]

competitive_position:
  leads_in: []
  lags_in: []
  market_perception:

gap_analysis:
  - gap:
    severity: critical | major | minor
    your_capability:
    opportunity: primary | secondary | none

entry_point:
  buyer_persona:
  budget_indicators:
  timing_assessment:
  access_path:

recommended_approach:
  value_proposition:
  supporting_evidence: []
  potential_objections: []
```

### Outreach Brief
```yaml
prospect:
date:
channel: linkedin_dm | email | warm_intro

decision_maker:
  name:
  title:
  linkedin:
  recent_activity: []

message:
  hook:
  insight:
  bridge:
  ask:

variants:
  - variant_id: 1
    hook:
    tone:

talking_points:
  likely_questions:
    - question:
      response:
  objection_handling:
    - objection:
      response:
```

### Evaluation Report
```yaml
hypothesis_id:
date:

evidence_collected:
  - source:
    type: quantitative | qualitative | secondary | expert | anecdotal
    finding:
    direction: supports | contradicts | neutral

verdict: strongly_supported | supported | inconclusive | not_supported | refuted
confidence: high | medium | low

rationale: |
  [Summary of evidence assessment]

alternatives_considered:
  - alternative:
    why_ruled_out:

limitations: []

problem_fit: high | medium | low
problem_fit_rationale:
```

### Prior Work Review
```yaml
opportunity_id:
date:

seminal_work:
  - citation:
    contribution:
    relevance:

recent_work:
  - citation:
    contribution:
    relevance:

established_findings:
  - finding:
    confidence: high | medium | low

open_questions:
  - question:
    tractability: high | medium | low

methodological_approaches:
  - approach:
    when_to_use:
    limitations:

gap_addressed: |
  [How this research extends existing knowledge]
```

### Competitor Matrix
```yaml
prospect:
date:

competitors:
  - name:
    type: direct | indirect | adjacent | emerging

dimensions:
  - name: documentation_depth
    prospect_score:
    competitor_scores:
      - competitor:
        score:
    gap: # prospect - competitor average

  - name: community_size
    prospect_score:
    competitor_scores:
      - competitor:
        score:
    gap:

summary:
  leads_in: []
  lags_in: []
  biggest_gaps: []
```

### Opportunity Summary
```yaml
prospect:
date:

opportunities:
  - id:
    name:
    gap_reference:
    research_direction:
    your_capability:
    feasibility: proceed | caution | blocked
    priority: high | medium | low
    rationale:

prioritization_factors:
  client_value: # 40%
  feasibility: # 30%
  timeline_fit: # 20%
  strategic_value: # 10%

selected:
  - opportunity_id:
    allocation: # portion of engagement

deferred:
  - opportunity_id:
    reason:
```

### Delivery Log
```yaml
engagement:
date:

deliveries:
  - deliverable:
    channel: presentation | report | workshop | documentation
    recipients: []
    timestamp:
    access_url:
    confirmation: received | pending

feedback_log:
  - source:
    category: clarification | scope_concern | disagreement | implementation | new_direction
    content:
    action_taken:
    status: resolved | pending | deferred

handoff_materials:
  - type: executive_summary | technical_docs | how_to_guide | data | faq
    location:
    recipient:

knowledge_transfer:
  - activity: walkthrough | qa_session | documentation_handoff
    date:
    attendees: []
    notes:

engagement_closure:
  final_deliverables_confirmed: true | false
  feedback_collected: true | false
  knowledge_transferred: true | false
  admin_complete: true | false

follow_up:
  follow_on_opportunities: []
  re_engagement_triggers: []
  referral_requested: true | false
  referral_received:
```

### Client Deliverable
```markdown
# [Deliverable Title]

## Metadata
- Engagement:
- Deliverable ID:
- Date:
- Version:
- Audience: executive | technical | marketing | board
- Format: report | presentation | workshop | documentation

## Executive Summary
- Key Findings:
- Recommendations:
- Immediate Actions:

## Sections
### [Section Title]
[Content summary]

## Recommendations
| ID | Title | Priority | Effort | Rationale | Success Metrics |
|----|-------|----------|--------|-----------|----------------|
| R1 |       | high | low |           |                |

## Roadmap
### Quick Wins
- [Action] - [Expected outcome]

### Phase 1: [Name]
- Timeline:
- Actions:
- Milestone:

### Phase 2: [Name]
- Timeline:
- Actions:
- Milestone:

## Appendices
- [Appendix item]
```

---

## Run Templates

### run.yaml

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

### run.yaml (IDEAS example with link)

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

### decisions.md

```markdown
# Decisions: [Entity Name]

Run: `[run-id]`
Type: [SPARC | IDEAS]
Started: [date]

---

## Signal — [date]

**Decision Point:** [What triggered a decision]
**Options Presented:**
1. [Option A]
2. [Option B]
3. [Option C]

**Decision:** [Which option was chosen]
**Rationale:** [Why this decision was made]
**Artifact:** `artifacts/1_signal_log.yaml`

---

## Profile — [date]

**Decision Point:** [What triggered a decision]
**Options Presented:**
1. [Option A]
2. [Option B]

**Decision:** [Which option was chosen]
**Rationale:** [Why this decision was made]
**Artifact:** `artifacts/2_company_profile.yaml`

---

## [Stage] — [date]

...

---

## Run Outcome — [date]

**Final Status:** [completed | aborted]
**Outcome:** [signed_agreement | nurture | pass | delivered]
**Summary:** [Brief summary of the run result]
**Next Steps:** [What happens next, if anything]
```

### decisions.md (worked example)

```markdown
# Decisions: Vultr

Run: `2025-01-15_vultr_sparc`
Type: SPARC
Started: 2025-01-15

---

## Signal — 2025-01-15

**Decision Point:** Multiple hot signals detected for same company
**Options Presented:**
1. Prioritize by funding signal (strongest budget indicator)
2. Prioritize by hiring signal (strongest timing indicator)
3. Weight all signals equally

**Decision:** Prioritize by funding signal
**Rationale:** $333M funding round indicates immediate budget availability and strategic investment in growth areas matching our positioning.
**Artifact:** `artifacts/1_signal_log.yaml`

---

## Profile — 2025-01-16

**Decision Point:** Incomplete data for community presence
**Options Presented:**
1. Continue with gaps noted
2. Return to Signal for more monitoring
3. Request manual research input

**Decision:** Continue with gaps noted
**Rationale:** Sufficient data exists for competitive analysis. Community gap is itself a finding that supports our value proposition.
**Artifact:** `artifacts/2_company_profile.yaml`

---

## Analyze — 2025-01-17

**Decision Point:** Competitor set selection
**Options Presented:**
1. Include only direct competitors (DigitalOcean, Linode)
2. Include adjacent competitors (AWS, GCP at lower tier)
3. Include emerging competitors (Hetzner, OVHcloud)

**Decision:** Include direct + emerging competitors
**Rationale:** Direct competitors show clear gaps we can address. Emerging competitors reveal market positioning opportunities.
**Artifact:** `artifacts/3_prospect_analysis.yaml`

---

## Rank — 2025-01-18

**Decision Point:** Stage completion approval
**Options Presented:**
1. Approve — proceed to Craft
2. Edit — adjust scoring
3. Retry — re-evaluate with different weights

**Decision:** Approve
**Rationale:** Score of 4.8 clearly qualifies for Prioritize tier. All criteria scored with strong evidence.
**Artifact:** `artifacts/4_qualification_score.yaml`

---

## Craft — 2025-01-19

**Decision Point:** Channel selection
**Options Presented:**
1. LinkedIn DM (CMO active on platform)
2. Email (more formal, detailed)
3. Warm intro (check for mutual connections)

**Decision:** LinkedIn DM
**Rationale:** CMO actively posts about developer experience; DM allows casual tone and quick response. Can escalate to email if no response.
**Artifacts:** `artifacts/5_outreach_message.md`, `artifacts/5_outreach_brief.yaml`

---

## Run Outcome — 2025-01-22

**Final Status:** completed
**Outcome:** signed_agreement
**Summary:** CMO responded within 24 hours. Discovery call on 2025-01-20, proposal sent same day, agreement signed 2025-01-22. $15K/month research retainer.
**Next Steps:** Initiate IDEAS run for research delivery.
```
