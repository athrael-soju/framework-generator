---
description: "Execute Generate stage to produce framework plugin with command files"
argument-hint: "<framework-name>"
---

# Generate

Produce a framework plugin with command files.

## Inputs

| Input | Source |
|-------|--------|
| framework_charter | Frame stage output |
| stage_map | Organize stage output |
| stage_specifications | Refine stage output |

### Input Format

**From Frame stage (`output/{date}/{name}/1-frame/charter.md`):**

```markdown
# Framework Charter: {NAME}
## Problem
## Purpose
## Scope
## Type
## Dependencies
```

**From Organize stage (`output/{date}/{name}/2-organize/stage-map.md`):**

```markdown
# Stage Map: {NAME}
## Stages
| Stage | Purpose | Inputs | Outputs |
## Flow
{Mermaid diagram}
## Feedback Loops
## Terminal States
```

**From Refine stage (`output/{date}/{name}/3-refine/{stage}-spec.md`):**

```markdown
# Stage Specification: {STAGE}
## Purpose
## Activities
## {Context Tables}
## Output Format
## Quality Criteria
## Completion
```

## Process

**1. Generate Plugin Manifest** - Create `4-generate/.claude-plugin/plugin.json`:
- Plugin name from framework name
- Version 1.0.0
- Description from charter purpose

**2. Generate README** - Create `4-generate/README.md`:
- Framework overview from charter
- Commands table with descriptions
- Quick start guide
- Output structure specific to this framework

**3. Generate Command Files** - For each stage:
- Create directory: `4-generate/commands/`
- Create command file: `4-generate/commands/{stage}.md`
- Include: frontmatter (description, argument-hint), inputs table, input format, process steps, output with embedded templates, quality criteria, completion
- Commands should be self-contained (no references to external docs)

**4. Generate CLAUDE.md** - Create `4-generate/CLAUDE.md`:
- AI assistant instructions for this framework
- Document index (README, commands/)
- Interaction protocol: explicitly instruct use of `AskUserQuestion` tool for gathering input, clarification, and approval requests

**5. Generate Settings** - Create `4-generate/.claude/settings.local.json`:
- Copy permission settings for Claude Code
- Enables streamlined execution without repeated permission prompts

## Output

| File | Content |
|------|---------|
| `run.md` | Update progress + append Generate entry |
| `4-generate/.claude-plugin/plugin.json` | Plugin manifest |
| `4-generate/.claude/settings.local.json` | Claude Code permission settings |
| `4-generate/commands/{stage}.md` | Stage commands (one per stage) |
| `4-generate/README.md` | Framework overview |
| `4-generate/CLAUDE.md` | AI assistant instructions |

### Run Log Update

Update `run.md` per CLAUDE.md § Run Log Template. Set Generate to Complete.

### Framework Document Structure

```markdown
# The {NAME} Framework

{Brief description}

{Mermaid flow diagram}

## Purpose
{From charter}

## Inputs
{Dependencies table}

## Stages

### {Stage 1}
{Activities, context tables, output format, quality criteria}

### {Stage 2}
...

## Feedback Loops
{From stage map}

## Quality Criteria
{Per-stage checklists}

## Stage Outputs Summary
{Table: stage, output, format}
```

### Command File Structure

```markdown
---
description: "{One line description}"
argument-hint: "<framework-name>"
---

# {Stage Name}

{Brief purpose}

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `framework-name` | Yes | Name of the framework |

## Inputs
| Input | Source |
|-------|--------|

### Input Format

**From {source} (`{path}`):**

{Expected structure in yaml or markdown}

## Process
**1. {Step}** - {Description}

## Interaction

Use the `AskUserQuestion` tool for:
- {trigger 1}
- {trigger 2}

Always use `AskUserQuestion` (not plain text) when gathering input, clarifying requirements, or requesting approval.

## Output

Save to `./runs/{date}/{name}/{#}-{stage}/`.

| File | Content |
|------|---------|
| `./runs/{date}/{name}/run.md` | Update progress + append decisions |
| `{output-file}.md` | {Description} |

### {Output File} ({filename}.md)

{Full template with placeholders}

## Quality Criteria
- [ ] {Criterion}

## Completion

Present: {What to show}. On approval, automatically proceed to {Next stage}.
```

### Plugin Manifest Structure

```json
{
  "name": "{framework-name}",
  "version": "1.0.0",
  "description": "{From charter purpose}",
  "license": "MIT"
}
```

### Settings Structure

```json
{
  "permissions": {
    "defaultMode": "bypassPermissions"
  }
}
```

> **Note:** `bypassPermissions` allows Claude to execute without confirmation prompts. Users can delete this file or change to `"default"` mode if they prefer manual approval.

**First vs subsequent stages:**

| Aspect | First stage | Subsequent stages |
|--------|-------------|-------------------|
| Run log | Initialize with progress table | Update progress + append |
| Output path | Creates `./runs/{date}/{name}/` | Same folder |
| Input format | From user | From previous stage files |

## Quality Criteria

- [ ] Plugin manifest created with valid JSON
- [ ] Settings file created with permission configuration
- [ ] All stages have corresponding command files
- [ ] Command frontmatter is valid (description, argument-hint)
- [ ] Commands are self-contained (no external doc references)
- [ ] Commands follow standard structure (arguments, inputs, input format, process, output with embedded templates, criteria, completion)
- [ ] Output templates embedded in each command's Output section
- [ ] README created with overview and quick start
- [ ] CLAUDE.md created with AI instructions
- [ ] No broken internal links

## Completion

Present: List of generated files with locations. On approval, automatically proceed to Evaluate stage.
