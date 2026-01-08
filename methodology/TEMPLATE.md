# Methodology Template

Use this template to create new methodologies that integrate with PRAXIS.

## Methodology Structure

Each methodology requires:

```
methodology/<name>/
├── methodology.md      # Full methodology documentation
├── <stage1>/SKILL.md   # Skill definition for stage 1
├── <stage2>/SKILL.md   # Skill definition for stage 2
└── ...
```

Plus symlinks in `.claude/skills/` pointing to stage **directories** (not files):
```bash
# Symlinks point to directories containing SKILL.md
ln -s ../../methodology/<name>/<stage> .claude/skills/<stage>

# Example for a "review" methodology with "assess" stage:
ln -s ../../methodology/review/assess .claude/skills/assess
# Claude then reads .claude/skills/assess/SKILL.md
```

---

## 1. Methodology Document Template

Create `methodology/<name>/methodology.md`:

```markdown
# The <NAME> Methodology

<One-line description of what this methodology accomplishes.>

## Diagram

[Mermaid flowchart showing stage progression and exit/entry points]

## Inputs

<NAME> requires:

- **Input 1** — Description
- **Input 2** — Description

---

## Stages

### <Stage 1>

<One sentence: what this stage does.>

| Activity | Inputs | Outputs |
|----------|--------|---------|
| Activity 1 | Input | Output |
| Activity 2 | Input | Output |

**Output:** <artifact name> — <brief description>

---

### <Stage 2>

[Repeat pattern for each stage]

---

## Feedback Loops

| From | Condition | To |
|------|-----------|-----|
| Stage X | Condition | Stage Y or Exit State |

---

## Exit States

### <State 1>
When and why entities exit to this state. Actions to take.

### <State 2>
[Repeat for each exit state]

---

## Stage Outputs Summary

| Stage | Output | Format |
|-------|--------|--------|
| Stage 1 | Artifact | Format description |

---

## Quality Criteria

**<Stage 1>:**
- [ ] Criterion 1
- [ ] Criterion 2

**<Stage 2>:**
- [ ] Criterion 1

---

## Handoffs

### Entry (from <source>)
What inputs this methodology receives and from where.

### Exit (to <destination>)
What outputs this methodology produces for downstream use.
```

---

## 2. Stage Skill Template

Create `methodology/<name>/<stage>/SKILL.md`:

```markdown
---
name: <stage>
description: <One sentence: what this skill does and when to use it.>
---

# <Stage Name>

<One sentence: core purpose.>

## Inputs

| Input | Source |
|-------|--------|
| input_1 | Where it comes from |
| input_2 | Where it comes from |

## Process

**1. <Verb>** — Description
**2. <Verb>** — Description
**3. <Verb>** — Description

## Output Format

\`\`\`markdown
# <Artifact Name> | YYYY-MM-DD

## Section 1
| Column | Column |
|--------|--------|

## Section 2
- Item
\`\`\`

## Quality Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Completion

Present: <what to show user>. Approve → <next stage>.
```

---

## 3. Design Principles

### Stages
- **3-7 stages** per methodology (sweet spot for complexity)
- Each stage has **one clear output artifact**
- Stages are **sequential by default** with explicit feedback loops
- **Human approval** required between stages

### Naming
- Methodology names: **ACRONYM** (SPARC) or **Single Word** (Identity)
- Stage names: **Single verb or noun** (Signal, Profile, Craft)
- Artifacts: **Descriptive** (Signal Log, Company Profile)

### Inputs/Outputs
- Each stage explicitly declares its inputs
- Outputs are **templated** with consistent structure
- Artifacts should be **scannable** (tables > prose)

### Quality Criteria

Quality criteria exist at two levels:

| Level | Location | Purpose |
|-------|----------|---------|
| Methodology | `methodology.md` | High-level success indicators for stage outcomes |
| Execution | `SKILL.md` | Specific verification points during execution |

The methodology-level criteria answer "did the stage succeed?" while SKILL.md criteria answer "did I execute correctly?"

Guidelines:
- **3-5 checkboxes** per stage at each level
- Focus on **completeness** and **accuracy**
- Reviewable by human in <2 minutes
- SKILL.md criteria may be more specific/technical than methodology criteria

### Feedback Loops
- Define **conditions** that trigger loops (not just "if needed")
- Loops go **backward** (retry) or **sideways** (exit state)
- Never skip stages forward

---

## 4. Integration Checklist

When adding a new methodology:

- [ ] Create `methodology/<name>/methodology.md`
- [ ] Create `methodology/<name>/<stage>/SKILL.md` for each stage
- [ ] Create symlinks in `.claude/skills/`
- [ ] Add entry to `CLAUDE.md` context table
- [ ] Define handoffs to/from existing methodologies
- [ ] Add skill descriptions to `.claude/settings.json` (if needed)

---

## 5. Example: Minimal Methodology

A two-stage methodology called "REVIEW":

```
methodology/review/
├── methodology.md
├── assess/SKILL.md
└── recommend/SKILL.md
```

**methodology.md** would define:
- Assess stage: gather data, identify issues
- Recommend stage: prioritize issues, propose solutions
- Feedback loop: Recommend → Assess (if data gaps found)
- Exit states: Approved (proceed), Blocked (escalate)

**assess/SKILL.md** would define:
- Inputs: scope, access
- Process: collect, analyze, document
- Output: Assessment Report
- Quality: completeness, evidence

**recommend/SKILL.md** would define:
- Inputs: assessment report
- Process: prioritize, draft recommendations
- Output: Recommendation Brief
- Quality: actionable, scoped
