# PRAXIS Configuration

Configuration inputs referenced by PRAXIS models.

This file contains **Identity configuration** - shared settings used by multiple models (SPARC, RECON). Model-specific criteria, thresholds, and scoring weights are embedded directly in each skill's SKILL.md file.

---

## Positioning Statement

```yaml
# Who you help, with what, and your differentiation
positioning:
  target: Developer-focused companies (APIs, tools, infrastructure)
  problem: Need to improve developer experience and adoption
  solution: Research-backed content strategy and technical writing
  differentiation: Combine AI/ML research expertise with DevRel experience

  one_liner: |
    I help developer-focused companies improve adoption through
    research-backed content and developer experience optimization.
```

---

## Ideal Client Profile

```yaml
# Company characteristics indicating fit
ideal_client:
  company_stage:
    preferred: [Series A, Series B, Series C]
    minimum: Series A

  employee_count:
    preferred: 50-500
    minimum: 20

  verticals:
    - Developer tools
    - API platforms
    - Cloud infrastructure
    - AI/ML infrastructure

  signals:
    strong:
      - DevRel hiring
      - Recent funding
      - API/platform launch
    moderate:
      - Technical content push
      - Community building
    weak:
      - General marketing hire

  disqualifiers:
    - Pre-seed/seed only
    - No developer audience
    - Purely consumer-focused
```

---

## Service Offerings

```yaml
# What you deliver and at what price points
services:
  - name: Research Retainer
    description: Ongoing research and content partnership
    deliverables:
      - Monthly research report
      - Technical content (2-4 pieces)
      - Quarterly strategy review
    pricing:
      model: monthly_retainer
      range: $10,000-20,000/month
      minimum_term: 3 months

  - name: Developer Experience Audit
    description: Comprehensive DX assessment with recommendations
    deliverables:
      - Documentation audit
      - Onboarding analysis
      - Competitive benchmarking
      - Prioritized recommendations
    pricing:
      model: fixed_project
      range: $15,000-25,000
      timeline: 4-6 weeks

  - name: Technical Content Package
    description: Research-backed content creation
    deliverables:
      - Deep-dive articles (3-5)
      - Supporting code samples
      - Distribution strategy
    pricing:
      model: fixed_project
      range: $8,000-15,000
      timeline: 4-8 weeks
```

---

## Expertise Inventory

```yaml
# Your skills, methods, and past work
expertise:
  domains:
    - AI/ML systems and applications
    - Developer tools and APIs
    - Technical content strategy
    - Developer experience optimization

  methods:
    - Quantitative benchmarking
    - User research and interviews
    - Competitive analysis
    - Documentation audits

  tools:
    - Python, JavaScript, Go
    - LLM frameworks (LangChain, Claude SDK)
    - Data analysis (pandas, SQL)
    - Content platforms (various CMS)

  past_work:
    - client: [Anonymized cloud provider]
      type: DX audit
      outcome: 40% improvement in onboarding completion

    - client: [Anonymized API company]
      type: Content strategy
      outcome: 3x increase in technical blog traffic

  constraints:
    max_concurrent_engagements: 2
    travel: Limited
    timezone: US Eastern
```
