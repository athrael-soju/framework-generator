---
name: verify
description: Cross-reference and verify captured family information for ROOTS
---

# Verify

Cross-reference captured information against existing data and resolve conflicts.

## Inputs

| Input | Source |
|-------|--------|
| capture_session | Capture stage output |
| existing_tree | Optional: tree data from previous runs |

### Input Format

**From Capture stage (`output/{date}/capture-session.md`):**

```markdown
# Capture Session: {date}

## People

### {Person Name}
- Birth: {date}, {place}
- Source: {who told you}

## Relationships

- {Person A} -> {type} -> {Person B} [Source: {who}]

## Uncertainties

- [ ] {What needs verification}
```

**Optional existing tree (`output/{date}/family-tree.md`):**

```markdown
## People

### {ID}: {Full Name}
- Born: {date}, {place}
- Confidence: {level}
```

## Process

**1. Check for Duplicates** - Compare captured people against existing tree:
- Same name, different spelling?
- Same person, different nickname?
- Genuinely different people with similar names?

**2. Merge Duplicates** - Consolidate records:
- Combine information from both sources
- Note all aliases
- Preserve all source attributions

**3. Cross-Reference Claims** - Look for conflicts:
- Dates that don't match
- Relationships that contradict
- Places that conflict

**4. Resolve Conflicts** - Make decisions:
- Which source is more reliable?
- Can both be partially correct?
- What additional info would resolve this?

**5. Assign Confidence** - Rate each record:
- High: 2+ independent sources agree
- Medium: Single source, no contradictions
- Low: Conflicting sources or uncertainty noted

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- Duplicate resolution (same person or different?)
- Conflict resolution choices
- Confidence level assignment rationale

## Output

Save to `output/{date}/` (same date as Capture).

| File | Content |
|------|---------|
| `run.md` | Append Verify decisions |
| `verification-report.md` | Verification results |

### Run Log (run.md)

Append Verify stage entry. See `docs/execution.md` "Run Log Conventions" for format.

```markdown
---

## Verify - {date}

**Records checked:** {count}
**Duplicates resolved:** {count}
**Conflicts found:** {count}

**Output:** `verification-report.md`
```

### Verification Report (verification-report.md)

```markdown
# Verification Report: {date}

**Session verified:** {capture session date}
**Records checked:** {count}

---

## Duplicates Resolved

| Captured As | Merged With | Decision |
|-------------|-------------|----------|
| {name} | {existing name} | {same person / different person} |

---

## Conflicts Found

### {Person Name}
- **Issue:** {description}
- **Sources:** {source 1} says X, {source 2} says Y
- **Resolution:** {decision and rationale}

---

## Confidence Assignments

| Person | Confidence | Reason |
|--------|------------|--------|
| {name} | High / Medium / Low | {why} |

---

## Needs More Information

- [ ] {Person}: {what's missing}

---

## Ready for Integration

- {Person 1} (High confidence)
- {Person 2} (Medium confidence)
```

## Quality Criteria

- [ ] All captured records have been checked
- [ ] Duplicates explicitly resolved (merged or marked distinct)
- [ ] Conflicts documented with resolution rationale
- [ ] Every record has a confidence level
- [ ] Low-confidence items have clear next steps

## Completion

Present: Verification report with confidence assignments. Approve -> Integrate. If missing info critical, loop -> Capture.
