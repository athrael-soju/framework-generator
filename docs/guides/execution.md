# Execution Guide

How to run the Framework Generator using skills.

```mermaid
---
config:
  layout: dagre
  look: handDrawn
  theme: base
  themeVariables:
    lineColor: gray
---
flowchart TB
    Fr["/frame"] --> O["/organize"]
    O --> Re["/refine"]
    Re --> G["/generate"]
    G --> E["/evaluate"]
```

---

## Skills Overview

| Stage | Skill | Purpose |
|-------|-------|---------|
| Frame | `/frame` | Define framework purpose and boundaries |
| Organize | `/organize` | Map stages and flow |
| Refine | `/refine` | Specify each stage in detail |
| Generate | `/generate` | Produce framework and skill files |
| Evaluate | `/evaluate` | Validate and iterate |

---

## Running a Stage

### 1. Invoke the Skill

```
/frame
```

The skill guides you through the stage, prompting for inputs and decisions.

### 2. Provide Inputs

Each stage expects specific inputs:

| Stage | Required Inputs |
|-------|-----------------|
| Frame | Problem description, context |
| Organize | Framework charter |
| Refine | Stage map |
| Generate | Charter, stage map, stage specifications |
| Evaluate | Generated files |

### 3. Work Through the Process

The skill:
- Performs analysis
- Presents findings
- Requests decisions at key points
- Produces stage outputs

### 4. Approve and Proceed

At stage completion, review outputs and choose:
- **Approve** - Move to next stage
- **Revise** - Adjust outputs before proceeding
- **Retry** - Re-run stage with different approach
- **Abort** - Exit

---

## Execution Patterns

### Sequential Execution

Run stages in order:

```
/frame
[approve]

/organize
[approve]

/refine
[approve]

/generate
[approve]

/evaluate
[approve]
```

### Partial Execution

Start from any stage if you have prior outputs:

```
# Already have charter and stage map
/refine
[provide existing artifacts]
```

---

## Decision Points

### Clarification Menus

When inputs are ambiguous:
- Multiple valid interpretations
- Missing information
- Conflicting requirements

### Decision Menus

When strategic direction is needed:
- Multiple valid approaches
- Threshold conditions met
- Feedback loop triggered

### Approval Menus

At stage completion:
- Summary of outputs
- Quality criteria check
- Options: approve / revise / retry / abort

---

## Feedback Loops

Some conditions route back to earlier stages:

| From | Condition | To |
|------|-----------|-----|
| Organize | Stages don't cover the problem | Frame |
| Refine | Stage purpose unclear | Organize |
| Evaluate | Gaps in specifications | Refine |
| Evaluate | Structural issues | Organize |
| Evaluate | Scope creep detected | Frame |

---

## Output Structure

```
output/
└── {date}/
    ├── run.md                    # Decisions log
    ├── {name}-charter.md         # Frame output
    ├── {name}-stage-map.md       # Organize output
    ├── {name}-{stage}-spec.md    # Refine output (per stage)
    └── {name}-validation.md      # Evaluate output
```

Generated frameworks:

```
docs/models/{name}.md             # Framework documentation
.claude/skills/{stage}/SKILL.md   # Executable skills
```

### Naming

- Date folders: `output/YYYY-MM-DD/`
- Multiple runs same day: Add suffix (`2026-01-08-02`)

---

## Quality Gates

Before approving, confirm:
- All required outputs produced
- Quality criteria checklist passed
- Outputs ready for next stage

### Common Issues

| Issue | Resolution |
|-------|------------|
| Missing data | Note gaps, proceed with caveats |
| Conflicting info | Resolve via clarification menu |
| Criteria not met | Revise before approval |
| Scope creep | Defer to future work |
