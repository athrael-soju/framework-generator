# Identity Template

Profile template for the Identity methodology.

---

## Professional Identity Profile

```yaml
# Identity Profile
# Generated: YYYY-MM-DD
# Sources: [linkedin, portfolio, github, ...]

identity:
  name:
  tagline:                    # One-line positioning (e.g., "AI researcher helping devtools companies ship better docs")
  contact:
    email:
    linkedin:
    website:
    github:

positioning:
  who_you_help:               # Specific audience (e.g., "Series A-C devtools startups")
  with_what_problem:          # Core problem you solve
  differentiation:            # Why you over alternatives
  proof_points:               # Evidence supporting claims
    -

expertise:
  primary:                    # Core skills you lead with
    -
  secondary:                  # Supporting skills
    -
  methods:                    # Frameworks, approaches you use
    -
  tools:                      # Technologies, platforms
    -

experience:
  industries:
    -
  years:
  notable_projects:
    - project:
      client_type:            # Industry/size (e.g., "Series B fintech")
      outcome:                # Measurable result
      relevance:              # Why this project matters for positioning

services:
  offerings:
    - name:
      description:
      price_range:            # e.g., "$5k-15k" or "$200/hr"
      engagement_type:        # project | retainer | advisory | workshop

ideal_client:
  characteristics:            # Company attributes that indicate fit
    -
  signals:                    # Buying indicators to watch for
    -
  red_flags:                  # Warning signs to avoid
    -

constraints:
  rate_floor:                 # Minimum acceptable rate
  availability:               # e.g., "20 hrs/week" or "1 project at a time"
  geography:                  # Timezone or location preferences
  deal_breakers:              # Absolute no-gos
    -
```

---

## Example Profile

```yaml
# Identity Profile
# Generated: 2025-01-15
# Sources: linkedin, portfolio, github

identity:
  name: Alex Chen
  tagline: AI researcher helping devtools companies ship developer content that converts
  contact:
    email: alex@example.com
    linkedin: linkedin.com/in/alexchen
    website: alexchen.dev
    github: github.com/alexchen

positioning:
  who_you_help: Series A-C devtools and API companies
  with_what_problem: Developer content that doesn't convert (docs, tutorials, guides)
  differentiation: Former ML engineer who writes; can translate complex technical concepts for developer audiences
  proof_points:
    - Increased Acme API's docs engagement by 40%
    - Published in IEEE Software
    - 10+ years shipping developer products

expertise:
  primary:
    - Developer documentation strategy
    - Technical content creation
    - Developer experience research
  secondary:
    - API design review
    - Community building
    - Developer relations
  methods:
    - Jobs-to-be-done framework
    - Documentation audits
    - Developer journey mapping
  tools:
    - Python, TypeScript
    - OpenAI API, Anthropic Claude
    - Notion, Linear, GitHub

experience:
  industries:
    - Developer tools
    - AI/ML platforms
    - Cloud infrastructure
  years: 12
  notable_projects:
    - project: Acme API Documentation Overhaul
      client_type: Series B developer platform
      outcome: 40% increase in docs-to-signup conversion
      relevance: Demonstrates measurable content impact
    - project: CloudCo Developer Portal
      client_type: Enterprise cloud provider
      outcome: Reduced support tickets by 25%
      relevance: Shows enterprise-scale delivery

services:
  offerings:
    - name: Documentation Audit
      description: Comprehensive review of existing docs with prioritized recommendations
      price_range: $5k-8k
      engagement_type: project
    - name: Content Strategy Retainer
      description: Ongoing content planning, creation, and optimization
      price_range: $8k-12k/month
      engagement_type: retainer
    - name: Developer Research Sprint
      description: Interview developers, synthesize insights, deliver recommendations
      price_range: $15k-25k
      engagement_type: project

ideal_client:
  characteristics:
    - Series A-C with $10M+ funding
    - Developer-focused product (API, SDK, devtool)
    - Existing docs that need improvement (not greenfield)
    - Technical founder or strong engineering culture
  signals:
    - Hiring DevRel or technical writer
    - Recent funding round
    - Public complaints about docs quality
    - Competitor just shipped better docs
  red_flags:
    - No engineering involvement in content decisions
    - Wants "viral content" not useful docs
    - Budget below $5k
    - Expects overnight results

constraints:
  rate_floor: $200/hr or $5k minimum project
  availability: 1-2 concurrent projects max
  geography: Remote, US timezone preferred
  deal_breakers:
    - Crypto/web3 projects
    - Ghostwriting without attribution
    - Scope creep without renegotiation
    - Net-60+ payment terms
```
