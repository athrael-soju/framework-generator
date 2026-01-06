# PRAXIS Examples

Worked examples demonstrating SPARC and IDEAS execution.

---

## Example: Vultr Engagement

Cloud infrastructure company acquired through SPARC, delivered via IDEAS.

### SPARC Execution

#### Signal

**Source:** LinkedIn, Crunchbase, News

**Signals Detected:**
| Date | Signal | Source | Strength |
|------|--------|--------|----------|
| Dec 2024 | $333M funding at $3.5B valuation | Crunchbase | Hot |
| Dec 2024 | 24K AMD MI355X GPU supercluster announcement | News | Hot |
| Dec 2024 | CMO posting about developer experience gaps | LinkedIn | Hot |
| Dec 2024 | DevRel and AI engineer job postings | LinkedIn Jobs | Warm |

**Assessment:** Multiple hot signals in target vertical. Immediate profile.

---

#### Profile

**Company Profile: Vultr**

| Field | Value |
|-------|-------|
| Legal Name | The Constant Company, LLC |
| HQ | Matawan, NJ |
| Founded | 2014 |
| Employees | ~200 |
| Funding | $333M (Dec 2024) @ $3.5B valuation |
| Vertical | Cloud infrastructure, GPU computing |

**Market Position:**
- 32 data centers across 6 continents
- NVIDIA Elite partner (early B200 access)
- Competitors: DigitalOcean, Linode/Akamai, Hetzner, OVHcloud

**Key People:**
| Name | Title | Notes |
|------|-------|-------|
| Kevin Cochrane | CMO | Active on LinkedIn, engaged with AI content |

**Technical Footprint:**
- GitHub: Limited org presence
- Docs: Functional but sparse vs competitors
- Community: No Discord/forum at scale

**Recent Activity (90 days):**
- Funding announcement
- AI supercluster announcement
- Hiring DevRel, AI solutions architects

---

#### Analyze

**Prospect Analysis Report: Vultr**

**Competitive Position:**

| Dimension | Vultr | DigitalOcean | Verdict |
|-----------|-------|--------------|---------|
| Data centers | 32 | 13 | Vultr ahead |
| Tutorial library | ~200 | 8,000+ | Gap |
| Community (Discord) | None | Active | Gap |
| GPU offerings | Strong | Gradient AI (new) | Competitive |
| Pricing transparency | High | High | Parity |

**Key Gaps:**
1. Documentation depth (6x fewer tutorials than DigitalOcean)
2. Community infrastructure absent
3. AI messaging strong on hardware, weak on developer experience

**Strategic Priorities (from public signals):**
- AI infrastructure investment (GPU supercluster)
- Developer acquisition (DevRel hiring)
- Competitive differentiation (CMO posts)

**Entry Point:**
- Buyer: CMO (Kevin Cochrane)
- Budget indicator: $333M funding, marketing leadership engaged
- What makes them look good: Developer growth metrics, competitive positioning

**Opportunity Areas:**
1. AI reference architectures and technical content
2. Developer experience benchmarking
3. Community infrastructure design
4. GPU performance validation

---

#### Rank

**Qualification Scorecard:**

| Criterion | Weight | Score | Rationale |
|-----------|--------|-------|-----------|
| Budget Indicators | 25% | 5 | $333M funding, $3.5B valuation |
| Problem Fit | 25% | 5 | AI research + DevRel + content = direct match |
| Timing | 20% | 5 | Active hiring, public AI push, CMO posting |
| Access | 15% | 4 | CMO active on LinkedIn, engaged with content |
| Strategic Value | 15% | 5 | Retainer potential, case study, referrals |

**Total: 4.8 / 5.0**

**Recommendation:** Prioritize — active outreach

---

#### Craft

**Outreach Message:**

> Saw your post about building out Vultr's AI developer experience — and noticed the gap between your GPU infrastructure investment and DigitalOcean's tutorial dominance came up in the comments.
>
> I've been researching this space and found that mid-market cloud providers have a specific window right now: enterprises are frustrated with hyperscaler complexity but need more than raw compute. Vultr's 32 data centers + NVIDIA Elite status is undersold.
>
> I help cloud infra companies translate AI capabilities into developer-facing content and positioning. Would a 20-minute call to share what I'm seeing in this space be useful?

**Supporting Brief:**
- Key gaps: Documentation depth, community infrastructure, AI messaging
- Likely priorities: DevRel buildout, competitive differentiation
- Entry point: CMO owns DevRel and Marketing
- Proposed engagement: Research retainer, $15K/month

**Outcome:** CMO responded, discovery call scheduled, proposal sent, agreement signed.

---

### IDEAS Execution

#### Identify

**Inputs:**
- Client Contract Agreement (Schedule 1: AI Reference Architectures — RAG, knowledge graphs, agentic workflows, ColPali, ColQwen)
- Client Analysis Report (Vultr needs technical content differentiating from DigitalOcean/competitors)

**Research Opportunities:**

| Priority | Opportunity | Contract Alignment | Research Gap |
|----------|-------------|-------------------|--------------|
| 1 | Hybrid retrieval vs late interaction | Enterprise RAG | No clear guidance on when to use ColPali vs traditional RAG |
| 2 | Knowledge graph augmented retrieval | Knowledge graphs | Limited production examples on cloud GPU |
| 3 | Multi-agent orchestration patterns | Agentic workflows | Fragmented best practices |

**Selected Focus:** Hybrid retrieval vs late interaction for document understanding

**Rationale:** 
- Directly addresses ColPali/ColQwen deliverable in contract
- Clear research question with testable hypothesis
- Publication potential + immediate DevRel content value

---

#### Develop

**Prior Work Review:**
- ColPali (Faysse et al., 2024): Late interaction for visual documents, strong on layout-heavy PDFs
- BGE-M3 (Chen et al., 2024): Hybrid dense+sparse, strong on text-dominant documents
- Gap: No systematic comparison for enterprise document types (invoices, contracts, technical docs)

**Hypothesis:**

```
IF document corpus is layout-heavy (forms, invoices, diagrams)
THEN late interaction models (ColPali/ColQwen) outperform hybrid retrieval
BECAUSE visual structure carries semantic information lost in text extraction
MEASURABLE BY retrieval accuracy on document-type stratified benchmarks
```

**Feasibility Assessment:**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Data Availability | 4 | ViDoRe public; need to curate enterprise-like subset |
| Resources | 5 | Vultr GPUs available per contract |
| Timeline | 4 | 4-5 weeks for full evaluation |
| Skill Match | 5 | Direct expertise area |
| Client Dependency | 4 | Need GPU allocation approval |

**Scope:**
- Included: ColPali, ColQwen2, BGE-M3, dense-only baseline
- Included: Document types — forms, contracts, technical PDFs, text-heavy reports
- Excluded: Training/fine-tuning (inference only)
- Excluded: Production deployment optimization (separate workstream)

---

#### Evaluate

**Data Collection:**

| Dataset | Document Type | Samples | Source |
|---------|---------------|---------|--------|
| ViDoRe-forms | Forms, invoices | 500 | ViDoRe subset |
| ViDoRe-technical | Diagrams, schematics | 500 | ViDoRe subset |
| Contract-QA | Legal contracts | 200 | Curated |
| Text-reports | Text-heavy PDFs | 300 | Curated |

**Experimental Setup:**
- GPU: Vultr L40S (ColPali, ColQwen), A100 (BGE-M3 for comparison)
- Metrics: Recall@5, Recall@10, MRR, latency (p50, p95)
- Controls: Same query set across all models, 3 runs averaged

**Results:**

| Model | Forms R@5 | Technical R@5 | Contracts R@5 | Text-heavy R@5 |
|-------|-----------|---------------|---------------|----------------|
| ColPali | **0.89** | **0.84** | 0.76 | 0.71 |
| ColQwen2 | **0.91** | **0.86** | 0.79 | 0.73 |
| BGE-M3 | 0.72 | 0.68 | **0.82** | **0.85** |
| Dense-only | 0.65 | 0.61 | 0.78 | 0.81 |

**Verdict:** Supported (High Confidence)
- Late interaction outperforms on layout-heavy documents (15-20% gain)
- Hybrid retrieval outperforms on text-dominant documents (10-15% gain)
- Crossover point identifiable by layout complexity heuristic

**Problem-Fit:** High — directly informs architecture decision framework for DevRel content

---

#### Articulate

**Contribution Positioning:**
- Novel: First systematic comparison across enterprise document types
- Quantified: Specific crossover thresholds for model selection
- Actionable: Decision framework for practitioners

**Deliverables:**

| Deliverable | Audience | Format |
|-------------|----------|--------|
| Research paper | Academic/technical community | ArXiv preprint |
| Architecture decision guide | Developers | Tutorial + flowchart |
| Benchmark harness | Developers | GitHub repo |
| Executive summary | Vultr marketing | 1-page brief |

**Decision Framework (for tutorial):**
```
Document Corpus Assessment:
├── >50% layout-heavy (forms, diagrams, tables)?
│   └── YES → ColPali/ColQwen pipeline
│   └── NO → Continue
├── >70% text-dominant?
│   └── YES → BGE-M3 hybrid pipeline
│   └── NO → Hybrid approach (route by document type)
```

**Implementation Roadmap:**
1. Week 1: Publish ArXiv preprint
2. Week 2: Tutorial + GitHub repo live
3. Week 3: Conference workshop proposal (if timing aligns)
4. Week 4: Marketing brief, social amplification

---

#### Share

**Delivery Channels:**

| Channel | Content | Status |
|---------|---------|--------|
| ArXiv | Full paper | Client review (30 days per contract 5.4) |
| GitHub | Benchmark harness + configs | Public on approval |
| Vultr blog | Tutorial adaptation | Draft to DevRel team |
| LinkedIn | Thread summarizing findings | Post-publication |

**Authorship (per contract 5.4):**
- Athos Georgiou — lead author
- Vultr acknowledgment in paper
- Co-authorship offered if Vultr engineer contributes substantially

**Feedback Collection:**
- GitHub issues for benchmark harness
- DevRel team review of tutorial
- Track citation/fork metrics

**Referral Opportunity:** Research positions Vultr for AI infrastructure conversations; request introductions to peer CMOs/DevRel leads at month 4.

**Outcome:** Engagement extended, case study approved, two referrals received.

---

## Research Publication Example

**Context:** Contract clause 5.4 permits publication with 30-day client review, removal of confidential information, and appropriate authorship attribution.

### Publication: ColPali Performance on Cloud GPU Infrastructure

**Target Venue:** ArXiv preprint → EMNLP Industry Track

**Title:** "Scaling Visual Document Retrieval: A Benchmark of ColPali and ColQwen on Consumer Cloud GPUs"

**Research Question:**
How do multimodal retrieval models (ColPali, ColQwen) perform across different GPU tiers available on cloud infrastructure, and what are the cost-performance tradeoffs for enterprise deployment?

**Methodology:**
| Phase | Activity | Output |
|-------|----------|--------|
| Setup | Deploy models on L40S, A100, MI300X | Reproducible environment configs |
| Benchmark | Run retrieval on ViDoRe, DocVQA, InfoVQA | Latency, throughput, accuracy metrics |
| Analysis | Cost-performance curves, batch size optimization | Deployment recommendations |
| Validation | Compare against published baselines | Delta analysis |

**Key Contributions:**
1. First public benchmark of ColQwen2 on AMD MI300X
2. Cost-performance Pareto frontier for visual retrieval workloads
3. Batch size optimization guidelines for different document volumes
4. Open-source benchmark harness

**Authorship:**
- Athos Georgiou (NCA) — lead author, methodology, analysis
- [Vultr engineer] — infrastructure, reproducibility review
- Acknowledgment: "Research conducted in collaboration with Vultr"

**Client Value:**
- Positions Vultr as serious AI infrastructure player
- Demonstrates MI300X competitive with NVIDIA for retrieval workloads
- Drives developer interest through technical credibility

**Timeline:**
| Week | Milestone |
|------|-----------|
| 1-2 | Environment setup, baseline runs |
| 3-4 | Full benchmark suite execution |
| 5 | Analysis and draft |
| 6 | Client review (30-day window starts) |
| 10 | Submit to ArXiv |

---

## Proof of Concept Example

### PoC: Agentic RAG Pipeline on Vultr GPU Cloud

**Objective:** Demonstrate end-to-end agentic RAG architecture running on Vultr infrastructure, suitable for DevRel content and conference workshops.

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                    Vultr GPU Cloud                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Embedding  │  │  Reranker   │  │    LLM      │         │
│  │  (BGE-M3)   │  │  (ColBERT)  │  │ (Llama 3.1) │         │
│  │   L40S      │  │    L40S     │  │   A100      │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                    ┌─────▼─────┐                            │
│                    │  Agent    │                            │
│                    │  Router   │                            │
│                    └─────┬─────┘                            │
│                          │                                  │
│         ┌────────────────┼────────────────┐                 │
│         │                │                │                 │
│    ┌────▼────┐     ┌────▼────┐     ┌────▼────┐             │
│    │ Search  │     │  Code   │     │  SQL    │             │
│    │  Tool   │     │  Exec   │     │  Query  │             │
│    └─────────┘     └─────────┘     └─────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Components:**

| Component | Model/Tool | GPU | Purpose |
|-----------|------------|-----|---------|
| Embedder | BGE-M3 | L40S | Hybrid dense+sparse retrieval |
| Reranker | ColBERTv2 | L40S | Cross-encoder reranking |
| Generator | Llama 3.1 70B | A100 | Response generation |
| Vector Store | Qdrant | CPU | Document index |
| Orchestrator | Claude Agent SDK | — | Tool routing, planning |

**Features Demonstrated:**
1. Hybrid retrieval (dense + sparse + late interaction)
2. Agentic tool use (search, code execution, SQL)
3. Multi-GPU pipeline with optimal placement
4. Streaming responses with citation grounding

**Deliverables:**

| Deliverable | Format | Audience |
|-------------|--------|----------|
| GitHub repo | Code + Docker Compose | Developers |
| Tutorial | Markdown + video | DevRel content |
| Benchmark results | Report | Marketing |
| Workshop materials | Slides + exercises | Conferences |

**Infrastructure Spec:**
```yaml
# vultr-rag-cluster.yaml
nodes:
  embedding:
    type: vgpu-l40s-48gb
    count: 1
  reranker:
    type: vgpu-l40s-48gb
    count: 1
  generator:
    type: vgpu-a100-80gb
    count: 1
  orchestrator:
    type: cpu-optimized-32vcpu
    count: 1

estimated_cost: $12.50/hour (on-demand)
```

**Success Metrics:**
| Metric | Target |
|--------|--------|
| End-to-end latency (simple query) | <3s |
| End-to-end latency (agentic, 3 tools) | <10s |
| Retrieval accuracy (ViDoRe subset) | >85% |
| Tutorial completion rate | >70% |
| GitHub stars (6 months) | >500 |

**Timeline:**
| Week | Milestone |
|------|-----------|
| 1 | Architecture design, infra provisioning |
| 2 | Core pipeline (embed → retrieve → generate) |
| 3 | Agent routing, tool integration |
| 4 | Optimization, benchmarking |
| 5 | Documentation, tutorial draft |
| 6 | Client review, publish |

---

**Outcome:** Engagement extended, case study approved, two referrals received.

---

## Stage Output Templates

### Signal Log Entry
```yaml
date: YYYY-MM-DD
company: Company Name
signal_type: funding | hiring | announcement | social | technical
source: Source Name
url: https://...
strength: hot | warm | watch
notes: Brief context
```

### Company Profile
```yaml
company:
  legal_name: 
  dba: 
  hq: 
  founded: 
  employees: 
  funding_history:
    - round: 
      amount: 
      date: 
      valuation: 

market:
  vertical: 
  competitors: []
  differentiation: 

people:
  - name: 
    title: 
    notes: 

technical:
  github: 
  docs_quality: 
  community: 

recent_activity: []
```

### Qualification Score
```yaml
company: 
date: 
scores:
  budget: {score: , rationale: }
  problem_fit: {score: , rationale: }
  timing: {score: , rationale: }
  access: {score: , rationale: }
  strategic_value: {score: , rationale: }
total: 
recommendation: prioritize | qualified | nurture | pass
```

### Hypothesis Document
```yaml
id: 
opportunity: 
statement:
  if: 
  then: 
  because: 
  measurable_by: 

prior_work: []

feasibility:
  data_availability: {score: , notes: }
  resources: {score: , notes: }
  timeline: {score: , notes: }
  skill_match: {score: , notes: }
  client_dependency: {score: , notes: }
  total: 

scope:
  included: []
  excluded: []

risks: []
```