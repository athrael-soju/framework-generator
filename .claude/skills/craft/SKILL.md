---
name: craft
description: Execute SPARC Craft stage to create personalized outreach. Use after Rank stage to build decision-maker profiles and draft tailored messages for prioritized prospects.
---

# Craft

Research decision-makers. Draft personalized outreach messages.

## Inputs

| Input | Source |
|-------|--------|
| identity_profile | Identity stage (`positioning`, `services`) |
| priority_ranking | Rank stage |
| prospect_analyses | Analyze stage |
| channel | linkedin_dm or email |

### Input Format

**From Identity profile (`output/identity/profile.md`):**

```yaml
positioning:
  who_you_help: [Audience]
  differentiation: [Why you]

services:
  - name: [Offering]
    description: [What's included]
```

**From Rank stage (`output/sparc/{date}/qualification.md`):**

```markdown
## Result
**Total Score:** [Score]
**Recommendation:** prioritize / qualified
```

**From Analyze stage (`output/sparc/{date}/{company}-analysis.md`):**

```markdown
## Entry Point
**Buyer Persona:** [Who to contact]
**Access Path:** [How to reach]

## Recommended Approach
**Value Proposition:** [What to offer]
```

**User-provided:**

```yaml
channel: linkedin_dm  # or email, warm_intro
```

## Process

**1. Research** — Decision-maker background, recent activity, posts
**2. Draft** — Hook + insight + bridge + ask
**3. Variants** — 2-3 message options
**4. Talking points** — Prepare for responses

## Message Structure

| Component | Purpose |
|-----------|---------|
| Hook | Reference specific signal/content |
| Insight | Non-obvious observation |
| Bridge | Connect gap to capability |
| Ask | Low-commitment next step |

## Output

Save to `output/sparc/{date}/` (same date as Signal).

| File | Content |
|------|---------|
| `run.md` | Append Craft decisions and outcome |
| `{company}-outreach.md` | Outreach message + brief |

### Outreach Brief ({company}-outreach.md)

```markdown
# Outreach Brief: [Prospect Name]

Date: YYYY-MM-DD
Channel: linkedin_dm / email / warm_intro

---

## Decision Maker

**Name:**
**Title:**
**LinkedIn:** [URL]

### Recent Activity
- [Recent post, talk, or activity relevant to outreach]

---

## Message

**Hook:** [Opening that grabs attention]

**Insight:** [Observation that demonstrates understanding]

**Bridge:** [Connection to your value]

**Ask:** [Clear, low-friction next step]

---

## Message Variants

### Variant 1
**Hook:** [Alternative opening]
**Tone:** [e.g., more casual, more formal]

### Variant 2
**Hook:** [Alternative opening]
**Tone:** [e.g., different angle]

---

## Talking Points

### Likely Questions

| Question | Response |
|----------|----------|
| [Anticipated question] | [Prepared response] |

### Objection Handling

| Objection | Response |
|-----------|----------|
| [Likely objection] | [How to address it] |
```

### Run Log (run.md) - Append

```markdown
---

## Craft - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{company}-outreach.md`
```

## Channel Limits

| Channel | Length | Tone |
|---------|--------|------|
| LinkedIn DM | <300 chars | Casual, direct |
| Email | 3-4 paragraphs | Professional |

## Quality Criteria

- [ ] Decision-maker researched
- [ ] Hook genuinely personalized
- [ ] Insight shows research depth
- [ ] Ask is low-commitment
- [ ] Talking points prepared

## Completion

Present: messages ready, samples, send timing. Approve → Send.
