# Evaluate Template

Output templates for the Evaluate stage.

---

## Run Log (run.md) - Finalize

```markdown
---

## Evaluate - {date}

**Checks performed:**
- Convention compliance: {pass/fail}
- Completeness: {pass/fail}
- Consistency: {pass/fail}
- Dry run: {pass/fail}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{model}-validation.md`

---

## Outcome

**Status:** complete / aborted
**Result:** {model} model created with {n} stages
**Files generated:**
- `docs/models/{model}.md`
- `.claude/skills/{stage}/SKILL.md` (per stage)
```

---

## Validation Report ({model}-validation.md)

```markdown
# Validation Report: {MODEL NAME}

## Convention Compliance

### Model Document
- [ ] Has purpose statement
- [ ] Has inputs section
- [ ] Has stages with activities
- [ ] Has feedback loops
- [ ] Has quality criteria
- [ ] Mermaid renders

### Skill Files
| Skill | Frontmatter | Inputs | Process | Output | Criteria | Completion |
|-------|-------------|--------|---------|--------|----------|------------|
| {name} | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] |

### Consistency
- [ ] Stage names match
- [ ] I/O chains connect
- [ ] Terminology consistent

## Gaps Found

| Location | Issue | Severity | Resolution |
|----------|-------|----------|------------|
| {File:section} | {Problem} | {High/Med/Low} | {Fix or accept} |

## Dry Run Notes

**Stage tested:** {First stage}
**Scenario:** {What was tested}

**Observations:**
- {What worked}
- {What was unclear}
- {What's missing}

## Status

[ ] Ready for use
[ ] Needs refinement (return to Refine)
[ ] Needs restructure (return to Organize)
[ ] Needs rescoping (return to Frame)

## Next Steps
{If ready: how to use the model}
{If not: what to fix first}
```
