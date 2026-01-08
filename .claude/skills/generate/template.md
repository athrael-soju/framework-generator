# Generate Template

Output templates for the Generate stage.

---

## Run Log (run.md) - Append

```markdown
---

## Generate - {date}

**Files created:**
- `docs/models/{model}.md`
- `.claude/skills/{stage}/SKILL.md` (for each stage)
- `.claude/skills/{stage}/template.md` (for each stage)
- `.claude/skills/{stage}/config.md` (for each stage)

**Index updates:**
- `docs/overview.md`
- `CLAUDE.md`
```

---

## Generated Files

Generate stage produces files in their permanent codebase locations:

| Artifact | Path |
|----------|------|
| Model document | `docs/models/{model-name}.md` |
| Stage skill | `.claude/skills/{stage-name}/SKILL.md` |
| Output template | `.claude/skills/{stage-name}/template.md` |
| Stage config | `.claude/skills/{stage-name}/config.md` |

### Model Document Structure

```markdown
# The {NAME} Model

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

### Skill File Structure

```markdown
---
name: {stage-name}
description: {One line for skill picker}
---

# {Stage Name}

{Brief purpose}

## Inputs
| Input | Source |
|-------|--------|

## Process
**1. {Step}** - {Description}

## Output
See template.md

## Quality Criteria
- [ ] {Criterion}

## Completion
{What to present, next action}
```

### Config File Structure

```markdown
# {Stage Name} Configuration

Configuration for the {Stage Name} stage of {MODEL}.

## {Section 1}

```yaml
{section_key}:
  item_1:
    property: value
  item_2:
    property: value
```

## {Section 2}

```yaml
{another_key}:
  criteria:
    5:
      label: {Label}
      definition: {Definition}
    4:
      ...
```

## Thresholds

```yaml
thresholds:
  {threshold_name}: {value}    # {Comment}
  # {Feedback trigger description}
```
```
