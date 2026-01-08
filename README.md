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
│   ├── identity.md           # Identity model
│   ├── sparc.md              # SPARC model
│   └── run.md                # Run tracking templates
│
├── .claude/
│   └── skills/
│       ├── identity/
│       │   ├── SKILL.md
│       │   └── template.md
│       ├── signal/
│       │   ├── SKILL.md
│       │   └── template.md
│       ├── profile/
│       │   ├── SKILL.md
│       │   └── template.md
│       ├── analyze/
│       │   ├── SKILL.md
│       │   └── template.md
│       ├── rank/
│       │   ├── SKILL.md
│       │   └── template.md
│       └── craft/
│           ├── SKILL.md
│           └── template.md
│
├── CLAUDE.md
└── README.md
```

## Models

| Model | Purpose | Stages |
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
