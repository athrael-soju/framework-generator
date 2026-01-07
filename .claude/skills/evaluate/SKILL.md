---
name: evaluate
description: Execute IDEAS Evaluate stage to test hypotheses. Use after Develop to collect data, run analysis, assess evidence against hypotheses, and quality-check findings.
---

# Evaluate Stage

Test hypotheses through data collection and analysis.

## Objective

Gather evidence to test formalized hypotheses. Execute analysis, assess findings against hypotheses, and quality-check results before articulation.

## Inputs

| Input | Source | Description |
|-------|--------|-------------|
| hypothesis_documents | Develop stage | Formal hypotheses to test |
| scope_definitions | Develop stage | Data sources and methods |
| feasibility_scores | Develop stage | Risk factors to monitor |

## Process

### 1. Data Collection

For each hypothesis, execute collection per scope:

**Collection Protocol:**
| Source | Method | What to Capture |
|--------|--------|-----------------|
| [Source] | [How] | [Data elements] |

**Collection Log Entry:**
```json
{
  "source": "Source name",
  "timestamp": "ISO timestamp",
  "method": "Collection method",
  "records": "count",
  "quality": "high/medium/low",
  "notes": "Any observations"
}
```

**Quality Notes:**
- Document data quality issues
- Note gaps in expected data
- Record attempted mitigations

Tools: `web_search`, `web_fetch`, domain-specific APIs

### 2. Analysis Execution

Apply methods specified in scope:

**Analysis Steps:**
1. Data preparation (cleaning, formatting)
2. Method application
3. Result generation
4. Visualization creation

**Methodology Documentation:**
```
## Analysis: [Hypothesis Name]

### Data Preparation
- [Step]: [What was done]

### Method Applied
- [Method]: [How applied]
- [Parameters]: [Settings used]

### Reproducibility Steps
1. [Step to reproduce]
2. [Step to reproduce]

### Outputs Generated
- [Result type]: [Description]
- [Visualization]: [Description]
```

### 3. Hypothesis Evaluation

Assess evidence against each hypothesis:

**Evidence Assessment:**
| Evidence Type | Finding | Supports/Contradicts |
|---------------|---------|----------------------|
| [Type] | [What was found] | [Direction] |

**Verdict Determination:**
| Verdict | Meaning |
|---------|---------|
| Strongly Supported | Multiple evidence types converge, meaningful effect |
| Supported | Evidence favors hypothesis, some limitations |
| Inconclusive | Mixed evidence, cannot determine |
| Not Supported | Evidence contradicts hypothesis |
| Refuted | Strong evidence against |

**Confidence Level:**
- High: Multiple sources, robust methods, alternatives ruled out
- Medium: Good evidence, some limitations
- Low: Limited data, methodological concerns

**Alternative Explanations:**
- What else could explain these findings?
- Were alternatives considered and ruled out?

Tool: `evaluate_hypothesis`

### 4. Quality Assurance

Run QA checklist before proceeding:

**QA Checklist:**
- [ ] Collection methods documented
- [ ] Analysis reproducible
- [ ] Alternatives considered
- [ ] Confidence appropriate to evidence
- [ ] Problem-fit assessed (does this answer the question?)
- [ ] Limitations acknowledged

**Issue Categories:**
| Severity | Response |
|----------|----------|
| Critical | Must fix before proceeding |
| Major | Fix if possible, document if not |
| Minor | Document for transparency |

**QA Report:**
```
## Quality Assurance: [Hypothesis Name]

### Checks Passed
- [Check]: [Evidence]

### Issues Found
| Issue | Severity | Resolution |
|-------|----------|------------|
| [Issue] | [Level] | [What was done] |

### Overall Status
[Pass / Pass with notes / Fail]

### Recommendations
- [Any improvements for future]
```

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| raw_data | object | Collected data by source |
| collection_log | document | What was collected, when, how |
| analysis_results | document | Findings and visualizations |
| evaluation_report | document | Verdict per hypothesis |
| qa_report | document | Quality check results |

## Tools Available

| Tool | Purpose |
|------|---------|
| `web_search` | Gather data |
| `web_fetch` | Retrieve content |
| `evaluate_hypothesis` | Formal assessment |
| `save_document` | Persist outputs |
| `get_document` | Retrieve hypotheses |
| `list_documents` | Find related documents |

## Quality Criteria

- [ ] All data sources in scope were accessed
- [ ] Collection gaps documented
- [ ] Analysis follows methodology
- [ ] Verdict has supporting rationale
- [ ] QA checklist completed

## Completion

When finished:
1. Save evaluation_report using `save_document`
2. Call `request_approval` with:
   - Verdict summary per hypothesis
   - Confidence levels
   - Key findings
   - QA status
   - Readiness for Articulate stage
