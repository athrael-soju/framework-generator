---
name: evaluate
description: Execute FORGE Evaluate stage to validate generated model artifacts. Use after Generate to check conventions and run a dry test.
---

# Evaluate

Validate the generated model and iterate if needed.

## Inputs

| Input | Source |
|-------|--------|
| model_document | Generate stage output |
| skill_files | Generate stage output |
| templates | Generate stage output |

## Process

**1. Convention Check** - Verify structure compliance:
- Model document has required sections
- Skills have valid frontmatter
- Output templates exist where needed
- Mermaid diagrams render

**2. Completeness Audit** - Check for gaps:
- Every stage in map has a specification
- Every stage has a skill file
- Quality criteria cover key concerns
- Feedback loops handle failure modes

**3. Consistency Check** - Verify alignment:
- Stage names match across documents
- Input/output chains connect properly
- Terminology is consistent

**4. Dry Run** - Test the first stage:
- Attempt to execute the first skill
- Note any ambiguities or gaps
- Identify missing context or guidance

**5. Refinement** - Address issues found:
- Update specifications if gaps found
- Return to Refine if significant issues
- Document any accepted limitations

## Convention Checklist

**Model Document:**
- [ ] Has purpose statement
- [ ] Has inputs section with dependencies
- [ ] Has stages section with activities tables
- [ ] Has feedback loops table
- [ ] Has quality criteria per stage
- [ ] Has stage outputs summary
- [ ] Mermaid diagram renders

**Skill Files:**
- [ ] Frontmatter has name and description
- [ ] Description is one line, action-oriented
- [ ] Has inputs table with sources
- [ ] Has numbered process steps
- [ ] Has output format template
- [ ] Has quality criteria checklist
- [ ] Has completion section with next action

**Consistency:**
- [ ] Stage names match between model doc and skills
- [ ] Inputs/outputs chain correctly across stages
- [ ] Quality criteria align with activities

## Output

Save to `output/forge/{date}/` (same date as Frame).

| File | Content |
|------|---------|
| `run.md` | Append Evaluate decisions and final outcome |
| `{model}-validation.md` | Validation report |

See [template.md](template.md) for formats.

## Quality Criteria

- [ ] All convention checks performed
- [ ] Gaps documented with severity
- [ ] Dry run attempted on first stage
- [ ] Clear status determination made
- [ ] Next steps are actionable

## Completion

Present: Validation report with status. If ready → Model complete. If not → Return to indicated stage.
