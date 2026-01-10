# Framework Generator

A tool for creating structured, repeatable frameworks with executable skills.

## Structure

```
├── docs/
│   ├── overview.md           # Project overview
│   ├── model.md              # Framework Generator model
│   └── execution.md          # How to run stages
│
├── .claude/skills/
│   ├── frame/                # Define purpose and boundaries
│   ├── organize/             # Map stages and flow
│   ├── refine/               # Specify each stage
│   ├── generate/             # Produce framework files
│   └── evaluate/             # Validate and iterate
│
├── output/                   # Run outputs
│   └── {date}/{name}/        # Per-framework run folder
│       ├── run.md            # Progress tracking + decisions
│       ├── 1-frame/          # Charter
│       ├── 2-organize/       # Stage map
│       ├── 3-refine/         # Stage specs
│       ├── 4-generate/       # Generated framework (portable)
│       └── 5-evaluate/       # Validation report
│
├── CLAUDE.md
└── README.md
```

## Stages

| Stage | Purpose | Output |
|-------|---------|--------|
| Frame | Define purpose and boundaries | Framework charter |
| Organize | Map stages and flow | Stage map |
| Refine | Specify each stage in detail | Stage specifications |
| Generate | Produce documentation and skills | Framework files |
| Evaluate | Validate and iterate | Validation report |

## Usage

Run stages in sequence:

```
/frame → /organize → /refine → /generate → /evaluate
```

Each stage requires approval before proceeding.

## Getting Started

See [docs/overview.md](docs/overview.md) for the complete overview.
