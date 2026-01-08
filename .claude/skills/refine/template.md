# Refine Template

Output templates for the Refine stage.

---

## Run Log (run.md) - Append

```markdown
---

## Refine - {date}

**Stages specified:** {list}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Outputs:** `{model}-{stage}-spec.md` for each stage
```

---

## Stage Specification ({model}-{stage}-spec.md)

One file per stage.

```markdown
# Stage Specification: {STAGE NAME}

## Purpose
{One sentence: what this stage accomplishes}

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
| {Action verb + object} | {Specific inputs} | {Specific outputs} |

## {Context Table Name}

| {Column} | {Column} |
|----------|----------|
| {Data} | {Data} |

## Output Format

{Template block showing expected structure}

## Quality Criteria

- [ ] {Specific, verifiable criterion}

## Completion

Present: {What to show}. Approve -> {Next stage}.
```
