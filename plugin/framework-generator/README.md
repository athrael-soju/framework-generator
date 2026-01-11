# Framework Generator Plugin

A Claude Code plugin for creating structured, repeatable frameworks with executable skills through staged refinement.

## Installation

```bash
claude plugins install /path/to/framework-generator
```

Or copy to your plugins directory:

```bash
cp -r framework-generator ~/.claude/plugins/
```

## Commands

| Command | Description |
|---------|-------------|
| `/framework-auto <name> [options]` | Run all stages with configurable automation |
| `/frame <name> [--config file]` | Define framework purpose and boundaries |
| `/organize <name> [--config file]` | Map stages and flow |
| `/refine <name> [--config file]` | Specify each stage in detail |
| `/generate <name> [--config file]` | Produce documentation and skill files |
| `/evaluate <name> [--config file]` | Validate and iterate |
| `/help` | Show command help |

## Workflow

```
┌─────────┐    ┌──────────┐    ┌────────┐    ┌──────────┐    ┌──────────┐
│  Frame  │───▶│ Organize │───▶│ Refine │───▶│ Generate │───▶│ Evaluate │
└─────────┘    └──────────┘    └────────┘    └──────────┘    └──────────┘
     ▲                                                            │
     └────────────────── feedback loops ──────────────────────────┘
```

## Quick Start

### 1. Start a new framework

```
/frame my-workflow
```

You'll be asked about:
- What workflow needs systematizing
- Domain, constraints, intended users
- Scope boundaries

**Output:** Framework charter in `output/{date}/my-workflow/1-frame/charter.md`

### 2. Organize the stages

```
/organize my-workflow
```

Define:
- Major phases of work (3-7 stages)
- How stages connect
- Feedback loops and terminal states

**Output:** Stage map in `output/{date}/my-workflow/2-organize/stage-map.md`

### 3. Refine each stage

```
/refine my-workflow
```

For each stage, specify:
- Activities with inputs/outputs
- Context tables (criteria, categories)
- Output templates
- Quality criteria

**Output:** Stage specs in `output/{date}/my-workflow/3-refine/{stage}-spec.md`

### 4. Generate artifacts

```
/generate my-workflow
```

Produces:
- Framework documentation
- Execution guide
- Skill files for each stage
- README and CLAUDE.md

**Output:** Complete framework in `output/{date}/my-workflow/4-generate/`

### 5. Evaluate and iterate

```
/evaluate my-workflow
```

Validates:
- Convention compliance
- Completeness
- Consistency
- Dry run of first stage

**Output:** Validation report in `output/{date}/my-workflow/5-evaluate/validation.md`

## Automation (Hybrid Mode)

The plugin supports configurable automation via YAML config files.

### Automation Levels

| Mode | Command | Human Touchpoints |
|------|---------|-------------------|
| **Interactive** | `/frame my-framework` | 5 (all stages) |
| **Config-assisted** | `/frame my-framework --config base.yaml` | Gaps only |
| **Breakpoint** | `/framework-auto my-framework --config full.yaml --break-at evaluate` | 1 |
| **Fully automated** | `/framework-auto my-framework --config full.yaml --approve-all` | 0 |

### Using Config Files

Create a config file from the template:

```bash
cp templates/config-template.yaml my-framework-config.yaml
```

Run with config:

```bash
# Single stage with config
/frame my-framework --config my-framework-config.yaml

# All stages automated
/framework-auto my-framework --config my-framework-config.yaml --approve-all

# Automated with review at end
/framework-auto my-framework --config my-framework-config.yaml --break-at evaluate
```

### Config Structure

```yaml
name: my-framework

frame:
  problem: "What problem this solves"
  domain: "Domain area"
  users: ["user1", "user2"]
  scope:
    in: ["included"]
    out: ["excluded"]

organize:
  pattern: linear
  stages:
    - name: Stage1
      purpose: "Purpose"
    - name: Stage2
      purpose: "Purpose"

refine:
  Stage1:
    activities:
      - name: "Activity"
        inputs: ["input"]
        outputs: ["output"]
    criteria:
      - "Quality check"

options:
  approve_all: false
  break_at: [evaluate]
  on_error: stop
```

### Config Completeness

| Config Level | Behavior |
|--------------|----------|
| **Full** (all sections) | Auto-run all stages |
| **Partial** (some sections) | Auto-run known, prompt for gaps |
| **Skeleton** (structure only) | Use as starting point |
| **None** | Fully interactive |

## Output Structure

```
output/{date}/{framework-name}/
├── run.md                          # Progress tracking
├── 1-frame/
│   └── charter.md                  # Framework charter
├── 2-organize/
│   └── stage-map.md                # Stage map with flow diagram
├── 3-refine/
│   └── {stage}-spec.md             # Stage specifications
├── 4-generate/
│   ├── README.md                   # Framework overview
│   ├── CLAUDE.md                   # AI instructions
│   ├── docs/
│   │   ├── {name}.md               # Framework documentation
│   │   └── execution.md            # How to run stages
│   └── .claude/skills/
│       └── {stage}/SKILL.md        # Executable skills
└── 5-evaluate/
    └── validation.md               # Validation report
```

## Principles

### Human-in-the-Loop
Every stage requires approval before proceeding. This ensures:
- User maintains control over design decisions
- Quality gates prevent cascading errors
- Feedback can be incorporated early

### Quality Criteria
Each stage has explicit checklists:
- Verifiable criteria (not vague prose)
- Coverage of completeness and correctness
- Clear pass/fail determination

### Feedback Loops
Built-in iteration paths:
- Evaluate → Refine (specification gaps)
- Evaluate → Organize (structural issues)
- Evaluate → Frame (scope problems)

### Self-Contained Skills
Generated skill files include everything needed:
- No external document references
- Embedded output templates
- Complete process instructions

## Framework Types

| Type | Pattern | Example |
|------|---------|---------|
| Foundation | Single assessment, run once | Initial analysis |
| Pipeline | Sequential stages, ongoing | Feature development |
| Cyclical | Repeating on cadence | Weekly reviews |
| Hub | Central stage, others connect | Decision framework |

## Comparison with Skills

This plugin can be used to create frameworks that themselves contain skills:

```
Plugin (commands) → Creates → Framework (with skills)
     /frame                       /stage-1
     /organize                    /stage-2
     /refine                      /stage-3
     /generate
     /evaluate
```

## License

MIT
