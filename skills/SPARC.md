# SPARC Skills

Stage-level skill definitions for SPARC. Each skill defines the complete methodology for one stage.

For conceptual overview, see [SPARC.md](../methodologies/SPARC.md). For execution patterns, see [Execution.md](../architecture/Execution.md).

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
- **Inputs**: What the stage receives from prior stages or configuration
- **Process**: Step-by-step methodology with templates
- **Outputs**: What the stage produces
- **Decision Points**: Where user input is required
- **Quality Criteria**: Checklist before stage completion

---

## Skills Overview

| Skill | Command | Purpose | Details |
|-------|---------|---------|---------|
| Signal | `/signal` | Detect and score prospect signals | [SKILL.md](../.claude/skills/signal/SKILL.md) |
| Profile | `/profile` | Build comprehensive company profiles | [SKILL.md](../.claude/skills/profile/SKILL.md) |
| Analyze | `/analyze` | Assess competitive position and opportunities | [SKILL.md](../.claude/skills/analyze/SKILL.md) |
| Rank | `/rank` | Score and prioritize prospects | [SKILL.md](../.claude/skills/rank/SKILL.md) |
| Craft | `/craft` | Create personalized outreach | [SKILL.md](../.claude/skills/craft/SKILL.md) |

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

---

## Key Concepts

### Signal Scoring

Signals are scored into tiers based on strength and recency:
- **Hot**: Multiple strong signals, recent timing (immediate action)
- **Warm**: Single strong or multiple moderate signals (action within week)
- **Watch**: Weak signals, early indicators (monitor)

See [signal/SKILL.md](../.claude/skills/signal/SKILL.md) for scoring criteria and combination bonuses.

### Qualification Scoring

Prospects are scored on weighted criteria:
- Budget Indicators (25%)
- Problem Fit (25%)
- Timing (20%)
- Access (15%)
- Strategic Value (15%)

Thresholds: 4.0+ Prioritize, 3.0-3.9 Qualified, 2.0-2.9 Nurture, <2.0 Pass.

See [rank/SKILL.md](../.claude/skills/rank/SKILL.md) for the detailed 1/3/5 scoring rubric.

### Outreach Structure

Messages follow a four-part structure:
1. **Hook** - Reference specific signal or their content
2. **Insight** - Non-obvious observation from analysis
3. **Bridge** - Connect gap to your capability
4. **Ask** - Low-commitment next step

See [craft/SKILL.md](../.claude/skills/craft/SKILL.md) for channel guidelines and anti-patterns.
