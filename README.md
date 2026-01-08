# PRAXIS

A framework for research consulting client acquisition.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── docs/                      # Framework documentation
│   ├── PRAXIS.md              # Integration layer, lifecycle, metrics
│   ├── Execution.md           # How to run stages
│   ├── Configuration.md       # Configuration inputs
│   └── templates/             # Artifact templates
│
├── methodology/               # Methodology definitions
│   ├── TEMPLATE.md            # Template for creating new methodologies
│   ├── identity/              # Professional identity
│   │   ├── methodology.md     # Identity methodology
│   │   └── SKILL.md           # Identity skill
│   └── sparc/                 # Client acquisition
│       ├── methodology.md     # SPARC methodology
│       ├── signal/SKILL.md
│       ├── profile/SKILL.md
│       ├── analyze/SKILL.md
│       ├── rank/SKILL.md
│       └── craft/SKILL.md
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

## Usage

First, define your professional identity:
- `/identity` (run once to initialize, update when positioning shifts)

Run SPARC stages for client acquisition:
- `/signal` → `/profile` → `/analyze` → `/rank` → `/craft`

Each stage requires approval before proceeding to the next.

## Getting Started

Start with [docs/PRAXIS.md](docs/PRAXIS.md) for the complete overview.
