---
name: refine
description: Execute FORGE Refine stage to specify each stage in detail. Use after Organize to fully define activities, outputs, and criteria.
---

# Refine

Specify each stage in detail.

## Inputs

| Input | Source |
|-------|--------|
| model_charter | Frame stage output |
| stage_map | Organize stage output |
| domain_knowledge | User input: specifics about the workflow |

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

## Output

Save to `output/forge/{date}/` (same date as Frame).

| File | Content |
|------|---------|
| `run.md` | Append Refine decisions |
| `{model}-{stage}-spec.md` | One file per stage specification |

See [template.md](template.md) for formats.

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
