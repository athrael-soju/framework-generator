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

Save to `output/sparc/{date}/{company}-outreach.md`.

See [template.md](template.md) for format.

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
