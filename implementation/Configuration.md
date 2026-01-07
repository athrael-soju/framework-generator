# PRAXIS Configuration

Configuration inputs referenced by SPARC and IDEAS skills. Store in your preferred format (YAML, JSON, Notion database, etc.).

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

## Signal Configuration

```yaml
# What signals to monitor and how to score them
signal_config:
  sources:
    - name: Crunchbase
      check_frequency: weekly
      signal_types: [funding]

    - name: LinkedIn
      check_frequency: daily
      signal_types: [hiring, content]

    - name: Job Boards
      check_frequency: weekly
      signal_types: [hiring]
      keywords: [DevRel, Developer Advocate, Technical Writer, API]

    - name: News/Alerts
      check_frequency: daily
      signal_types: [news, product]

  scoring:
    hot_criteria:
      - Funding + DevRel hiring in last 14 days
      - Multiple strong signals same company
    warm_criteria:
      - Single funding event
      - 3+ relevant job postings
    watch_criteria:
      - Single weak signal
      - Mentioned relevant technology

  lookback_days: 30
```

---

## Analysis Dimensions

```yaml
# What to compare in competitive analysis
analysis_dimensions:
  - name: documentation_depth
    weight: 20%
    assessment: Review docs site structure and coverage

  - name: community_size
    weight: 15%
    assessment: Discord/Slack member counts, forum activity

  - name: developer_experience
    weight: 20%
    assessment: Onboarding flow, SDK quality, time-to-first-success

  - name: content_quality
    weight: 15%
    assessment: Blog depth, tutorial coverage, technical accuracy

  - name: pricing_transparency
    weight: 10%
    assessment: Clarity of pricing page, self-serve options

  - name: enterprise_features
    weight: 10%
    assessment: SSO, audit logs, compliance certifications

  - name: api_design
    weight: 10%
    assessment: Consistency, documentation, versioning strategy
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
