---
name: narrate
description: Execute RECON Narrate stage to synthesize findings into a complete profile with insights.
---

# Narrate

Synthesize structured findings into a cohesive profile with actionable insights and talking points.

## Inputs

| Input | Source |
|-------|--------|
| outline | Outline stage output |
| seed_file | Receive stage output (for purpose/context) |

### Input Format

**From Outline stage (`output/recon/{date}/{subject}-outline.md`):**

```markdown
## Category Completeness
| Category | Status | Key Findings | Gaps |

## Structured Findings
### Identity
### Professional
### Education
...

## Outline Status
**Recommendation:** Proceed to Narrate
```

## Process

**1. Write Executive Summary** - 3-5 sentences covering:
- Who they are
- What they do
- What makes them notable

**2. Create At-a-Glance Table** - Key facts for quick scanning

**3. Write Professional Story** - Career narrative:
- Trajectory and progression
- Key moves and decisions
- Notable achievements
- Current focus

**4. Write Personal Portrait** - Who they are:
- Interests and passions
- Values and causes
- Communication style
- What matters to them

**5. Generate Insights** - Actionable observations:
- Connection points (shared experiences)
- Approach recommendations
- Opportunities
- Cautions

**6. Create Talking Points** - Specific conversation starters

**7. Document Sources and Caveats** - Transparency on limitations

## Output

Save to `output/recon/{date}/`.

| File | Content |
|------|---------|
| `run.md` | Append final summary, mark complete |
| `{subject}-profile.md` | Complete synthesized profile |

### Run Log (run.md) - Append and Complete

```markdown
---

## Narrate - {date}

**Profile sections completed:**
- Summary
- At a Glance
- Professional Story
- Personal Portrait
- Insights
- Talking Points
- Sources
- Caveats

**Output:** `{subject}-profile.md`

---

## Outcome

**Status:** complete
**Result:** Profile generated for {subject name}
**Files:**
- `{subject}-seed.md`
- `{subject}-explore.md`
- `{subject}-correlate.md`
- `{subject}-outline.md`
- `{subject}-profile.md`
```

### Final Profile ({subject}-profile.md)

```markdown
# RECON Profile: {Subject Name}

Generated: {date}
Purpose: {from seed}
Confidence: {overall level}

---

## Summary

{3-5 sentences: who they are, what they do, what's notable. Third person, factual, engaging.}

---

## At a Glance

| Attribute | Value |
|-----------|-------|
| Name | {full name} |
| Location | {city, country} |
| Current Role | {title at company} |
| Industry | {primary industry} |
| Experience | {years} |
| Education | {highest degree, school} |
| Primary Expertise | {main domain} |
| Online Presence | {most active platforms} |
| Communication Style | {brief} |
| Key Interests | {top 2-3} |

---

## Professional Story

{2-3 paragraphs: career narrative with trajectory, key moves, achievements, current focus. Connect the dots.}

### Notable Achievements
- {achievement 1}
- {achievement 2}
- {achievement 3}

---

## Personal Portrait

{1-2 paragraphs: who they are as a person. Interests, values, style. Based on evidence, not speculation.}

### Interests & Passions
- **{Interest 1}:** {context}
- **{Interest 2}:** {context}
- **{Interest 3}:** {context}

---

## Insights

### Connection Points
- {shared experience or interest}
- {another connection}

### Approach Recommendations
- {how to frame outreach}
- {what to emphasize or avoid}

### Opportunities
- {potential collaboration}

### Cautions
- {things to be aware of}

---

## Talking Points

1. **{Topic}:** {specific question or comment}
2. **{Topic}:** {conversation starter}
3. **{Topic}:** {third option}

---

## Sources

| Platform | URL | Checked |
|----------|-----|---------|
| LinkedIn | {url} | {date} |
| Twitter/X | {url} | {date} |
| {Other} | {url} | {date} |

---

## Caveats

- **Gaps:** {what wasn't found}
- **Low confidence:** {uncertain items}
- **Dated info:** {potentially stale}
- **Assumptions:** {inferences made}
```

## Quality Criteria

- [ ] Summary captures essence in scannable format
- [ ] At a Glance has all key attributes
- [ ] Professional story is narrative, not bullets
- [ ] Personal portrait based on evidence
- [ ] Insights are actionable, not generic
- [ ] Talking points are specific and usable
- [ ] Sources documented with URLs
- [ ] Caveats honest about limitations

## Completion

Present: Complete profile for review. User can request edits. Approve -> Save and mark run complete.
