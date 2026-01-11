# Framework Generator

A Claude Code plugin for creating structured, repeatable frameworks with executable skills through staged refinement.

## Installation

```bash
claude plugins install /path/to/this-repo
```

Or copy the repo to your plugins directory:

```bash
cp -r /path/to/this-repo ~/.claude/plugins/framework-generator
```

## Commands

| Command | Description |
|---------|-------------|
| `/framework-generator:frame <name>` | Define framework purpose and boundaries |
| `/framework-generator:organize <name>` | Map stages and flow |
| `/framework-generator:refine <name>` | Specify each stage in detail |
| `/framework-generator:generate <name>` | Produce framework plugin with command files |
| `/framework-generator:evaluate <name>` | Validate and iterate |
| `/framework-generator:help` | Show command help |

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
/framework-generator:frame my-workflow
```

You'll be asked about:
- What workflow needs systematizing
- Domain, constraints, intended users
- Scope boundaries

**Output:** Framework charter in `output/{date}/my-workflow/1-frame/charter.md`

### 2. Organize the stages

```
/framework-generator:organize my-workflow
```

Define:
- Major phases of work (3-7 stages)
- How stages connect
- Feedback loops and terminal states

**Output:** Stage map in `output/{date}/my-workflow/2-organize/stage-map.md`

### 3. Refine each stage

```
/framework-generator:refine my-workflow
```

For each stage, specify:
- Activities with inputs/outputs
- Context tables (criteria, categories)
- Output templates
- Quality criteria

**Output:** Stage specs in `output/{date}/my-workflow/3-refine/{stage}-spec.md`

### 4. Generate artifacts

```
/framework-generator:generate my-workflow
```

Produces:
- Plugin manifest
- Command files for each stage
- README and CLAUDE.md

**Output:** Complete framework in `output/{date}/my-workflow/4-generate/`

### 5. Evaluate and iterate

```
/framework-generator:evaluate my-workflow
```

Validates:
- Convention compliance
- Completeness
- Consistency
- Dry run of first stage

**Output:** Validation report in `output/{date}/my-workflow/5-evaluate/validation.md`

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
│   ├── .claude-plugin/
│   │   └── plugin.json             # Plugin manifest
│   ├── commands/
│   │   └── {stage}.md              # Stage commands
│   ├── README.md                   # Framework overview
│   └── CLAUDE.md                   # AI instructions
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

### Self-Contained Commands
Generated command files include everything needed:
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

## License

MIT
