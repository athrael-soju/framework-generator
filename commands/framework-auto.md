---
description: "Run full framework generation with configurable automation"
argument-hint: "<name> --config <file> [--approve-all] [--break-at <stages>]"
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# Framework Auto

Orchestrates all framework generation stages with configurable automation.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Framework name |
| `--config` | No | Path to YAML config file |
| `--approve-all` | No | Skip all approval gates |
| `--break-at` | No | Comma-separated stages to pause at |

## Examples

```bash
# Fully automated with config
/framework-generator:framework-auto api-review --config configs/api-review.yaml --approve-all

# Automated with final review
/framework-generator:framework-auto feature-dev --config base.yaml --break-at evaluate

# Pause at key decision points
/framework-generator:framework-auto new-process --config skeleton.yaml --break-at frame,refine

# Interactive mode (same as running stages individually)
/framework-generator:framework-auto experimental
```

## Process

You are orchestrating framework generation. Follow this process:

### 1. Parse Arguments

Extract from the user's command:
- `FRAMEWORK_NAME`: The framework name
- `CONFIG_FILE`: Path to config file (if provided)
- `APPROVE_ALL`: Boolean flag
- `BREAK_AT`: List of stages to pause at

### 2. Load Configuration

If `--config` is provided:
1. Read the config file
2. Validate it has required fields (at minimum: `name`, `frame.problem`, `frame.domain`, `frame.users`)
3. Extract automation options from `options` section

If no config:
- Run in fully interactive mode (equivalent to running each /stage command separately)

### 3. Execute Stages Sequentially

For each stage in order: **frame → organize → refine → generate → evaluate**

```
FOR each stage:
  1. Check if stage is in BREAK_AT list
     → If yes: pause and request approval before proceeding

  2. Check if CONFIG has inputs for this stage
     → If yes: use config values automatically
     → If no: prompt user for inputs interactively

  3. Execute the stage activities

  4. Check if APPROVE_ALL is false AND stage not in BREAK_AT
     → If approval needed: present output and request approval
     → If rejected: allow revision or abort

  5. Produce stage output files

  6. Continue to next stage
```

### 4. Stage Execution Details

#### Frame Stage
- **Config inputs**: `frame.problem`, `frame.domain`, `frame.users`, `frame.scope`, `frame.constraints`
- **Output**: `output/{date}/{name}/1-frame/charter.md`

#### Organize Stage
- **Config inputs**: `organize.pattern`, `organize.stages`, `organize.feedback_loops`
- **Output**: `output/{date}/{name}/2-organize/stage-map.md`

#### Refine Stage
- **Config inputs**: `refine.{StageName}.activities`, `refine.{StageName}.criteria`, etc.
- **Output**: `output/{date}/{name}/3-refine/{stage}-spec.md` for each stage

#### Generate Stage
- **Config inputs**: `generate.include_mermaid`, `generate.output_format`
- **Output**: Full framework in `output/{date}/{name}/4-generate/`

#### Evaluate Stage
- **Config inputs**: `evaluate.dry_run_stage`, `evaluate.strict_mode`
- **Output**: `output/{date}/{name}/5-evaluate/validation.md`

### 5. Handle Errors

Based on `options.on_error` setting:
- `stop`: Halt execution, report error, wait for user
- `report`: Log error, continue to next stage, summarize at end
- `retry`: Attempt stage again (max 2 retries)

### 6. Completion

When all stages complete:
1. Summarize what was generated
2. Report any warnings or issues
3. Provide path to generated framework
4. If evaluate found issues, suggest next steps

## Output Structure

```
output/{date}/{framework-name}/
├── run.md                          # Execution log
├── 1-frame/
│   └── charter.md
├── 2-organize/
│   └── stage-map.md
├── 3-refine/
│   └── {stage}-spec.md (per stage)
├── 4-generate/
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── commands/
│   │   └── {stage}.md
│   ├── README.md
│   └── CLAUDE.md
└── 5-evaluate/
    └── validation.md
```

## Automation Levels

| Config Completeness | Behavior |
|---------------------|----------|
| Full config + `--approve-all` | Fully automated, no prompts |
| Full config | Auto-fill inputs, prompt for approval |
| Partial config | Auto-fill known, prompt for gaps + approval |
| No config | Fully interactive |

## Quality Criteria

- [ ] All required arguments parsed correctly
- [ ] Config file validated before execution
- [ ] Each stage produces expected outputs
- [ ] Errors handled according to `on_error` setting
- [ ] Breakpoints respected
- [ ] Final summary includes all generated artifacts
