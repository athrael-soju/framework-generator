---
description: "Execute Generate stage to produce framework document and skill files"
argument-hint: "[framework-name]"
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

**1. Generate Framework Document** - Create `4-generate/docs/{name}.md`:
- Combine charter, stage map, and specifications
- Include: purpose, inputs, stages, feedback loops, quality criteria

**2. Generate Execution Guide** - Create `4-generate/docs/execution.md`:
- How to run stages for this framework
- Skills overview table
- Output structure specific to this framework
- Run log conventions (simplified from parent)

**3. Generate Skill Files** - For each stage:
- Create directory: `4-generate/.claude/skills/{stage}/`
- Create skill file: `4-generate/.claude/skills/{stage}/SKILL.md`
- Include: frontmatter, inputs table, input format, process steps, output with embedded templates, quality criteria, completion
- Skills should be self-contained (no references to external docs)

**4. Generate README** - Create `4-generate/README.md`:
- Framework overview from charter
- Quick start guide
- Stages table with purposes
- Link to docs for details

**5. Generate CLAUDE.md** - Create `4-generate/CLAUDE.md`:
- AI assistant instructions for this framework
- Document index
- Interaction protocols

## Interaction Protocol

Use structured questions for:
- File naming conventions
- Directory structure choices
- Ambiguous specification clarification
- Generated files approval

## Output

Save to `output/{date}/{name}/` (same folder as Frame).

| File | Content |
|------|---------|
| `run.md` | Update progress + append Generate entry |
| `4-generate/README.md` | Framework overview |
| `4-generate/CLAUDE.md` | AI assistant instructions |
| `4-generate/docs/{name}.md` | Framework documentation |
| `4-generate/docs/execution.md` | How to run stages |
| `4-generate/.claude/skills/{stage}/SKILL.md` | Stage skills (one per stage) |

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

Use structured questions for:
- {trigger 1}
- {trigger 2}

## Output

Save to `output/{date}/{name}/{#}-{stage}/`.

| File | Content |
|------|---------|
| `../run.md` | Update progress + append decisions |
| `{output-file}.md` | {Description} |

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
| Run log | Initialize with progress table | Update progress + append |
| Output path | Creates `output/{date}/{name}/` | Same folder |
| Input format | From user | From previous stage files |

## Quality Criteria

- [ ] Framework document follows structure
- [ ] Execution guide created with stages and run log format
- [ ] All stages have corresponding skill files
- [ ] Skill frontmatter is valid (name, description)
- [ ] Skills are self-contained (no external doc references)
- [ ] Skills follow standard structure (inputs, input format, process, output with embedded templates, criteria, completion)
- [ ] Output templates embedded in each skill's Output section
- [ ] README created with overview and quick start
- [ ] CLAUDE.md created with AI instructions
- [ ] No broken internal links
- [ ] Mermaid diagrams render correctly

## Completion

Present: List of generated files with locations. Approve → Evaluate.
