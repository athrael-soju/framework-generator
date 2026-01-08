# PRAXIS

A framework for research consulting client acquisition.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── docs/
│   ├── overview.md           # Framework overview
│   ├── execution.md          # How to run stages
│   ├── configuration.md      # Configuration inputs
│   ├── identity.md           # Identity methodology
│   ├── sparc.md              # SPARC methodology
│   └── run.md                # Run tracking templates
│
├── .claude/
│   └── skills/
│       ├── identity/
│       │   ├── SKILL.md
│       │   └── templates.md
│       └── sparc/
│           ├── templates.md
│           ├── signal/SKILL.md
│           ├── profile/SKILL.md
│           ├── analyze/SKILL.md
│           ├── rank/SKILL.md
│           └── craft/SKILL.md
│
├── CLAUDE.md
└── README.md
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

Start with [docs/overview.md](docs/overview.md) for the complete overview.
