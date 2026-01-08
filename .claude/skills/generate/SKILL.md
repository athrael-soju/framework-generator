---
name: generate
description: Execute FORGE Generate stage to produce model document and skill files. Use after Refine to create the actual artifacts.
---

# Generate

Produce the model document and skill files.

## Inputs

| Input | Source |
|-------|--------|
| model_charter | Frame stage output |
| stage_map | Organize stage output |
| stage_specifications | Refine stage output (all stages) |

## Process

**1. Generate Model Document** - Create `docs/models/{name}.md`:
- Combine charter, stage map, and specifications
- Follow structure of existing models (SPARC, Identity)
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
- Add to `docs/guides/run.md`: model list, paths table, add example if appropriate

## Output

**Generated files** go to their permanent locations:

| Artifact | Path |
|----------|------|
| Model document | `docs/models/{model-name}.md` |
| Stage skill | `.claude/skills/{stage-name}/SKILL.md` |

**Run log** updated in `output/forge/{date}/run.md`.

### Run Log (run.md) - Append

```markdown
---

## Generate - {date}

**Files created:**
- `docs/models/{model}.md`
- `.claude/skills/{stage}/SKILL.md` (for each stage)

**Index updates:**
- `docs/overview.md`
- `CLAUDE.md`
- `README.md`

**Guide updates:**
- `docs/guides/execution.md`
- `docs/guides/run.md`
```

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

Save to `output/{model}/{date}/`.

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

- [ ] Model document follows framework structure
- [ ] All stages have corresponding skill files
- [ ] Skill frontmatter is valid (name, description)
- [ ] Skills follow standard structure (inputs, process, output with embedded templates, criteria, completion)
- [ ] Output templates embedded in each skill's Output section
- [ ] Index documents updated (overview.md, CLAUDE.md, README.md)
- [ ] Guide documents updated (execution.md, run.md)
- [ ] No broken internal links
- [ ] Mermaid diagrams render correctly

## Completion

Present: List of generated files with locations. Approve → Evaluate.
