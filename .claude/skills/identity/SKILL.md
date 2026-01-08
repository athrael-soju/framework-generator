---
name: identity
description: Generate a professional identity profile from user inputs and public sources. Run once to initialize PRAXIS, then update when positioning shifts. The profile informs all SPARC work.
---

# Identity

Define your professional identity to inform client acquisition.

## Inputs

| Input | Source |
|-------|--------|
| name | User input (required) |
| linkedin | User input (recommended) |
| portfolio | User input (recommended) |
| github | User input (optional) |
| other_links | User input (optional) |

### Input Format

```yaml
# User-provided inputs
name: "Full Name"
linkedin: "https://linkedin.com/in/username"
portfolio: "https://example.com"
github: "https://github.com/username"
other_links:
  - "https://twitter.com/username"
  - "https://medium.com/@username"
```

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

## Output

Save to `output/identity/profile.md`.

### Profile Template

```markdown
# Identity Profile

Generated: YYYY-MM-DD
Sources: linkedin, portfolio, github

---

## Identity

**Name:** [Full Name]
**Tagline:** [One-line positioning, e.g., "AI researcher helping devtools companies ship better docs"]

### Contact
- Email:
- LinkedIn:
- Website:
- GitHub:

---

## Positioning

**Who you help:** [Specific audience, e.g., "Series A-C devtools startups"]
**With what problem:** [Core problem you solve]
**Differentiation:** [Why you over alternatives]

### Proof Points
- [Evidence supporting claims]

---

## Expertise

### Primary Skills
- [Core skills you lead with]

### Secondary Skills
- [Supporting skills]

### Methods
- [Frameworks, approaches you use]

### Tools
- [Technologies, platforms]

---

## Experience

**Industries:** [List]
**Years:** [Number]

### Notable Projects

| Project | Client Type | Outcome | Relevance |
|---------|-------------|---------|-----------|
| [Name] | [Industry/size] | [Measurable result] | [Why this matters] |

---

## Services

| Offering | Description | Price Range | Engagement Type |
|----------|-------------|-------------|-----------------|
| [Name] | [What's included] | [e.g., $5k-15k] | project / retainer / advisory / workshop |

---

## Ideal Client

### Characteristics
- [Company attributes that indicate fit]

### Signals
- [Buying indicators to watch for]

### Red Flags
- [Warning signs to avoid]

---

## Constraints

**Rate Floor:** [Minimum acceptable rate]
**Availability:** [e.g., "20 hrs/week" or "1 project at a time"]
**Geography:** [Timezone or location preferences]

### Deal Breakers
- [Absolute no-gos]
```

## Quality Criteria

- [ ] Name and contact captured
- [ ] Public sources researched
- [ ] Positioning is specific
- [ ] Ideal client is filterable
- [ ] Red flags identified
- [ ] Constraints concrete

## Completion

Present profile for approval. Approve → Save.
