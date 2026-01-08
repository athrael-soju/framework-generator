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
- Output format
- Quality criteria
- Completion section

**3. Generate Output Templates** - If stages have complex outputs:
- Create `.claude/skills/{stage}/template.md`
- Full template with placeholders and examples

**4. Update Index Documents**:
- Add to `docs/overview.md` component table
- Add to `CLAUDE.md` context table if needed
- Add skills to skill registry

## Output

**Generated files** go to their permanent locations:

| Artifact | Path |
|----------|------|
| Model document | `docs/models/{model-name}.md` |
| Stage skill | `.claude/skills/{stage-name}/SKILL.md` |
| Output template | `.claude/skills/{stage-name}/template.md` |

**Run log** updated in `output/forge/{date}/run.md`.

See [template.md](template.md) for formats.

## Quality Criteria

- [ ] Model document follows framework structure
- [ ] All stages have corresponding skill files
- [ ] Skill frontmatter is valid (name, description)
- [ ] Skills follow standard structure
- [ ] Output templates match stage output definitions
- [ ] No broken internal links
- [ ] Mermaid diagrams render correctly

## Completion

Present: List of generated files with locations. Approve → Evaluate.
