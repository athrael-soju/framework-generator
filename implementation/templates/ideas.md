# IDEAS Templates

Artifact templates for IDEAS stage outputs: Identify → Develop → Evaluate → Articulate → Share.

---

## Opportunity Summary

```yaml
client:
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

---

## Hypothesis Document

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

---

## Prior Work Review

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

---

## Evaluation Report

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

---

## Client Deliverable

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

## Delivery Log

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
