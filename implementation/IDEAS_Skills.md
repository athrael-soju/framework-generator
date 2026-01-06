# IDEAS Skills

Atomic skill definitions for IDEAS agents.

---

## Core Skills

### web_search

**Purpose:** Search the web for specific queries.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| query | string | yes | Search query |
| filters | object | no | Date range, domain restrictions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| results | array | Ranked results with title, snippet, url |

**Tools:** research-mcp

---

### web_fetch

**Purpose:** Fetch and parse content from a URL.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | yes | URL to fetch |
| extract | string | no | What to extract: "text", "links", "structured" |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| content | string | Extracted content |
| metadata | object | Title, description, publish date if available |

**Tools:** research-mcp

---

## Identify Stage Skills

### contract_review

**Purpose:** Extract scope constraints and deliverable requirements from contract.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| contract | object | yes | Client Contract Agreement |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| scope_constraints | array | Boundaries and limitations |
| deliverables | array | Required outputs with format and timeline |
| stakeholders | array | Key people and their roles |
| terms | object | Relevant contractual terms (IP, publication, confidentiality) |

**Process:**
1. Parse contract sections for scope definition
2. Extract explicit deliverables with deadlines
3. Identify stakeholders and approval chains
4. Flag relevant IP and publication terms

---

### gap_analysis

**Purpose:** Identify gaps between client's current and desired state.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| client_analysis | object | yes | Client Analysis Report from SPARC |
| contract_scope | object | yes | From contract_review |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| gaps | array | Identified gaps with severity (critical/major/minor) |
| current_state | object | Summary of where client is now |
| desired_state | object | Summary of where client wants to be |

**Process:**
1. Map client analysis findings to contract scope
2. Identify discrepancies between current and desired state
3. Assess gap severity by business impact
4. Filter to gaps within engagement scope

**Tools:** web_search, web_fetch (for additional context)

---

### opportunity_mapping

**Purpose:** Map identified gaps to tractable research opportunities.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| gaps | array | yes | From gap_analysis |
| expertise | object | yes | Your expertise inventory |
| constraints | object | yes | Timeline, resources, access limitations |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| opportunities | array | Research opportunities with gap alignment |
| initial_hypotheses | array | Preliminary hypothesis seeds per opportunity |
| feasibility_notes | object | Initial tractability assessment |

**Process:**
1. For each gap, assess if addressable through research
2. Match gaps to your expertise areas
3. Generate initial hypothesis directions
4. Flag opportunities requiring resources outside constraints

---

### prioritization

**Purpose:** Prioritize research opportunities for execution.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| opportunities | array | yes | From opportunity_mapping |
| client_priorities | array | yes | Stated client priorities |
| timeline | object | yes | Engagement timeline |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| prioritized_agenda | array | Ranked opportunities with rationale |
| selected | array | Opportunities selected for this engagement |
| deferred | array | Opportunities for future consideration |

**Process:**
1. Score opportunities by client value impact
2. Assess timeline fit for each opportunity
3. Consider dependencies between opportunities
4. Select top opportunities fitting engagement scope
5. Document deferred items with reasoning

---

## Develop Stage Skills

### prior_work_review

**Purpose:** Survey existing literature and prior work for a research opportunity.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| opportunity | object | yes | Selected research opportunity |
| search_scope | string | no | academic, industry, or both (default: both) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| literature | array | Relevant papers, reports, articles with summaries |
| known_findings | array | Established facts in this area |
| open_questions | array | Unresolved questions from prior work |
| methodologies | array | Approaches used by others |

**Tools:** web_search, web_fetch

**Process:**
1. Search academic databases and industry sources
2. Identify seminal and recent work
3. Extract key findings and methodologies
4. Identify gaps in existing research
5. Note methodological approaches for replication/adaptation

---

### hypothesis_refinement

**Purpose:** Transform initial hypotheses into formal, testable statements.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| initial_hypothesis | string | yes | Preliminary hypothesis seed |
| prior_work | object | yes | From prior_work_review |
| constraints | object | yes | Available data, resources, timeline |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| hypothesis | object | Formal hypothesis with IF/THEN/BECAUSE/MEASURABLE BY |
| assumptions | array | Underlying assumptions |
| required_evidence | array | Evidence types needed to test |
| falsification_criteria | string | What would disprove the hypothesis |

**Hypothesis Structure:**
```
IF [intervention/condition]
THEN [expected outcome]
BECAUSE [mechanism/rationale]
MEASURABLE BY [metric/evidence]
```

**Process:**
1. Refine vague hypothesis into specific, testable form
2. Identify mechanism or rationale
3. Define measurable outcomes
4. State assumptions explicitly
5. Define falsification criteria

---

### feasibility_assessment

**Purpose:** Assess feasibility of pursuing a hypothesis.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| hypothesis | object | yes | From hypothesis_refinement |
| resources | object | yes | Available resources (time, compute, data access) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| scores | object | Feasibility scores by criterion |
| total | number | Weighted total (0-5) |
| risks | array | Identified risks with mitigation strategies |
| recommendation | string | proceed/modify/defer/abandon |

**Criteria:**
| Criterion | Weight | Questions |
|-----------|--------|-----------|
| data_availability | 25% | Can we access needed data? |
| resource_requirements | 25% | Time, compute, tools available? |
| timeline_fit | 20% | Completable within engagement? |
| skill_match | 15% | Requires expertise we have? |
| client_dependency | 15% | How much depends on client responsiveness? |

**Thresholds:**
- 4.0+ → proceed
- 3.0-3.9 → proceed with modifications
- 2.0-2.9 → defer or restructure
- <2.0 → abandon

---

### scope_definition

**Purpose:** Define precise research scope for approved hypothesis.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| hypothesis | object | yes | Approved hypothesis |
| feasibility | object | yes | From feasibility_assessment |
| timeline | object | yes | Available time |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| included | array | Explicitly in scope |
| excluded | array | Explicitly out of scope |
| data_sources | array | Data sources to be used |
| methods | array | Methodologies to be applied |
| milestones | array | Key checkpoints with dates |

**Process:**
1. Define what is explicitly included
2. Define what is explicitly excluded (and why)
3. Specify data sources and access methods
4. Select appropriate methodologies
5. Create milestone schedule

---

## Evaluate Stage Skills

### data_collection

**Purpose:** Collect data according to defined methodology.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| data_sources | array | yes | From scope_definition |
| methods | array | yes | Collection methods |
| hypothesis | object | yes | Hypothesis being tested |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| raw_data | object | Collected data organized by source |
| collection_log | array | What was collected, when, how |
| quality_notes | array | Data quality observations |
| gaps | array | Data that couldn't be collected |

**Tools:** web_search, web_fetch, domain-specific APIs

**Process:**
1. Execute collection per methodology
2. Log collection metadata (source, timestamp, method)
3. Note data quality issues
4. Document collection gaps and attempted mitigations

---

### analysis_execution

**Purpose:** Execute analysis on collected data.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| raw_data | object | yes | From data_collection |
| methods | array | yes | Analysis methods from scope |
| hypothesis | object | yes | Hypothesis being tested |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| results | object | Analysis outputs (metrics, patterns, findings) |
| visualizations | array | Charts, tables, diagrams |
| methodology_notes | string | How analysis was conducted |
| reproducibility | object | Steps to reproduce analysis |

**Process:**
1. Prepare data for analysis
2. Apply specified methods
3. Generate results and visualizations
4. Document methodology for reproducibility

---

### evaluate_hypothesis

**Purpose:** Assess evidence against hypothesis.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| hypothesis | object | yes | Hypothesis being tested |
| evidence | array | yes | Results from analysis_execution |
| criteria | object | yes | Evaluation criteria |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| verdict | string | strongly_supported/supported/inconclusive/not_supported/refuted |
| confidence | string | high/medium/low |
| evidence_summary | string | Summary of supporting/contradicting evidence |
| alternatives | array | Alternative explanations considered |
| limitations | array | Limitations of the evaluation |

**Verdict Definitions:**
| Verdict | Meaning |
|---------|---------|
| strongly_supported | Multiple evidence types converge, meaningful effect |
| supported | Evidence favors hypothesis, some limitations |
| inconclusive | Mixed evidence, cannot determine |
| not_supported | Evidence contradicts hypothesis |
| refuted | Strong evidence against |

**Tools:** analysis-mcp

---

### quality_assurance

**Purpose:** QA check on evaluation outputs.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| evaluation | object | yes | From evaluate_hypothesis |
| methodology | object | yes | Methods used |
| raw_data | object | yes | Original data |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| qa_passed | boolean | Overall QA status |
| checks | array | Individual check results |
| issues | array | Issues found (if any) |
| recommendations | array | Suggested improvements |

**QA Checklist:**
- [ ] Collection methods documented
- [ ] Analysis reproducible
- [ ] Alternatives considered
- [ ] Confidence appropriate to evidence
- [ ] Problem-fit assessed
- [ ] Limitations acknowledged

---

## Articulate Stage Skills

### contribution_positioning

**Purpose:** Position findings relative to prior work.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| findings | object | yes | Evaluation results |
| prior_work | object | yes | From prior_work_review |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| contribution_type | string | novel_finding/quantified_confirmation/framework/benchmark/recommendation |
| novelty_statement | string | What's new about this work |
| positioning | string | How this relates to existing knowledge |
| significance | string | Why this matters |

**Contribution Types:**
| Type | Description |
|------|-------------|
| novel_finding | New insight not previously documented |
| quantified_confirmation | Evidence for suspected truth |
| framework | New way to organize thinking |
| benchmark | Comparison point for evaluation |
| recommendation | Actionable guidance |

---

### audience_targeting

**Purpose:** Tailor content for specific audiences.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| findings | object | yes | Research findings |
| stakeholders | array | yes | Target audiences |
| delivery_context | string | yes | How content will be delivered |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| audience_profiles | array | Profile per audience with needs and preferences |
| format_decisions | object | Format choices per audience |
| depth_levels | object | Detail level per audience |
| key_messages | array | Core messages to convey |

**Audience Adaptation:**
| Audience | Format | Depth |
|----------|--------|-------|
| Executive | Summary + recommendations | High-level |
| Technical Lead | Technical report | Deep |
| Marketing/DevRel | Slides + talking points | Medium |
| Board/Investors | Executive brief | Minimal |

---

### recommendation_development

**Purpose:** Develop actionable recommendations from findings.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| findings | object | yes | Research findings |
| client_constraints | object | yes | Client's constraints (budget, timeline, resources) |
| contribution | object | yes | From contribution_positioning |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| recommendations | array | Prioritized, actionable recommendations |
| rationale | object | Evidence backing each recommendation |
| risks | array | Risks of action/inaction |
| dependencies | array | Prerequisites for implementation |

**Process:**
1. Map findings to actionable steps
2. Prioritize by impact and feasibility
3. Document rationale for each recommendation
4. Identify implementation dependencies
5. Assess risks of action and inaction

---

### roadmap_creation

**Purpose:** Create phased implementation plan for recommendations.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| recommendations | array | yes | From recommendation_development |
| timeline | object | yes | Client's planning horizon |
| resources | object | no | Available implementation resources |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| phases | array | Implementation phases with milestones |
| quick_wins | array | Immediate actions (< 2 weeks) |
| dependencies | object | Phase dependencies |
| success_metrics | array | How to measure progress |

**Process:**
1. Group recommendations by timeline
2. Identify quick wins for immediate impact
3. Sequence phases by dependencies
4. Define success metrics per phase
5. Note resource requirements

---

## Share Stage Skills

### channel_selection

**Purpose:** Select appropriate delivery channels for content.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| audience_profiles | array | yes | From audience_targeting |
| content_types | array | yes | Types of content to deliver |
| client_preferences | object | no | Client's preferred channels |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| channel_plan | array | Channel per content type with rationale |
| sequence | array | Delivery order |
| timing | object | When to deliver each piece |

**Channel Options:**
| Channel | Best For | Feedback |
|---------|----------|----------|
| Presentation (live) | Executive findings, complex topics | Real-time Q&A |
| Report (document) | Detailed findings, reference | Async comments |
| Workshop | Implementation planning, skill transfer | Interactive |
| Publication | Academic dissemination | Peer review |
| Prototype | Technical demonstration | User testing |

---

### delivery_execution

**Purpose:** Execute delivery of approved content.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| deliverable | object | yes | Approved content |
| channel | string | yes | Selected delivery channel |
| audience | array | yes | Recipients |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| confirmation | boolean | Delivery success |
| delivery_log | object | What was delivered, when, to whom |
| access_provided | array | How recipients can access content |

**Process:**
1. Final pre-delivery review
2. Execute delivery per channel
3. Confirm receipt
4. Log delivery details
5. Set up feedback collection

**Tools:** send_notification

---

### feedback_collection

**Purpose:** Collect and process feedback on deliverables.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| delivery_log | object | yes | From delivery_execution |
| feedback_channels | array | yes | Where to collect feedback |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| feedback_log | array | All feedback received |
| categorized | object | Feedback by category |
| action_items | array | Required follow-up actions |
| satisfaction | object | Client satisfaction indicators |

**Feedback Categories:**
| Category | Response |
|----------|----------|
| Clarification needed | Additional explanation |
| Scope concern | Review objectives, adjust or defer |
| Disagreement | Review evidence, consider alternatives |
| Implementation questions | Detailed guidance, follow-on engagement |
| New directions | Log for future, assess against scope |

---

### knowledge_transfer

**Purpose:** Transfer knowledge to client team for ongoing use.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| deliverables | array | yes | All project deliverables |
| client_team | array | yes | Team members receiving transfer |
| retention_needs | object | no | What client needs to retain |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| handoff_materials | array | Documentation for ongoing use |
| training_completed | boolean | Whether training was provided |
| contact_protocol | object | How client can reach out with questions |
| follow_up_scheduled | object | Any scheduled check-ins |

**Process:**
1. Identify key knowledge for retention
2. Create handoff documentation
3. Conduct training if needed
4. Establish follow-up protocol
5. Schedule check-in if appropriate

---

### venue_selection

**Purpose:** Select appropriate publication venue for research findings.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| findings | object | yes | Research findings to publish |
| timeline | object | yes | Publication timeline constraints |
| audience | string | yes | Target audience (academic, practitioner, both) |
| contract_terms | object | yes | Client publication permissions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| venue | object | Selected venue with rationale |
| venue_type | string | arxiv, workshop, conference, journal, blog |
| timeline | object | Submission deadlines and expected dates |
| requirements | array | Formatting and submission requirements |

**Venue Types:**
| Type | Timeline | Review | Best For |
|------|----------|--------|----------|
| ArXiv preprint | Days | None | Fast dissemination, priority |
| Workshop | 2-4 months | Light | Early-stage ideas |
| Conference | 4-8 months | Rigorous | Complete research |
| Journal | 6-18 months | Thorough | Comprehensive studies |
| Blog/Technical | Days | Internal | Practitioner audience |

---

### paper_drafting

**Purpose:** Draft research paper from evaluation findings.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| evaluation_report | object | yes | From Evaluate stage |
| venue_requirements | object | yes | Format, length, style requirements |
| authorship | array | yes | Author list with contributions |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| draft | string | Complete paper draft |
| sections | object | Individual sections for review |
| citations | array | Bibliography entries |
| supplementary | array | Additional materials |

**Paper Structure:**
1. Title — Specific, searchable, indicates contribution
2. Abstract — Problem, approach, results, significance
3. Introduction — Context, gap, contribution, outline
4. Related Work — Prior art, positioning
5. Methodology — Approach, data, setup
6. Results — Findings, visualizations
7. Discussion — Implications, limitations
8. Conclusion — Summary, significance

---

### client_review_management

**Purpose:** Manage client review of publication content.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| draft | string | yes | Paper draft for review |
| contract_terms | object | yes | Review period, restrictions |
| client_contact | string | yes | Reviewer contact |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| approval_status | string | approved, pending, rejected |
| feedback | array | Client feedback items |
| redactions | array | Content to remove |
| revised_draft | string | Post-review draft |

**Process:**
1. Send draft with review deadline (typical: 30 days)
2. Track response and follow up
3. Incorporate feedback and redactions
4. Obtain final approval
5. Document approval for records

---

### submission_execution

**Purpose:** Execute submission to selected venue.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| final_draft | string | yes | Approved paper |
| venue | object | yes | Target venue details |
| supplementary | array | no | Code, data, appendices |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| submission_id | string | Venue-assigned identifier |
| confirmation | object | Submission receipt |
| arxiv_id | string | ArXiv ID if applicable |

**Pre-submission Checklist:**
- [ ] Formatting meets venue requirements
- [ ] All authors approved final version
- [ ] Client review complete
- [ ] Acknowledgments correct
- [ ] Supplementary materials ready
- [ ] Conflicts of interest declared

---

### peer_review_response

**Purpose:** Respond to peer review feedback.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| reviews | array | yes | Reviewer comments |
| original_paper | string | yes | Submitted version |
| decision | string | yes | accept, revise, reject |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| response_letter | string | Point-by-point response |
| revised_paper | string | Updated paper |
| changes_summary | array | List of changes made |

**Response Categories:**
| Feedback Type | Action |
|---------------|--------|
| Factual error | Correct immediately |
| Missing experiment | Conduct or explain limitation |
| Clarity issue | Revise text |
| Disagreement | Explain reasoning politely |
| Out of scope | Acknowledge, defer to future work |

---

### post_publication

**Purpose:** Maximize impact after publication.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| published_paper | object | yes | Publication details and links |
| audiences | array | yes | Target dissemination audiences |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| dissemination_log | array | Where and when shared |
| metrics | object | Citations, downloads, engagement |
| follow_up_items | array | Responses, corrections, extensions |

**Dissemination Channels:**
- Social media (LinkedIn, Twitter/X)
- Communities (Reddit, HN, Discord)
- Mailing lists
- Client channels
- Personal/company website

**Tools:** web_search (for tracking), send_notification

---

## Shared Skills

### save_document

**Purpose:** Persist document to storage.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | yes | Document type (hypothesis, evaluation, deliverable, etc.) |
| content | object | yes | Document content |
| metadata | object | no | Tags, timestamps, relationships |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| id | string | Document identifier |

**Tools:** storage-mcp

---

### get_document

**Purpose:** Retrieve document from storage.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Document identifier |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| content | object | Document content |
| metadata | object | Document metadata |

**Tools:** storage-mcp

---

### list_documents

**Purpose:** Query documents from storage by type and filters.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| type | string | yes | Document type to query |
| filters | object | no | Filter criteria (date range, tags, status) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| ids | array | Matching document identifiers |

**Tools:** storage-mcp

---

### update_pipeline

**Purpose:** Update pipeline state for a project.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| stage | string | yes | Current pipeline stage |
| status | string | yes | Stage status (in_progress, complete, blocked) |
| data | object | no | Additional state data |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| confirmation | boolean | Update success status |

**Tools:** storage-mcp

---

### send_notification

**Purpose:** Send notification to human via configured channel.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| channel | string | yes | Notification channel (slack, email) |
| message | string | yes | Notification content |
| priority | string | no | Priority level (low, normal, high) |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| confirmation | boolean | Delivery confirmation |

**Tools:** notify-mcp

---

### request_approval

**Purpose:** Request human approval for stage transition.

**Inputs:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| stage | string | yes | Current stage |
| summary | string | yes | Summary of outputs |
| outputs | array | yes | Output document IDs |
| next_stage | string | yes | Proposed next stage |

**Outputs:**
| Field | Type | Description |
|-------|------|-------------|
| decision | string | approve/reject/edit/abort |
| feedback | string | Human feedback if rejected |
| edits | object | Modifications if edited |

**Tools:** notify-mcp

---

## Skill → Agent Mapping

| Skill | Identify | Develop | Evaluate | Articulate | Share |
|-------|----------|---------|----------|------------|-------|
| web_search | ✓ | ✓ | ✓ | | |
| web_fetch | ✓ | ✓ | ✓ | | |
| contract_review | ✓ | | | | |
| gap_analysis | ✓ | | | | |
| opportunity_mapping | ✓ | | | | |
| prioritization | ✓ | | | | |
| prior_work_review | | ✓ | | | |
| hypothesis_refinement | | ✓ | | | |
| feasibility_assessment | | ✓ | | | |
| scope_definition | | ✓ | | | |
| data_collection | | | ✓ | | |
| analysis_execution | | | ✓ | | |
| evaluate_hypothesis | | | ✓ | | |
| quality_assurance | | | ✓ | | |
| contribution_positioning | | | | ✓ | |
| audience_targeting | | | | ✓ | |
| recommendation_development | | | | ✓ | |
| roadmap_creation | | | | ✓ | |
| channel_selection | | | | | ✓ |
| delivery_execution | | | | | ✓ |
| feedback_collection | | | | | ✓ |
| knowledge_transfer | | | | | ✓ |
| venue_selection | | | | | ✓ |
| paper_drafting | | | | | ✓ |
| client_review_management | | | | | ✓ |
| submission_execution | | | | | ✓ |
| peer_review_response | | | | | ✓ |
| post_publication | | | | | ✓ |
| save_document | ✓ | ✓ | ✓ | ✓ | ✓ |
| get_document | ✓ | ✓ | ✓ | ✓ | ✓ |
| list_documents | ✓ | ✓ | ✓ | ✓ | ✓ |
| update_pipeline | ✓ | ✓ | ✓ | ✓ | ✓ |
| send_notification | ✓ | ✓ | ✓ | ✓ | ✓ |
| request_approval | ✓ | ✓ | ✓ | ✓ | ✓ |
