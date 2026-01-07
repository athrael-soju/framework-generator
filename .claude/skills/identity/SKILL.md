---
name: identity
description: Generate a professional identity profile from user inputs and public sources. Run once to initialize PRAXIS, then update when positioning shifts. The profile informs all SPARC and IDEAS work.
---

# Identity

Define your professional identity to inform client acquisition and research delivery.

## Objective

Create a structured YAML profile capturing who you are, what you offer, and who you serve. This profile becomes the foundation for SPARC signal detection and IDEAS research scoping.

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| name | Yes | Professional name |
| linkedin | Recommended | Profile URL |
| portfolio | Recommended | Website or work samples URL |
| github | Optional | GitHub profile URL |
| other_links | Optional | Publications, talks, social profiles |

## Process

### Phase 1: Collect

Prompt user for basic inputs:

```
I need some basic information to build your professional profile.

Required:
- Your professional name

Recommended (provide URLs):
- LinkedIn profile
- Portfolio or website

Optional:
- GitHub profile
- Other relevant links (publications, talks, social)

Any additional context you'd like to share?
```

### Phase 2: Discover

Research provided links to extract information:

**LinkedIn**
- Current and past roles
- Companies and tenure
- Skills and endorsements
- Recommendations received

**Portfolio/Website**
- Project types and case studies
- Industries served
- Outcomes and metrics highlighted
- Services described

**GitHub**
- Primary languages
- Notable repositories
- Contribution patterns
- Open source involvement

**Other Sources**
- Publication topics and venues
- Speaking engagements
- Social media themes

Document what was found and what gaps remain.

### Phase 3: Enquire

Ask targeted questions to fill gaps. Adapt based on what was discovered.

**Core Questions:**

| Category | Questions |
|----------|-----------|
| Expertise | What are you genuinely expert at? What do you want to be known for? |
| Services | What do you offer clients? What do you refuse to do? |
| Ideal Client | What makes a client ideal for you? What are warning signs? |
| Differentiation | What do you do that others don't? Why hire you over alternatives? |
| Constraints | Rate expectations? Availability? Geography? Deal-breakers? |

**Skip questions when:**
- Answer is evident from discovered information
- User provided context that addresses it

**Dig deeper when:**
- Answers are generic ("I help companies with technology")
- Positioning overlaps with many competitors
- Constraints are vague

### Phase 4: Synthesize

Combine all findings into structured YAML profile.

**Profile Sections:**

| Section | Content |
|---------|---------|
| identity | Name, tagline, contact info |
| positioning | Who you help, problem solved, differentiation |
| expertise | Primary/secondary skills, methods, tools |
| experience | Industries, years, notable projects |
| services | Offerings with descriptions and price ranges |
| ideal_client | Characteristics, buying signals, red flags |
| constraints | Rate floor, availability, geography, deal-breakers |

**Writing Guidelines:**
- Be specific, not generic
- Use concrete examples where possible
- Keep total profile under 200 lines
- Ensure ideal_client criteria are actionable filters

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| profile | YAML | Complete professional identity profile |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Missing recommended inputs | Clarification | Proceed without (note gaps), provide alternative source, skip profile creation |
| Conflicting information (e.g., LinkedIn vs portfolio) | Decision | Trust LinkedIn, trust portfolio, ask user to clarify |
| Generic positioning detected | Decision | Dig deeper with follow-up questions, accept as-is with caveat |
| Profile completion | Approval | Approve, Edit sections, Retry from phase, Abort |

## Quality Criteria

- [ ] Name and at least one contact method captured
- [ ] Public sources researched (not just self-reported)
- [ ] Positioning statement is specific (not "I help companies succeed")
- [ ] Expertise lists concrete skills, not buzzwords
- [ ] Ideal client characteristics are filterable
- [ ] At least 2 red flags identified
- [ ] Constraints include rate floor and deal-breakers
- [ ] Profile is succinct (<200 lines YAML)

## Completion

When finished, present for approval:
- Summary of sources researched
- Profile sections completed
- Any gaps or caveats
- Quality criteria checklist results

On approval, save profile to `praxis/identity/profile.yaml` and confirm it's ready for SPARC/IDEAS use.

## Artifact Persistence

On approval, save outputs:
1. Create directory: `praxis/identity/`
2. Save profile to `praxis/identity/profile.yaml`
3. Log creation date and sources used

For updates, version the prior profile as `profile_YYYY-MM-DD.yaml` before overwriting.
