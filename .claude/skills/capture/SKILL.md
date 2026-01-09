---
name: capture
description: Record family information from interviews for the ROOTS framework
---

# Capture

Record person information and relationships from family interviews.

## Inputs

| Input | Source |
|-------|--------|
| interview_target | User input: who will be interviewed |
| gap_analysis | Optional: Visualize stage output identifying what to ask about |
| existing_tree | Optional: previous ROOTS run tree data |

### Input Format

**User-provided interview context:**

```yaml
interview_target:
  interviewee: [Name of person being interviewed]
  focus: [What you want to learn about]
  known_gaps: [Specific questions to answer]
```

**Optional gap analysis (from Visualize stage):**

```markdown
## Recommended Next Steps

1. **Interview:** {Family member} about {topic}
```

## Process

**1. Prepare Questions** - Based on gaps or general exploration:
- Who are we asking about?
- What relationships need clarification?
- What dates/places are missing?

**2. Capture During Interview** - Record as you go:
- Names (including nicknames, maiden names)
- Dates (even partial: "around 1950", "before the war")
- Places (as specific as known)
- Relationships to other people
- Who told you (source attribution)

**3. Extract Person Records** - After interview:
- Create entry for each person mentioned
- Include all known fields
- Tag source for every claim

**4. Extract Relationships** - Link people together:
- Identify relationship type
- Note both directions where applicable
- Include source

**5. List Uncertainties** - What needs verification:
- Conflicting information heard
- Approximate dates
- Unclear relationships

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- Gathering interview target and focus
- Clarifying ambiguous names or relationships during capture
- Confirming extracted records before completion

## Output

Create and save to `output/{date}/` where `{date}` is today (YYYY-MM-DD).

If running multiple sessions on the same day, add a suffix: `output/2026-01-08-02/`.

| File | Content |
|------|---------|
| `run.md` | Initialize run log |
| `capture-session.md` | Captured people and relationships |

### Run Log (run.md)

Initialize run log for ROOTS framework execution.

```markdown
# ROOTS Run

Started: {date}
Status: in_progress

---

## Capture - {date}

**Inputs provided:**
- Interviewee: {name}
- Focus: {what you aimed to learn}

**People captured:** {count}
**Relationships captured:** {count}

**Output:** `capture-session.md`
```

### Capture Session (capture-session.md)

```markdown
# Capture Session: {date}

**Interviewee:** {name}
**Interviewer:** {your name}
**Focus:** {what you aimed to learn}

---

## People

### {Person Name}
- Birth: {date}, {place}
- Death: {date}, {place}
- Also known as: {aliases}
- Source: {who told you}
- Notes: {stories, context, uncertainties}

---

## Relationships

- {Person A} -> parent of -> {Person B} [Source: {who}]
- {Person A} -> spouse of -> {Person B} [Source: {who}]

---

## Uncertainties

- [ ] {What's unclear and needs verification}

---

## Next Steps

- [ ] {Who to interview next}
- [ ] {What to ask about}
```

## Quality Criteria

- [ ] Every person has a name and source
- [ ] Relationships specify both people and type
- [ ] Uncertainties are explicitly listed
- [ ] Dates use consistent format (even partial dates)
- [ ] Source attribution present for each claim

## Completion

Present: Capture session document with people, relationships, uncertainties. Approve -> Verify.
