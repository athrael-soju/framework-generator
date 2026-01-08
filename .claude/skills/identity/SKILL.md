---
name: identity
description: Generate a professional identity profile from user inputs and public sources. Run once to initialize PRAXIS, then update when positioning shifts. The profile informs all SPARC work.
---

# Identity

Define your professional identity to inform client acquisition.

## Inputs

| Input | Required |
|-------|----------|
| name | Yes |
| linkedin | Recommended |
| portfolio | Recommended |
| github | Optional |
| other_links | Optional |

## Process

**1. Collect** — Gather name and profile URLs
**2. Discover** — Research links, extract roles/skills/projects
**3. Enquire** — Ask targeted questions to fill gaps
**4. Synthesize** — Combine into structured profile

## Key Questions

| Category | Questions |
|----------|-----------|
| Expertise | What are you expert at? Known for? |
| Services | What do you offer? Refuse to do? |
| Ideal Client | What makes ideal? Warning signs? |
| Differentiation | What do you do others don't? |
| Constraints | Rate floor? Availability? Deal-breakers? |

## Output Format

```markdown
# Identity Profile

## Identity
| Field | Value |
|-------|-------|
| Name | X |
| Tagline | X |
| Email | X |
| LinkedIn | X |

## Positioning
**Who I help:** X
**Problem solved:** X
**Differentiation:** X

## Expertise
**Primary:** skill1, skill2
**Secondary:** skill3, skill4
**Tools:** tool1, tool2

## Services
| Service | Description |
|---------|-------------|
| Service | Brief description |

## Ideal Client
**Characteristics:** X
**Buying signals:** X
**Red flags:** X

## Constraints
| Constraint | Value |
|------------|-------|
| Rate floor | $X/hour |
| Availability | X |
| Deal-breakers | X |
```

## Quality Criteria

- [ ] Name and contact captured
- [ ] Public sources researched
- [ ] Positioning is specific
- [ ] Ideal client is filterable
- [ ] Red flags identified
- [ ] Constraints concrete

## Completion

Present profile for approval. Save to `output/identity/profile.md`.
