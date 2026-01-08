---
name: outline
description: Execute RECON Outline stage to structure findings and identify gaps before synthesis.
---

# Outline

Structure correlated findings into organized categories and identify remaining gaps.

## Inputs

| Input | Source |
|-------|--------|
| correlate_findings | Correlate stage output |
| seed_file | Receive stage output (for purpose) |

### Input Format

**From Correlate stage (`output/recon/{date}/{subject}-correlate.md`):**

```markdown
## Corroborated Facts
### Professional
| Fact | Sources | Confidence |

### Personal
| Fact | Sources | Confidence |

## Patterns Observed
{pattern descriptions}

## Correlation Status
**Recommendation:** Proceed to Outline
```

## Process

**1. Categorize Findings** - Sort into profile categories:
- Identity (name, contact, location)
- Professional (role, history, skills)
- Education (degrees, certifications)
- Network (connections, affiliations)
- Interests (hobbies, passions)
- Content (what they create)
- Communication (style, tone)
- Values (beliefs, causes)

**2. Assess Completeness** - Rate each category:
- Complete: all expected info found
- Partial: some info, non-critical gaps
- Sparse: minimal info, significant gaps
- Empty: nothing found

**3. Identify Gaps** - Flag missing info:
- Critical: essential to research purpose
- Important: would improve profile
- Minor: nice to have

**4. Prioritize** - Based on research purpose, rank what matters most

**5. Prepare for Synthesis** - Structure data for Narrate stage

## Output

Save to `output/recon/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Append Outline summary |
| `{subject}-outline.md` | Structured outline |

### Run Log (run.md) - Append

```markdown
---

## Outline - {date}

**Category completeness:**
| Category | Status |
|----------|--------|
| Identity | {status} |
| Professional | {status} |
| ...

**Critical gaps:** {count or "none"}
**Recommendation:** Proceed to Narrate / Return to Explore

**Output:** `{subject}-outline.md`
```

### Outline ({subject}-outline.md)

```markdown
# RECON Outline: {Subject Name}

Outlined: {date}

## Category Completeness

| Category | Status | Key Findings | Gaps |
|----------|--------|--------------|------|
| Identity | Complete | Name, location verified | None |
| Professional | Complete | 10yr history clear | Early career |
| Education | Partial | Degree known | Certifications |
| Network | Partial | Key connections | Full network |
| Interests | Complete | 3 clusters | None |
| Content | Sparse | Blog found | History |
| Communication | Partial | Twitter tone | Email style |
| Values | Partial | Some causes | Views unclear |

## Structured Findings

### Identity
- **Name:** {full name}
- **Location:** {city, country}
- **Contact:** {available info}
- **Photo:** {available / not found}

### Professional
- **Current:** {role at company since date}
- **Previous:**
  - {role at company, dates}
  - {role at company, dates}
- **Skills:** {key skills}
- **Achievements:** {accomplishments}

### Education
- **Degrees:** {list}
- **Certifications:** {list or "unknown"}

### Network
- **Key connections:** {notable people}
- **Communities:** {groups}
- **Affiliations:** {boards, advisories}

### Interests
- **Primary:** {main interests}
- **Secondary:** {other topics}
- **Activities:** {hobbies}

### Content
- **Platforms:** {where they publish}
- **Topics:** {what about}
- **Notable:** {specific pieces}

### Communication
- **Style:** {formal/casual/technical}
- **Tone:** {warm/direct/analytical}
- **Engagement:** {responsive/selective/quiet}

### Values
- **Causes:** {what they support}
- **Opinions:** {views shared}

## Gap Analysis

### Critical Gaps
{list or "None"}

### Important Gaps
| Gap | Impact | Recommendation |
|-----|--------|----------------|
| {missing} | {why matters} | {action} |

### Minor Gaps
- {gap 1}
- {gap 2}

## Outline Status

**Overall completeness:** {qualitative}
**Critical gaps:** {count}
**Recommendation:** Proceed to Narrate / Return to Explore
```

## Quality Criteria

- [ ] All categories assessed for completeness
- [ ] Findings organized under correct categories
- [ ] Gaps identified with criticality level
- [ ] No critical gaps (or user approved proceeding)
- [ ] Structured findings ready for synthesis

## Completion

Present: Completeness summary and gap analysis.
- If no critical gaps -> Narrate
- If critical gaps -> Return to Explore or get user approval
