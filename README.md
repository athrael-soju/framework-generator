# PRAXIS

A complete framework for research consulting: from finding clients to delivering value.

**PRAXIS** = Practice + Axis - the central axis around which your consulting practice operates.

## Structure

```
PRAXIS/
├── framework/           # The PRAXIS framework
│   └── PRAXIS.md        # Integration layer, lifecycle, metrics
│
├── methodologies/       # SPARC and IDEAS methodologies
│   ├── SPARC.md         # Client acquisition
│   └── IDEAS.md         # Research delivery
│
├── skills/              # Stage-level skill definitions
│   ├── SPARC.md         # Skills for SPARC stages
│   └── IDEAS.md         # Skills for IDEAS stages
│
├── architecture/        # Execution patterns
│   └── Execution.md     # How to run stages
│
├── implementation/      # Usage and examples
│   ├── Examples.md      # Worked scenarios
│   ├── Templates.md     # Artifact templates
│   └── Configuration.md # Configuration inputs
│
└── .claude/skills/      # Individual stage skills (invoked via /command)
    ├── signal/          # SPARC stages
    ├── profile/
    ├── analyze/
    ├── rank/
    ├── craft/
    ├── identify/        # IDEAS stages
    ├── develop/
    ├── evaluate/
    ├── articulate/
    └── share/
```

## Methodologies

| Methodology | Purpose | Stages |
|-------------|---------|--------|
| **SPARC** | Client acquisition | Signal - Profile - Analyze - Rank - Craft |
| **IDEAS** | Research delivery | Identify - Develop - Evaluate - Articulate - Share |

## Usage

Run SPARC stages for client acquisition:
- `/signal` → `/profile` → `/analyze` → `/rank` → `/craft`

Run IDEAS stages for research delivery:
- `/identify` → `/develop` → `/evaluate` → `/articulate` → `/share`

Each stage requires approval before proceeding to the next.

## Getting Started

Start with [framework/PRAXIS.md](framework/PRAXIS.md) for the complete overview.
