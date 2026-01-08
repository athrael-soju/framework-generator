# Signal Template

Output templates for the Signal stage.

---

## Run Log (run.md) - Initialize

```markdown
# SPARC Run: {Prospect Name}

Started: {date}
Status: in_progress

---

## Signal - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `signal-log.md`
```

---

## Signal Log (signal-log.md)

```markdown
# Signal Log

Date: YYYY-MM-DD

---

## Signals

| Company | Signal Type | Source | Strength | Notes |
|---------|-------------|--------|----------|-------|
| [Name] | funding / hiring / announcement / social / technical | [Source + URL] | hot / warm / watch | [Brief context] |

---

## Signal Details

### [Company Name]

**Date Detected:** YYYY-MM-DD
**Signal Type:** funding / hiring / announcement / social / technical
**Source:** [Source Name]
**URL:** [Link]
**Strength:** hot / warm / watch

**Notes:**
[Brief context about why this signal matters]
```
