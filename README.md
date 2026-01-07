# PRAXIS

A complete framework for research consulting: from finding clients to delivering value.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── framework/           # The PRAXIS framework
│   └── PRAXIS.md        # Integration layer, lifecycle, metrics
│
├── methodologies/       # Identity, SPARC, and IDEAS methodologies
│   ├── Identity.md      # Professional identity
│   ├── SPARC.md         # Client acquisition
│   └── IDEAS.md         # Research delivery
│
├── skills/              # Skill overview documentation
│   ├── Identity.md      # Overview of Identity skill
│   ├── SPARC.md         # Overview of SPARC skills (links to SKILL.md files)
│   └── IDEAS.md         # Overview of IDEAS skills (links to SKILL.md files)
│
├── architecture/        # Execution patterns
│   └── Execution.md     # How to run stages
│
├── implementation/      # Usage and examples
│   ├── Examples.md      # Worked scenarios
│   ├── Configuration.md # Configuration inputs
│   └── templates/       # Artifact templates
│       ├── identity.md  # Identity profile template
│       ├── sparc.md     # SPARC stage outputs
│       ├── ideas.md     # IDEAS stage outputs
│       └── run.md       # Run tracking templates
│
└── .claude/skills/      # Executable skill definitions (invoked via /command)
    ├── identity/SKILL.md    # Identity: Define professional profile
    ├── signal/SKILL.md      # SPARC: Detect and score signals
    ├── profile/SKILL.md     # SPARC: Build company profiles
    ├── analyze/SKILL.md     # SPARC: Assess competitive position
    ├── rank/SKILL.md        # SPARC: Score and prioritize prospects
    ├── craft/SKILL.md       # SPARC: Create personalized outreach
    ├── identify/SKILL.md    # IDEAS: Define research opportunities
    ├── develop/SKILL.md     # IDEAS: Formalize hypotheses
    ├── evaluate/SKILL.md    # IDEAS: Test hypotheses
    ├── articulate/SKILL.md  # IDEAS: Create deliverables
    └── share/SKILL.md       # IDEAS: Deliver and disseminate
```

## Methodologies

| Methodology | Purpose | Stages |
|-------------|---------|--------|
| **Identity** | Professional identity | Single assessment |
| **SPARC** | Client acquisition | Signal - Profile - Analyze - Rank - Craft |
| **IDEAS** | Research delivery | Identify - Develop - Evaluate - Articulate - Share |

## Usage

First, define your professional identity:
- `/identity` (run once to initialize, update when positioning shifts)

Run SPARC stages for client acquisition:
- `/signal` → `/profile` → `/analyze` → `/rank` → `/craft`

Run IDEAS stages for research delivery:
- `/identify` → `/develop` → `/evaluate` → `/articulate` → `/share`

Each stage requires approval before proceeding to the next.

## Getting Started

Start with [framework/PRAXIS.md](framework/PRAXIS.md) for the complete overview.
