---
name: share
description: Execute IDEAS Share stage to deliver and disseminate findings. Use after Articulate to select channels, execute delivery, collect feedback, transfer knowledge, and optionally publish research.
---

# Share Stage

Deliver findings and maximize impact.

## Objective

Execute delivery of client deliverables, collect feedback, transfer knowledge, and optionally pursue publication for broader dissemination.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| client_deliverable | Articulate stage | Final deliverables |
| audience_profiles | Articulate stage | Who receives what |
| contract_summary | Identify stage | Delivery requirements, publication rights |

## Process

### 1. Channel Selection

Choose delivery channel per content type:

| Channel | Best For | Feedback Type |
|---------|----------|---------------|
| Presentation (live) | Executive findings, complex topics | Real-time Q&A |
| Report (document) | Detailed findings, reference | Async comments |
| Workshop | Implementation planning, skill transfer | Interactive |
| Publication | Academic dissemination | Peer review |

**Channel Plan:**
```
| Content | Audience | Channel | Timing |
|---------|----------|---------|--------|
| [Deliverable] | [Who] | [How] | [When] |
```

### 2. Delivery Execution

Execute delivery per channel:

**Pre-Delivery Checklist:**
- [ ] Content finalized and approved
- [ ] Recipients confirmed
- [ ] Logistics arranged (meeting, access, etc.)
- [ ] Backup materials ready

**Delivery Log:**
```json
{
  "deliverable": "Name",
  "channel": "Channel used",
  "recipients": ["List"],
  "timestamp": "ISO timestamp",
  "access_url": "Link if applicable",
  "confirmation": "Receipt confirmation"
}
```

### 3. Feedback Collection

Gather and process feedback:

**Feedback Categories:**
| Category | Response Action |
|----------|-----------------|
| Clarification needed | Provide additional explanation |
| Scope concern | Review objectives, adjust or defer |
| Disagreement | Review evidence, consider alternatives |
| Implementation questions | Detailed guidance |
| New directions | Log for future engagement |

**Feedback Processing:**
```
## Feedback Log

### Received
| Source | Category | Content | Action |
|--------|----------|---------|--------|
| [Who] | [Type] | [What] | [Response] |

### Action Items
- [Item]: [Owner] [Deadline]

### Satisfaction Indicators
- [Positive signals]
- [Concerns raised]
```

### 4. Knowledge Transfer

Ensure client can sustain and build on work:

**Handoff Materials:**
- Executive summary
- Technical documentation
- How-to guides for ongoing use
- Data and artifacts
- FAQ based on common questions

**Transfer Activities:**
| Activity | When | Audience |
|----------|------|----------|
| Walkthrough session | [Date] | [Who] |
| Q&A office hours | [Date] | [Who] |
| Documentation handoff | [Date] | [Who] |

**Follow-up Protocol:**
- Contact method for questions
- Scheduled check-in (if any)
- Conditions for re-engagement

### 5. Publication (Optional)

If contract permits and findings warrant publication:

**Venue Selection:**
| Type | Timeline | Review | Best For |
|------|----------|--------|----------|
| ArXiv preprint | Days | None | Fast dissemination |
| Workshop | 2-4 months | Light | Early-stage ideas |
| Conference | 4-8 months | Rigorous | Complete research |
| Journal | 6-18 months | Thorough | Comprehensive studies |
| Blog/Technical | Days | Internal | Practitioner audience |

**Publication Process:**
1. **Client Review**: Send draft, allow review period (typically 30 days)
2. **Revise**: Incorporate feedback, apply redactions
3. **Submit**: Format per venue requirements
4. **Respond**: Handle peer review if applicable
5. **Disseminate**: Share on social, communities, mailing lists

**Client Review Request:**
```
Subject: Publication Review Request - [Title]

Please review the attached draft by [deadline].

Per our agreement, you have [N] days to:
- Approve as-is
- Request redactions of confidential information
- Provide feedback

No response by [date] will be treated as approval.
```

### 6. Post-Engagement

Wrap up and set up future value:

**Engagement Closure:**
- Final deliverables confirmed received
- Feedback collected
- Knowledge transferred
- Invoice/admin complete

**Future Opportunities:**
- Follow-on work identified
- Re-engagement triggers defined
- Referral request (if appropriate)

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| delivery_log | document | What was delivered, when, to whom, including feedback_log, handoff_materials, and engagement_closure |
| publication (optional) | document | Published paper/article |

## Decision Points

All menus must include an Other option for custom input.

| Point | Type | Options |
|-------|------|---------|
| Channel selection | Multi-select | Executive brief, technical report, workshop, documentation |
| Publication decision | Decision | Pursue publication, client-only, defer decision |
| Venue selection | Clarification | Which publication venue to target |
| Feedback handling | Decision | Incorporate feedback, note for future, escalate |
| Knowledge transfer scope | Decision | Full handoff, partial, ongoing support |
| Stage completion | Approval | Approve → Complete, Reject → retry, Edit → modify, Abort |

## Quality Criteria

- [ ] All deliverables delivered to correct audiences
- [ ] Delivery confirmed and logged
- [ ] Feedback collected and processed
- [ ] Knowledge transfer completed
- [ ] Client can operate independently

## Completion

When finished, present for approval:
- Delivery status summary
- Feedback highlights
- Knowledge transfer status
- Publication status (if applicable)
- Engagement closure confirmation
- Referral opportunity (if appropriate)

## Artifact Persistence

On approval, save outputs to run directory:
1. Save delivery log (including feedback_log, handoff_materials, engagement_closure) to `artifacts/5_delivery_log.yaml`
2. Log decision to `decisions.md` with rationale
3. Update `run.yaml` with `current_stage: share`, `status: completed`, `outcome: delivered`
4. For referrals, create new SPARC run entries in `runs/`

See [Execution.md](../../architecture/Execution.md#artifact-persistence) for structure details.
