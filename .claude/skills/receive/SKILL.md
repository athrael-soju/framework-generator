---
name: receive
description: Execute RECON Receive stage to collect identifiers and research context for an individual.
---

# Receive

Collect initial identifiers and context to seed the research process.

## Inputs

| Input | Source |
|-------|--------|
| name | User input (required) |
| identifiers | User input: handles, links, email |
| context | User input: purpose, relationship |

### Input Format

```yaml
# User-provided inputs
name: "Full Name"
identifiers:
  linkedin: "https://linkedin.com/in/username"
  twitter: "@handle"
  github: "username"
  email: "email@example.com"
context:
  relationship: "friend / colleague / prospect / stranger"
  purpose: "reconnect / meeting prep / collaboration / general"
  known_facts:
    - "Fact 1"
    - "Fact 2"
  priority_areas:
    - "Area 1"
  depth: "quick / standard / deep"
```

## Process

**1. Gather Identifiers** - Ask for name and any known handles/links:
- Full name (required)
- LinkedIn, Twitter/X, GitHub, Instagram handles
- Email address
- Location, employer if known

**2. Clarify Context** - Understand the research purpose:
- How do you know this person?
- Why are you researching them?
- What do you already know?
- What matters most to discover?

**3. Set Scope** - Determine depth:
- Quick: basics only, 15-minute research
- Standard: comprehensive across main platforms
- Deep: exhaustive search including public records

**4. Compile Seed File** - Structure all inputs for Explore stage

## Output

Save to `output/recon/{date}/` where `{date}` is today (YYYY-MM-DD).

| File | Content |
|------|---------|
| `run.md` | Initialize run log |
| `{subject}-seed.md` | Seed file with identifiers and context |

### Run Log (run.md) - Initialize

```markdown
# RECON Run: {Subject Name}

Started: {date}
Status: in_progress
Purpose: {research purpose}

---

## Receive - {date}

**Subject:** {name}
**Relationship:** {relationship}
**Purpose:** {purpose}
**Depth:** {depth level}

**Identifiers provided:**
| Type | Value |
|------|-------|
| {type} | {value} |

**Output:** `{subject}-seed.md`
```

### Seed File ({subject}-seed.md)

```markdown
# RECON Seed: {Subject Name}

Created: {date}
Researcher: {your name if known}

## Identifiers

| Type | Value | Confidence |
|------|-------|------------|
| Name | {full name} | High |
| LinkedIn | {url or "unknown"} | {level} |
| Twitter/X | {handle or "unknown"} | {level} |
| GitHub | {username or "unknown"} | {level} |
| Email | {address or "unknown"} | {level} |
| Location | {city, country or "unknown"} | {level} |
| Employer | {company or "unknown"} | {level} |

## Context

**Relationship:** {how you know them}
**Purpose:** {why researching}

**Known facts:**
- {fact 1}
- {fact 2}

**Priority areas:**
- {area 1}
- {area 2}

**Depth:** {Quick / Standard / Deep}

## Starting Points

| Source | URL/Handle | Notes |
|--------|------------|-------|
| {platform} | {link} | {what to look for} |
```

## Quality Criteria

- [ ] Name provided
- [ ] At least one verifiable identifier (link, handle, or email)
- [ ] Research purpose stated
- [ ] Depth/scope defined
- [ ] Known facts documented

## Completion

Present: Seed file summary showing identifiers and context. Approve -> Explore.
