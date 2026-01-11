---
description: "Execute Evaluate stage to validate generated framework artifacts"
argument-hint: "<framework-name>"
---

# Evaluate

Validate the generated framework and iterate if needed.

## Inputs

| Input | Source |
|-------|--------|
| framework_readme | Generate stage output |
| command_files | Generate stage output |
| dry_run_stage | User input |

### Input Format

**Framework README (`output/{date}/{name}/4-generate/README.md`):**

```markdown
# {NAME} Framework
{Description}
## Installation
## Commands
## Workflow
{Mermaid diagram}
## Quick Start
## Output Structure
## Principles
```

**CLAUDE.md (`output/{date}/{name}/4-generate/CLAUDE.md`):**

```markdown
## Context
## Roles
## Principles
## Stage Execution
## Command Conventions
```

**Command files (`output/{date}/{name}/4-generate/commands/{stage}.md`):**

```markdown
---
description: {One line}
argument-hint: "<framework-name>"
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
- README has required sections
- Command files have valid frontmatter
- Output templates exist where needed
- Mermaid diagrams render

**2. Completeness Audit** - Check for gaps:
- Every stage in map has a specification
- Every stage has a command file
- Quality criteria cover key concerns
- Feedback loops handle failure modes

**3. Consistency Check** - Verify alignment:
- Stage names match across documents
- Input/output chains connect properly
- Terminology is consistent

**4. Dry Run** - Test the first stage:
- Attempt to execute the first command
- Note any ambiguities or gaps
- Identify missing context or guidance

**5. Refinement** - Address issues found:
- Update specifications if gaps found
- Return to Refine if significant issues
- Document any accepted limitations

## Convention Checklist

**README:**
- [ ] Has installation instructions
- [ ] Has commands table
- [ ] Has workflow diagram
- [ ] Has quick start guide
- [ ] Has output structure
- [ ] Mermaid diagram renders

**CLAUDE.md:**
- [ ] Has context section with document index
- [ ] Has stage execution protocol
- [ ] Has command conventions
- [ ] Paths are relative to framework root

**Command Files:**
- [ ] Frontmatter has description and argument-hint
- [ ] Description is one line, action-oriented
- [ ] Has inputs table with sources
- [ ] Has input format section
- [ ] Has numbered process steps
- [ ] Has output format with embedded templates
- [ ] Has quality criteria checklist
- [ ] Has completion section with next action
- [ ] No references to external docs (self-contained)

**Plugin Manifest:**
- [ ] plugin.json in .claude-plugin/ directory
- [ ] Has name, version, description fields
- [ ] Commands path is correct

**Consistency:**
- [ ] Stage names match between README and commands
- [ ] Inputs/outputs chain correctly across stages
- [ ] Quality criteria align with activities

## Output

| File | Content |
|------|---------|
| `run.md` | Update progress + finalize with outcome |
| `5-evaluate/validation.md` | Validation report |

### Run Log Update

Update `run.md` per CLAUDE.md § Run Log Template. Set Evaluate to Complete with token count. Update Status header to "Complete" or "Return to {stage}". Log the final total token count.

### Validation Report (5-evaluate/validation.md)

```markdown
# Validation Report: {NAME}

## Convention Compliance

### README
- [ ] Has installation instructions
- [ ] Has commands table
- [ ] Has workflow diagram
- [ ] Has quick start guide
- [ ] Has output structure
- [ ] Mermaid renders

### Command Files
| Command | Frontmatter | Inputs | Process | Output | Criteria | Completion |
|---------|-------------|--------|---------|--------|----------|------------|
| {name} | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Plugin Manifest
- [ ] Located in .claude-plugin/
- [ ] Valid JSON structure
- [ ] Commands path correct

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

Present: Validation report with status. If ready → Framework complete. If issues found → automatically return to indicated stage (Frame, Organize, or Refine).
