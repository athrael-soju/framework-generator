# The IDEAS Framework

A structured research methodology for client-focused research projects.
```mermaid
---
config:
  layout: dagre
  look: handDrawn
---
flowchart TB
    I["<b>Identify</b><br>• Client Contract Agreement<br>• Research Methodology<br>• Client Analysis Report"] --> D["<b>Develop</b><br>• Hypothesis Development<br>• Feasibility Assessment<br>• Prior Work Review<br>• Scope Definition"]
    D --> E["<b>Evaluate</b><br>• Data Collection &amp; Analysis<br>• Results Interpretation<br>• Problem-Fit Check<br>• Quality Assurance"]
    E --> A["<b>Articulate</b><br>• Contribution Positioning<br>• Audience Targeting<br>• Competitive Differentiation<br>• Implementation Roadmap"]
    A --> S["<b>Share</b><br>• Pre-print / Publication<br>• Prototype / Proof-of-Concept<br>• Client Deliverable<br>• Knowledge Transfer"]
    A -- weak novelty --> I
    A -- overclaiming results --> E
    E -- results don't support theory --> D
    E -- wrong problem --> I
    D -- idea not tractable --> I
    S -- peer review rejection --> E
    S -- implementation issues --> D
    S -- client feedback --> A
```

## Stages

### Identify
Establish the engagement foundation and research direction.
- **Client Contract Agreement** — Formalize scope, deliverables, and expectations
- **Research Methodology** — Define the approach (this framework)
- **Client Analysis Report** — Deep analysis identifying high-value research topics

### Develop
Transform identified opportunities into testable theories.
- **Hypothesis Development** — Refine research questions into specific claims
- **Feasibility Assessment** — Evaluate data availability, resources, and timeline
- **Prior Work Review** — Survey existing research and identify gaps
- **Scope Definition** — Set boundaries, assumptions, and limitations

### Evaluate
Test theoretical claims against evidence.
- **Data Collection & Analysis** — Gather and analyze evidence
- **Results Interpretation** — Assess support for hypotheses, effect sizes, alternatives
- **Problem-Fit Check** — Verify findings address actual client needs
- **Quality Assurance** — Ensure rigor, reproducibility, and documentation

### Articulate
Frame validated findings for maximum impact.
- **Contribution Positioning** — Define what's new vs. existing knowledge
- **Audience Targeting** — Tailor communication format and framing
- **Competitive Differentiation** — Establish unique value proposition
- **Implementation Roadmap** — Outline recommendations and next steps

### Share
Deliver outputs to relevant audiences.
- **Pre-print / Publication** — Academic dissemination
- **Prototype / Proof-of-Concept** — Technical demonstration
- **Client Deliverable** — Reports, presentations, recommendations
- **Knowledge Transfer** — Training and handoff

## Feedback Loops

The framework includes explicit failure modes that route back to earlier stages:

| From | Condition | To |
|------|-----------|-----|
| Develop | Idea not tractable | Identify |
| Evaluate | Wrong problem | Identify |
| Evaluate | Results don't support theory | Develop |
| Articulate | Weak novelty | Identify |
| Articulate | Overclaiming results | Evaluate |
| Share | Peer review rejection | Evaluate |
| Share | Implementation issues | Develop |
| Share | Client feedback | Articulate |