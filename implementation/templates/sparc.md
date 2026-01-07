# SPARC Templates

Artifact templates for SPARC stage outputs: Signal → Profile → Analyze → Rank → Craft.

---

## Signal Log Entry

```yaml
date: YYYY-MM-DD
company: Company Name
signal_type: funding | hiring | announcement | social | technical
source: Source Name
url: https://...
strength: hot | warm | watch
notes: Brief context
```

---

## Company Profile

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

---

## Prospect Analysis Report

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

---

## Competitor Matrix

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

---

## Qualification Score

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

---

## Outreach Brief

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
