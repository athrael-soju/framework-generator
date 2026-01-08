---
name: frame
description: Execute FORGE Frame stage to define a new model's purpose and boundaries. Use when starting to create a new model for the PRAXIS framework.
---

# Frame

Define the purpose and boundaries of a new model.

## Inputs

| Input | Source |
|-------|--------|
| problem_description | User input: what workflow needs systematizing |
| context | User input: domain, constraints, intended users |
| reference_models | Optional: existing models to draw patterns from |

## Process

**1. Clarify Problem** - Ask what workflow or process the user wants to systematize:
- What are the steps they currently do manually?
- What's painful or inconsistent about it?
- What would success look like?

**2. Articulate Purpose** - Draft why this model should exist:
- What value does systematizing provide?
- Why a model vs. a checklist or ad-hoc process?

**3. Set Boundaries** - Define scope:
- What's explicitly in scope?
- What's explicitly out of scope?
- What adjacent problems are we not solving?

**4. Identify Triggers** - When should this model be run:
- One-time vs. ongoing?
- What events or conditions trigger execution?

**5. Determine Type** - Foundation or pipeline:
- Foundation: single assessment, run once, feeds other models
- Pipeline: sequential stages, ongoing, feedback loops

**6. Map Dependencies** - What other models does this require:
- Does it need Identity?
- Does it need outputs from another model?

## Output

Save to `output/forge/{date}/` where `{date}` is today (YYYY-MM-DD).

| File | Content |
|------|---------|
| `run.md` | Initialize run log |
| `{model}-charter.md` | Model charter |

See [template.md](template.md) for formats.

## Quality Criteria

- [ ] Problem is specific, not generic
- [ ] Purpose explains value vs. ad-hoc process
- [ ] Scope has explicit in/out boundaries
- [ ] Triggers are concrete conditions
- [ ] Type matches workflow pattern
- [ ] Dependencies identified (or "none" stated)

## Completion

Present: Model charter with all sections. Approve → Organize.
