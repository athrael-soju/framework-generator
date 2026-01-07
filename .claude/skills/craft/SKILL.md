---
name: craft
description: Execute SPARC Craft stage to create personalized outreach. Use after Rank stage to build decision-maker profiles and draft tailored messages for prioritized prospects.
---

# Craft Stage

Create personalized outreach for prioritized prospects.

## Objective

Research decision-makers and craft personalized outreach messages that reference specific signals, gaps, and relevant context.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| identity_profile | Identity stage | Your `positioning` and `services` for value proposition |
| priority_ranking | Rank stage | Prospects to craft outreach for |
| prospect_analyses | Analyze stage | Context for personalization |
| outreach_templates | Configuration | Message templates by channel |
| channel | Configuration | linkedin_dm or email |

## Process

### 1. Decision-Maker Identification

For each prioritized prospect:

**Find the Right Person**
- Target: VP Engineering, Head of DevRel, CTO
- Search "[company] [title] linkedin"
- Identify 1-2 contacts per company

### 2. Decision-Maker Research

Build profile for each contact:

**Professional Background**
- Current role and tenure
- Previous companies and roles
- Career trajectory

**Recent Activity**
- LinkedIn posts and articles
- Conference talks
- Podcast appearances
- GitHub activity (if technical)

**Connection Paths**
- Mutual connections
- Shared communities
- Common background (schools, companies)

### 3. Message Drafting

Structure each message:

**1. Hook (First Line)**
- Reference their specific content/activity
- Or reference a specific company signal
- Must be personalized, not generic

**2. Insight (Value Add)**
- Share a non-obvious observation from your analysis
- Something they may not have seen
- Demonstrates research depth

**3. Bridge (Connection)**
- Connect the gap to your capability
- Brief, not a pitch
- Focus on their problem, not your solution

**4. Ask (Call to Action)**
- Low commitment
- Specific and easy to say yes to
- "15 minutes to share what we've seen" not "buy our services"

### 4. Message Variants

Create 2-3 variants per prospect:
- Different hooks (signal-based vs content-based)
- Different tones (direct vs consultative)
- A/B test potential

### 5. Talking Points Brief

Prepare for responses:

```
## If They Reply: Key Points

### Their Likely Questions
- "What specifically did you notice?"
- "Who else have you worked with?"
- "What would this cost?"

### Your Responses
- [Prepared answer with evidence]
- [Case study reference]
- [Deflect to discovery call]

### Objection Handling
- "We're not looking right now" → [Response]
- "We handle this internally" → [Response]
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| decision_maker_profiles | document | Research on each contact |
| outreach_messages | document | Drafted messages with variants |
| talking_points | document | Response preparation |
| outreach_brief | document | Summary for execution |

## Channel Guidelines

| Channel | Length | Tone | CTA |
|---------|--------|------|-----|
| LinkedIn DM | <300 chars | Casual, direct | "Quick chat?" |
| Email | 3-4 paragraphs | Professional | "15 min call" |

## Anti-Patterns to Avoid

- Generic openings ("Hope this finds you well")
- Feature/service dumps
- Immediate hard pitch
- No clear ask
- Obviously templated

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Decision-maker selection | Clarification | Which contact to target first |
| Channel selection | Decision | Email, LinkedIn, warm intro, event |
| Message variant selection | Decision | Choose from generated variants |
| Tone/positioning | Clarification | Formal/casual, technical/business focus |
| Stage completion | Approval | Approve → Send, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] Decision-maker identified and researched
- [ ] Hook is genuinely personalized
- [ ] Insight demonstrates research depth
- [ ] Ask is low-commitment
- [ ] Talking points prepared

## Completion

When finished, present for approval:
- Outreach ready for X prospects
- Sample message for review
- Recommended send timing
- Next steps: send outreach, await response, transition to IDEAS if signed

## Artifact Persistence

On approval, save outputs to run directory:
1. Create stage folder: `artifacts/5_craft_YYYY-MM-DD/`
2. Save outreach message to `artifacts/5_craft_YYYY-MM-DD/outreach_message.md`
3. Save outreach brief to `artifacts/5_craft_YYYY-MM-DD/outreach_brief.yaml`
4. Log decision to `decisions.md` with rationale
5. Update `run.yaml` with `current_stage: craft`
6. On signed agreement, set `outcome: signed_agreement` and initiate IDEAS run

See [Execution.md](../../../architecture/Execution.md#artifact-persistence) for structure details.
