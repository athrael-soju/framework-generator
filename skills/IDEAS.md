# IDEAS Skills

Stage-level skill definitions for IDEAS. Each skill defines the complete methodology for one stage.

For conceptual overview, see [IDEAS.md](../methodologies/IDEAS.md). For execution patterns, see [Execution.md](../architecture/Execution.md).

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
- **Inputs**: What the stage receives from prior stages or configuration
- **Process**: Step-by-step methodology with templates
- **Outputs**: What the stage produces
- **Decision Points**: Where user input is required
- **Quality Criteria**: Checklist before stage completion

---

## Skills Overview

| Skill | Command | Purpose | Details |
|-------|---------|---------|---------|
| Identify | `/identify` | Define research opportunities from client engagement | [SKILL.md](../.claude/skills/identify/SKILL.md) |
| Develop | `/develop` | Formalize hypotheses and define execution scope | [SKILL.md](../.claude/skills/develop/SKILL.md) |
| Evaluate | `/evaluate` | Test hypotheses through data collection and analysis | [SKILL.md](../.claude/skills/evaluate/SKILL.md) |
| Articulate | `/articulate` | Transform findings into actionable deliverables | [SKILL.md](../.claude/skills/articulate/SKILL.md) |
| Share | `/share` | Deliver and disseminate findings to stakeholders | [SKILL.md](../.claude/skills/share/SKILL.md) |

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

---

## Key Concepts

### Hypothesis Structure

Hypotheses follow a formal structure:
```
IF [intervention/condition]
THEN [expected outcome]
BECAUSE [mechanism/rationale]
MEASURABLE BY [metric/evidence]
```

See [develop/SKILL.md](../.claude/skills/develop/SKILL.md) for feasibility criteria and scope definition.

### Evidence Strength

Evidence is weighted by type:
- **Quantitative** (metrics, benchmarks): High strength
- **Qualitative** (interviews, reviews): Medium-High
- **Secondary research** (reports): Medium
- **Expert opinion**: Low-Medium
- **Anecdotal**: Low (illustration only)

See [evaluate/SKILL.md](../.claude/skills/evaluate/SKILL.md) for verdict criteria and QA checklist.

### Hypothesis Verdicts

| Verdict | Meaning |
|---------|---------|
| Strongly Supported | Multiple evidence types converge, meaningful effect |
| Supported | Evidence favors hypothesis, some limitations |
| Inconclusive | Mixed evidence, cannot determine |
| Not Supported | Evidence contradicts hypothesis |
| Refuted | Strong evidence against |

### Contribution Types

Findings are positioned by contribution type:
- **Novel Finding** — New insight not previously documented
- **Quantified Confirmation** — Evidence for suspected truth
- **Framework** — New way to organize thinking
- **Benchmark** — Comparison point for evaluation
- **Recommendation** — Actionable guidance

See [articulate/SKILL.md](../.claude/skills/articulate/SKILL.md) for audience targeting and roadmap creation.
