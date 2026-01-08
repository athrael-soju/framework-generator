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

**2. Generate Skill Files** - For each stage, create `.claude/skills/{stage}/SKILL.md`:
- Frontmatter with name and description
- Inputs table
- Process steps
- Output format with embedded templates
- Quality criteria
- Completion section

**3. Update Index Documents**:
- Add to `docs/overview.md` component table, diagram, execution commands, document index
- Add to `CLAUDE.md` context table
- Add to `README.md`: structure tree, models table, usage commands

**4. Update Guide Documents**:
- Add to `docs/guides/execution.md`: mermaid diagram, skills table, output structure, feedback loops reference

## Output

**Generated files** go to their permanent locations:

| Artifact | Path |
|----------|------|
| Framework document | `docs/models/{name}.md` |
| Stage skill | `.claude/skills/{stage-name}/SKILL.md` |

**Run log** updated in `output/{date}/run.md`.

### Run Log (run.md) - Append

```markdown
---

## Generate - {date}

**Files created:**
- `docs/models/{name}.md`
- `.claude/skills/{stage}/SKILL.md` (for each stage)

**Index updates:**
- `docs/overview.md`
- `CLAUDE.md`
- `README.md`

**Guide updates:**
- `docs/guides/execution.md`
```

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

```yaml or markdown
{Expected structure}
```

## Process
**1. {Step}** - {Description}

## Output

Save to `output/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Append {stage} decisions |
| `{output-file}.md` | {Description} |

### {Output File} ({filename}.md)

```markdown
{Full template with placeholders}
```

### Run Log (run.md) - Append

```markdown
---

## {Stage} - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{filename}.md`
```

## Quality Criteria
- [ ] {Criterion}

## Completion
{What to present, next action}
```

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
