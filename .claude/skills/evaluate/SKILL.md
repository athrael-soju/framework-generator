---
name: evaluate
description: Execute Evaluate stage to validate generated framework artifacts. Use after Generate to check conventions and run a dry test.
---

# Evaluate

Validate the generated framework and iterate if needed.

## Inputs

| Input | Source |
|-------|--------|
| framework_document | Generate stage output |
| skill_files | Generate stage output |

### Input Format

**Framework document (`docs/models/{name}.md`):**

```markdown
# The {NAME} Model
{Description}
{Mermaid diagram}
## Purpose
## Inputs
## Stages
### {Stage 1}
## Feedback Loops
## Quality Criteria
## Stage Outputs Summary
```

**Skill files (`.claude/skills/{stage}/SKILL.md`):**

```markdown
---
name: {stage}
description: {One line}
---
# {Stage}
## Inputs
### Input Format
## Process
## Output
{Embedded templates}
## Quality Criteria
## Completion
```

## Process

**1. Convention Check** - Verify structure compliance:
- Framework document has required sections
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

**Framework Document:**
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
- [ ] Has input format section
- [ ] Has numbered process steps
- [ ] Has output format with embedded templates
- [ ] Has quality criteria checklist
- [ ] Has completion section with next action

**Consistency:**
- [ ] Stage names match between framework doc and skills
- [ ] Inputs/outputs chain correctly across stages
- [ ] Quality criteria align with activities

## Output

Save to `output/{date}/` (same date as Frame).

| File | Content |
|------|---------|
| `run.md` | Append Evaluate decisions and final outcome |
| `{name}-validation.md` | Validation report |

### Run Log (run.md) - Finalize

```markdown
---

## Evaluate - {date}

**Checks performed:**
- Convention compliance: {pass/fail}
- Completeness: {pass/fail}
- Consistency: {pass/fail}
- Dry run: {pass/fail}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{name}-validation.md`

---

## Outcome

**Status:** complete / aborted
**Result:** {name} framework created with {n} stages
**Files generated:**
- `docs/models/{name}.md`
- `.claude/skills/{stage}/SKILL.md` (per stage)
```

### Validation Report ({name}-validation.md)

```markdown
# Validation Report: {NAME}

## Convention Compliance

### Framework Document
- [ ] Has purpose statement
- [ ] Has inputs section
- [ ] Has stages with activities
- [ ] Has feedback loops
- [ ] Has quality criteria
- [ ] Mermaid renders

### Skill Files
| Skill | Frontmatter | Inputs | Process | Output | Criteria | Completion |
|-------|-------------|--------|---------|--------|----------|------------|
| {name} | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Consistency
- [ ] Stage names match
- [ ] I/O chains connect
- [ ] Terminology consistent

## Gaps Found

| Location | Issue | Severity | Resolution |
|----------|-------|----------|------------|
| {File:section} | {Problem} | {High/Med/Low} | {Fix or accept} |

## Dry Run Notes

**Stage tested:** {First stage}
**Scenario:** {What was tested}

**Observations:**
- {What worked}
- {What was unclear}
- {What's missing}

## Status

[ ] Ready for use
[ ] Needs refinement (return to Refine)
[ ] Needs restructure (return to Organize)
[ ] Needs rescoping (return to Frame)

## Next Steps
{If ready: how to use the model}
{If not: what to fix first}
```

## Quality Criteria

- [ ] All convention checks performed
- [ ] Gaps documented with severity
- [ ] Dry run attempted on first stage
- [ ] Clear status determination made
- [ ] Next steps are actionable

## Completion

Present: Validation report with status. If ready → Model complete. If not → Return to indicated stage.
