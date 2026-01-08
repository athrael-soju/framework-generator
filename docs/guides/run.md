# Run Tracking

All pipeline models (SPARC, FORGE, ORBIT) track execution decisions in `run.md`.

---

## Pattern

Each run creates a dated folder with a `run.md` file:

```
output/{model}/{date}/run.md
```

The run.md file:
- Initializes at first stage
- Appends after each stage approval
- Finalizes with outcome at completion

---

## Run Log Template

```markdown
# {Model} Run: {Entity/Name}

Started: {date}
Status: in_progress / complete / aborted

---

## {Stage 1} - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{file}.md`

---

## {Stage 2} - {date}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{file}.md`

---

## Outcome

**Status:** complete / aborted
**Result:** {summary}
**Next Steps:** {what happens next}
```

---

## Model-Specific Paths

| Model | Run Path | Entity |
|-------|----------|--------|
| SPARC | `output/sparc/{date}/run.md` | Prospect name |
| FORGE | `output/forge/{date}/run.md` | Model being created |
| ORBIT | `output/orbit/{date}/run.md` | Client/project name |

---

## SPARC Example

```markdown
# SPARC Run: Vultr

Started: 2025-01-15
Status: complete

---

## Signal - 2025-01-15

**Decisions:**
| Question | Choice |
|----------|--------|
| Signal prioritization | Funding signal (strongest budget indicator) |
| Tier assignment | Hot (multiple strong signals) |

**Output:** `signal-log.md`

---

## Profile - 2025-01-16

**Decisions:**
| Question | Choice |
|----------|--------|
| Data gaps | Continue with gaps noted |

**Output:** `vultr-profile.md`

---

## Analyze - 2025-01-17

**Decisions:**
| Question | Choice |
|----------|--------|
| Competitor set | Direct + emerging competitors |

**Output:** `vultr-analysis.md`

---

## Rank - 2025-01-18

**Decisions:**
| Question | Choice |
|----------|--------|
| Approval | Approved (score 4.8) |

**Output:** `qualification.md`

---

## Craft - 2025-01-19

**Decisions:**
| Question | Choice |
|----------|--------|
| Channel | LinkedIn DM |

**Output:** `vultr-outreach.md`

---

## Outcome

**Status:** complete
**Result:** signed_agreement - $15K/month research retainer
**Next Steps:** Begin ORBIT delivery
```
