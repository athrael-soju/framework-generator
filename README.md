# PRAXIS

A complete framework for research consulting: from finding clients to delivering value.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── docs/                      # Framework documentation
│   ├── PRAXIS.md              # Integration layer, lifecycle, metrics
│   ├── Execution.md           # How to run stages
│   ├── Examples.md            # Worked scenarios
│   ├── Configuration.md       # Configuration inputs
│   └── templates/             # Artifact templates
│
├── methodology/               # Methodology definitions
│   ├── TEMPLATE.md            # Template for creating new methodologies
│   ├── identity/              # Professional identity
│   │   ├── methodology.md     # Identity methodology
│   │   └── SKILL.md           # Identity skill
│   ├── sparc/                 # Client acquisition
│   │   ├── methodology.md     # SPARC methodology
│   │   ├── signal/SKILL.md
│   │   ├── profile/SKILL.md
│   │   ├── analyze/SKILL.md
│   │   ├── rank/SKILL.md
│   │   └── craft/SKILL.md
│   └── ideas/                 # Research delivery
│       ├── methodology.md     # IDEAS methodology
│       ├── identify/SKILL.md
│       ├── develop/SKILL.md
│       ├── evaluate/SKILL.md
│       ├── articulate/SKILL.md
│       └── share/SKILL.md
│
└── .claude/skills/            # Symlinks to methodology skills
    ├── identity -> ../../methodology/identity
    ├── signal -> ../../methodology/sparc/signal
    └── ... (all stage symlinks)
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

Start with [docs/PRAXIS.md](docs/PRAXIS.md) for the complete overview.
