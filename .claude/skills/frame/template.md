# Frame Template

Output templates for the Frame stage.

---

## Run Log (run.md) - Initialize

```markdown
# FORGE Run: {Model Name}

Started: {date}
Status: in_progress

---

## Frame - {date}

**Inputs provided:**
- Problem: {summary}
- Context: {summary}

**Decisions:**
| Question | Choice |
|----------|--------|
| {question} | {selection} |

**Output:** `{model}-charter.md`
```

---

## Model Charter ({model}-charter.md)

```markdown
# Model Charter: {NAME}

**Acronym:** {If applicable}

## Problem
{Specific workflow/process being addressed}
{Current pain points}

## Purpose
{Why this model needs to exist}
{Value over ad-hoc approach}

## Scope
**In:**
- {What's covered}

**Out:**
- {What's excluded}

## Triggers
- {When to run this model}

## Type
{Foundation / Pipeline}

## Dependencies
| Requires | From | Why |
|----------|------|-----|
| {Input} | {Model} | {How it's used} |
```
