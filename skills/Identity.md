# Identity Skill

The Identity skill defines your professional profile to inform client acquisition and research delivery.

For conceptual overview, see [Identity.md](../methodologies/Identity.md). For execution patterns, see [Execution.md](../architecture/Execution.md).

---

## Skill Architecture

```
.claude/skills/
└── identity/SKILL.md    # Identity skill methodology
```

The skill is a self-contained instruction set that defines:
- **Inputs**: What information to collect from the user
- **Process**: Four-phase methodology (Collect, Discover, Enquire, Synthesize)
- **Outputs**: Structured YAML profile
- **Decision Points**: Where user input is required
- **Quality Criteria**: Checklist before completion

---

## Skill Overview

| Skill | Command | Purpose | Details |
|-------|---------|---------|---------|
| Identity | `/identity` | Define professional identity profile | [SKILL.md](../.claude/skills/identity/SKILL.md) |

---

## Skill Execution

Run the Identity skill once to initialize PRAXIS:

```
/identity          # Define your professional profile
```

Update when your positioning shifts, you add services, or constraints change.

---

## Key Concepts

### Profile Sections

The Identity profile captures:

| Section | Purpose |
|---------|---------|
| `identity` | Name, tagline, contact information |
| `positioning` | Who you help, with what, differentiation |
| `expertise` | Skills, methods, tools |
| `experience` | Industries, notable projects |
| `services` | Offerings, price points, engagement types |
| `ideal_client` | Characteristics, signals, red flags |
| `constraints` | Rates, availability, deal-breakers |

### Integration with SPARC

The Identity profile informs every SPARC stage:

| Stage | Profile Input Used |
|-------|-------------------|
| Signal | `ideal_client.signals` — Buying indicators to weight |
| Profile | `ideal_client.characteristics` — Criteria for comparison |
| Analyze | `positioning`, `expertise` — Finding angles |
| Rank | `ideal_client`, `constraints` — Scoring weights |
| Craft | `positioning`, `services` — Value proposition |

### Integration with IDEAS

The Identity profile informs research scoping:

| Stage | Profile Input Used |
|-------|-------------------|
| Identify | `expertise.primary` — Filter to strengths |
| Develop | `expertise.methods` — Available approaches |
| Evaluate | `expertise.tools` — Feasible data sources |
| Articulate | `services.offerings` — Frame recommendations |
| Share | `positioning` — Professional framing |

---

## When to Update

Update your Identity profile when:
- You add a new service offering
- Your positioning shifts
- You learn new deal-breakers from bad experiences
- Your rate or availability changes significantly
- You gain experience in a new industry
