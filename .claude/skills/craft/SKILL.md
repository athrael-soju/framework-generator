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
| priority_ranking | Rank stage | Prospects to craft outreach for |
| prospect_analyses | Analyze stage | Context for personalization |
| outreach_templates | Configuration | Message templates by channel |
| channel | Configuration | linkedin_dm or email |

## Process

### 1. Decision-Maker Identification

For each prioritized prospect:

**Find the Right Person**
- Target: VP Engineering, Head of DevRel, CTO
- Tool: `web_search` "[company] [title] linkedin"
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

Tool: `web_search`, `web_fetch`

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

## Tools Available

| Tool | Purpose |
|------|---------|
| `web_search` | Research decision-makers |
| `web_fetch` | Read their content |
| `save_document` | Persist outreach materials |
| `get_document` | Retrieve analyses and rankings |

## Quality Criteria

- [ ] Decision-maker identified and researched
- [ ] Hook is genuinely personalized
- [ ] Insight demonstrates research depth
- [ ] Ask is low-commitment
- [ ] Talking points prepared

## Completion

When finished:
1. Save outreach_brief using `save_document`
2. Call `request_approval` with:
   - Outreach ready for X prospects
   - Sample message for review
   - Recommended send timing
   - Handoff readiness to IDEAS (if signed)
