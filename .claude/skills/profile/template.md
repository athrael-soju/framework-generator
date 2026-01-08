# Profile Template

Output templates for the Profile stage.

---

## Company Profile

```markdown
# Company Profile: [Company Name]

Date: YYYY-MM-DD

---

## Company Overview

**Legal Name:**
**DBA:**
**HQ:**
**Founded:**
**Employees:**

### Funding History

| Round | Amount | Date | Valuation |
|-------|--------|------|-----------|
| [Series] | [Amount] | [Date] | [Valuation] |

---

## Market Position

**Vertical:**
**Differentiation:**

### Competitors
- [Competitor 1]
- [Competitor 2]

---

## Key People

| Name | Title | Notes |
|------|-------|-------|
| [Name] | [Title] | [Relevant background, activity] |

---

## Technical Presence

**GitHub:** [URL or assessment]
**Docs Quality:** [Assessment]
**Community:** [Assessment]

---

## Recent Activity

- [Date]: [Activity description]
```

---

## Run Log (run.md) - Append

```markdown
---

## Profile - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{company}-profile.md`
```
