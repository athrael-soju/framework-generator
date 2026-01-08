# PRAXIS

A framework for research consulting client acquisition.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── docs/
│   ├── overview.md           # Framework overview
│   ├── models/
│   │   ├── identity.md       # Identity model
│   │   ├── sparc.md          # SPARC model
│   │   └── forge.md          # FORGE model
│   └── guides/
│       ├── execution.md      # How to run stages
│       ├── configuration.md  # Configuration inputs
│       └── run.md            # Run tracking
│
├── .claude/
│   └── skills/
│       ├── identity/         # Identity assessment
│       ├── signal/           # SPARC stages
│       ├── profile/
│       ├── analyze/
│       ├── rank/
│       ├── craft/
│       ├── frame/            # FORGE stages
│       ├── organize/
│       ├── refine/
│       ├── generate/
│       └── evaluate/
│
├── output/                   # Run outputs
│   ├── identity/
│   ├── sparc/
│   └── forge/
│
├── CLAUDE.md
└── README.md
```

## Models

| Model | Purpose | Stages |
|-------------|---------|--------|
| **Identity** | Professional identity | Single assessment |
| **SPARC** | Client acquisition | Signal → Profile → Analyze → Rank → Craft |
| **FORGE** | Model creation | Frame → Organize → Refine → Generate → Evaluate |

## Usage

First, define your professional identity:
- `/identity` (run once to initialize, update when positioning shifts)

Run SPARC stages for client acquisition:
- `/signal` → `/profile` → `/analyze` → `/rank` → `/craft`

Run FORGE to create new models:
- `/frame` → `/organize` → `/refine` → `/generate` → `/evaluate`

Each stage requires approval before proceeding to the next.

## Getting Started

Start with [docs/overview.md](docs/overview.md) for the complete overview.
