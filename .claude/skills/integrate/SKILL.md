---
name: integrate
description: Add verified records to the canonical family tree for ROOTS
---

# Integrate

Add verified person records to the canonical family tree and establish relationship links.

## Inputs

| Input | Source |
|-------|--------|
| verification_report | Verify stage output |
| existing_tree | Optional: tree data from previous runs |

### Input Format

**From Verify stage (`output/{date}/verification-report.md`):**

```markdown
## Confidence Assignments

| Person | Confidence | Reason |
|--------|------------|--------|
| {name} | High / Medium / Low | {why} |

## Ready for Integration

- {Person 1} (High confidence)
- {Person 2} (Medium confidence)
```

**Optional existing tree (`output/{date}/family-tree.md`):**

```markdown
## People

### {ID}: {Full Name}
- Born: {date}, {place}

## Relationships

| Person A | Relationship | Person B | Confidence | Source |
```

## Process

**1. Load Existing Tree** - Read current state:
- If first run, create empty tree structure
- If continuing, load previous tree data

**2. Add New People** - Insert verified records:
- Assign unique ID to each new person
- Copy all fields from verification
- Set confidence level

**3. Create Relationships** - Link people:
- Add relationship entries for each link
- Include confidence and source
- Check for logical consistency

**4. Validate Consistency** - Run checks:
- Both people in each relationship exist
- No duplicate relationships
- Parent older than child (where dates known)
- No circular ancestry

**5. Save Tree** - Persist updated data:
- Update changelog with all changes
- Save tree file

## Interaction

See CLAUDE.md "Interaction Protocol" for tool usage and menu format.

**Stage-specific triggers for `AskUserQuestion`:**
- Resolving validation failures
- Handling logical inconsistencies
- Confirming relationship interpretations

## Output

Save to `output/{date}/` (same date as Capture).

| File | Content |
|------|---------|
| `run.md` | Append Integrate decisions |
| `integration-report.md` | Changes made |
| `family-tree.md` | Updated canonical tree |

### Run Log (run.md)

Append Integrate stage entry.

```markdown
---

## Integrate - {date}

**People added:** {count}
**People updated:** {count}
**Relationships added:** {count}

**Output:** `integration-report.md`, `family-tree.md`
```

### Integration Report (integration-report.md)

```markdown
# Integration Report: {date}

**People added:** {count}
**People updated:** {count}
**Relationships added:** {count}

---

## Changes Made

### New People
- {Name} (ID: {id})

### Updated People
- {Name}: {what changed}

### New Relationships
- {Person A} -> {type} -> {Person B}

---

## Validation Results

- [x] All relationships have valid endpoints
- [x] No logical inconsistencies detected
- [x] Tree file updated successfully

---

## Issues Requiring Attention

- {Any problems found during integration}
```

### Family Tree (family-tree.md)

```markdown
# Family Tree

Last updated: {date}
Total people: {count}
Total relationships: {count}

---

## People

### {ID}: {Full Name}
- Born: {date}, {place}
- Died: {date}, {place}
- Aliases: {list}
- Confidence: {High/Medium/Low}
- Sources: {list}
- Added: {date}
- Last verified: {date}

---

## Relationships

| Person A | Relationship | Person B | Confidence | Source |
|----------|--------------|----------|------------|--------|
| {ID} | parent of | {ID} | {level} | {source} |

---

## Changelog

| Date | Action | Details |
|------|--------|---------|
| {date} | Added | {person name} |
| {date} | Updated | {person name}: {what changed} |
| {date} | Linked | {person A} -> {relationship} -> {person B} |
```

## Quality Criteria

- [ ] All verified records integrated
- [ ] Each person has a unique identifier
- [ ] All relationships link to existing people
- [ ] No logical inconsistencies in relationships
- [ ] Changelog reflects all changes
- [ ] Tree file saved successfully

## Completion

Present: Integration report with changes made. Approve -> Visualize. If relationship conflicts, loop -> Verify.
