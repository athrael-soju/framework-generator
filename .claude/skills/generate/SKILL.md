---
name: generate
description: Execute Generate stage to produce framework document and skill files. Use after Refine to create the actual artifacts.
---

# Generate

Produce the framework document and skill files.

## Inputs

| Input | Source |
|-------|--------|
| framework_charter | Frame stage output |
| stage_map | Organize stage output |
| stage_specifications | Refine stage output (all stages) |

### Input Format

**From Frame stage (`output/{date}/{name}-charter.md`):**

```markdown
# Framework Charter: {NAME}
## Problem
## Purpose
## Scope
## Type
## Dependencies
```

**From Organize stage (`output/{date}/{name}-stage-map.md`):**

```markdown
# Stage Map: {NAME}
## Stages
| Stage | Purpose | Inputs | Outputs |
## Flow
{Mermaid diagram}
## Feedback Loops
## Terminal States
```

**From Refine stage (`output/{date}/{name}-{stage}-spec.md`):**

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

**1. Generate Framework Document** - Create `docs/models/{name}.md`:
- Combine charter, stage map, and specifications
- Follow structure in docs/model.md
- Include: purpose, inputs, stages, feedback loops, quality criteria

**2. Generate Skill Files** - For each stage:
- Create directory: `.claude/skills/{stage}/`
- Create skill file: `.claude/skills/{stage}/SKILL.md`
- Include: frontmatter, inputs table, input format, process steps, output with embedded templates, quality criteria, completion
- First stage skill initializes run.md; subsequent stages append

**3. Update Index Documents**:
- `docs/overview.md`: Add to document index table
- `CLAUDE.md`: Add framework to context table
- `README.md`: Add to structure tree, stages table, usage commands

**4. Update Guide Documents**:
- `docs/execution.md`: Add to skills table, output structure section

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- File naming conventions
- Directory structure choices
- Ambiguous specification clarification
- Generated files approval

## Output

**Generated files** go to their permanent locations:

| Artifact | Path |
|----------|------|
| Framework document | `docs/models/{name}.md` |
| Stage skill | `.claude/skills/{stage-name}/SKILL.md` |

**Run log** updated in `output/{date}/run.md`.

### Run Log (run.md)

Append Generate entry. List files created, index updates, and guide updates instead of decisions table.

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

### Input Format

**From {source} (`{path}`):**

{Expected structure in yaml or markdown}

## Process
**1. {Step}** - {Description}

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- {trigger 1}
- {trigger 2}

## Output

Save to `output/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Initialize/Append run log |
| `{output-file}.md` | {Description} |

### Run Log (run.md)

{Initialize or Append}. See `docs/execution.md` "Run Log Conventions" for format.

### {Output File} ({filename}.md)

{Full template with placeholders}

## Quality Criteria
- [ ] {Criterion}

## Completion

Present: {What to show}. Approve → {Next stage}.
```

**First vs subsequent stages:**

| Aspect | First stage | Subsequent stages |
|--------|-------------|-------------------|
| Run log | Initialize | Append |
| Output path | Creates `output/{date}/` | Same date as first stage |
| Input format | From user | From previous stage files |

## Quality Criteria

- [ ] Framework document follows structure
- [ ] All stages have corresponding skill files
- [ ] Skill frontmatter is valid (name, description)
- [ ] Skills have input format section after inputs table
- [ ] Skills follow standard structure (inputs, input format, process, output with embedded templates, criteria, completion)
- [ ] Output templates embedded in each skill's Output section
- [ ] Index documents updated (overview.md, CLAUDE.md, README.md)
- [ ] Guide documents updated (execution.md)
- [ ] No broken internal links
- [ ] Mermaid diagrams render correctly

## Completion

Present: List of generated files with locations. Approve → Evaluate.
