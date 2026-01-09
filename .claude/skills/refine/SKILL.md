---
name: refine
description: Execute Refine stage to specify each stage in detail. Use after Organize to fully define activities, outputs, and criteria.
---

# Refine

Specify each stage in detail.

## Inputs

| Input | Source |
|-------|--------|
| framework_charter | Frame stage output |
| stage_map | Organize stage output |
| domain_knowledge | User input: specifics about the workflow |

### Input Format

**From Frame stage (`output/{date}/{name}/1-frame/charter.md`):**

```markdown
## Problem
{Workflow being addressed}

## Scope
**In:** {What's covered}
**Out:** {What's excluded}
```

**From Organize stage (`output/{date}/{name}/2-organize/stage-map.md`):**

```markdown
## Stages

| Stage | Purpose | Inputs | Outputs |
|-------|---------|--------|---------|
| {Name} | {Description} | {Inputs} | {Outputs} |

## Feedback Loops

| From | Condition | To |
```

**User-provided domain knowledge:**

```yaml
domain_knowledge:
  criteria: [Scoring criteria, thresholds]
  categories: [Types, tiers, channels]
  sources: [Where to get data]
  constraints: [Rules, limits]
```

## Process

For each stage in the stage map:

**1. Define Activities** - What happens in this stage:
- Break into discrete activities
- Each activity has inputs and outputs
- Activities should be concrete actions, not vague descriptions

**2. Create Context Tables** - Reference information needed:
- Categories, criteria, thresholds
- Options, channels, sources
- Any structured data the stage uses

**3. Design Output Format** - What the stage produces:
- Create a template showing structure
- Include placeholders for variable content
- Make it specific enough to be useful

**4. Set Quality Criteria** - How to know if the stage is done well:
- Checklist format (not prose)
- Each criterion is verifiable
- Cover completeness and correctness

**5. Define Completion** - What happens at stage end:
- What to present to user
- What approval is needed
- What's the next stage

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- Gathering domain knowledge (criteria, categories, thresholds)
- Activity detail clarification
- Output format choices
- Quality criteria priorities
- Stage specification approval

## Output

Save to `output/{date}/{name}/` (same folder as Frame).

| File | Content |
|------|---------|
| `run.md` | Update progress + append Refine decisions |
| `3-refine/{stage}-spec.md` | One file per stage specification |

### Run Log (run.md)

Update progress table and append Refine decisions. See `docs/execution.md` "Run Log Conventions" for format. Include "Stages specified" list.

### Stage Specification (3-refine/{stage}-spec.md)

One file per stage.

```markdown
# Stage Specification: {STAGE NAME}

## Purpose
{One sentence: what this stage accomplishes}

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
| {Action verb + object} | {Specific inputs} | {Specific outputs} |

## {Context Table Name}

| {Column} | {Column} |
|----------|----------|
| {Data} | {Data} |

## Output Format

{Template block showing expected structure}

## Quality Criteria

- [ ] {Specific, verifiable criterion}

## Completion

Present: {What to show}. Approve -> {Next stage}.
```

## Quality Criteria

- [ ] Every stage from the map has a specification
- [ ] Activities use action verbs with specific objects
- [ ] Activity inputs/outputs are concrete, not vague
- [ ] Context tables cover reference data the stage needs
- [ ] Output templates are specific structures, not descriptions
- [ ] Quality criteria are checkboxes, not paragraphs
- [ ] Completion section names next stage

## Completion

Present: All stage specifications. Approve → Generate.
