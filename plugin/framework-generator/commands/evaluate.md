---
description: "Execute Evaluate stage to validate generated framework artifacts"
argument-hint: "<framework-name> [--config <file>]"
---

# Evaluate

Validate the generated framework and iterate if needed.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `framework-name` | Yes | Name of the framework |
| `--config` | No | Path to YAML config file with evaluate options |

## Config Support

When `--config` is provided, read options from the config file's `evaluate` section:

```yaml
evaluate:
  dry_run_stage: Stage1   # Which stage to test
  strict_mode: false      # Fail on warnings?
```

## Inputs

| Input | Source | Config Path |
|-------|--------|-------------|
| framework_document | Generate stage output | N/A (read from files) |
| skill_files | Generate stage output | N/A (read from files) |
| dry_run_stage | Config or prompt | `evaluate.dry_run_stage` |
| strict_mode | Config or default | `evaluate.strict_mode` |

### Input Format

**Framework document (`output/{date}/{name}/4-generate/docs/{name}.md`):**

```markdown
# The {NAME} Framework
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

**Execution guide (`output/{date}/{name}/4-generate/docs/execution.md`):**

```markdown
## Skills Overview
## Running a Stage
## Output Structure
## Run Log Conventions
```

**Skill files (`output/{date}/{name}/4-generate/.claude/skills/{stage}/SKILL.md`):**

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

## Interaction Protocol

Use structured questions for:
- Gap handling decisions (fix vs accept)
- Severity classification
- Dry run test scenario input
- Return stage selection (if issues found)
- Validation report approval

## Convention Checklist

**Framework Document:**
- [ ] Has purpose statement
- [ ] Has inputs section with dependencies
- [ ] Has stages section with activities tables
- [ ] Has feedback loops table
- [ ] Has quality criteria per stage
- [ ] Has stage outputs summary
- [ ] Mermaid diagram renders

**Execution Guide:**
- [ ] Has skills overview table
- [ ] Has output structure diagram
- [ ] Has run log conventions
- [ ] Paths are relative to framework root

**Skill Files:**
- [ ] Frontmatter has name and description
- [ ] Description is one line, action-oriented
- [ ] Has inputs table with sources
- [ ] Has input format section
- [ ] Has numbered process steps
- [ ] Has output format with embedded templates
- [ ] Has quality criteria checklist
- [ ] Has completion section with next action
- [ ] No references to external docs (self-contained)

**Supporting Files:**
- [ ] README has overview and quick start
- [ ] CLAUDE.md has AI instructions and document index

**Consistency:**
- [ ] Stage names match between framework doc and skills
- [ ] Inputs/outputs chain correctly across stages
- [ ] Quality criteria align with activities

## Output

Save to `output/{date}/{name}/` (same folder as Frame).

| File | Content |
|------|---------|
| `run.md` | Update progress + finalize with outcome |
| `5-evaluate/validation.md` | Validation report |

### Validation Report (5-evaluate/validation.md)

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
{If ready: how to use the framework}
{If not: what to fix first}
```

## Quality Criteria

- [ ] All convention checks performed
- [ ] Gaps documented with severity
- [ ] Dry run attempted on first stage
- [ ] Clear status determination made
- [ ] Next steps are actionable

## Completion

Present: Validation report with status. If ready → Framework complete. If not → Return to indicated stage.

When running with `--config` and `--approve-all`, automatically proceed based on validation status:
- If ready: Complete and report success
- If not ready: Report issues and stop (requires manual intervention)
