---
description: "Execute Frame stage to define a new framework's purpose and boundaries"
argument-hint: "<framework-name> [--config <file>]"
---

# Frame

Define the purpose and boundaries of a new framework.

## Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `framework-name` | Yes | Name for the framework (kebab-case) |
| `--config` | No | Path to YAML config file with frame inputs |

## Config Support

When `--config` is provided, read inputs from the config file's `frame` section:

```yaml
frame:
  problem: "What problem this framework solves"
  domain: "Domain or field"
  users:
    - "Primary user"
    - "Secondary user"
  scope:
    in: ["included items"]
    out: ["excluded items"]
  constraints:
    - "Known limitations"
```

If config provides all required fields (`problem`, `domain`, `users`), skip interactive prompts and proceed directly to output generation. If any fields are missing, prompt for those specific fields only.

## Inputs

| Input | Source | Config Path |
|-------|--------|-------------|
| problem_description | User input or config | `frame.problem` |
| context | User input or config | `frame.domain`, `frame.users`, `frame.constraints` |
| scope | User input or config | `frame.scope.in`, `frame.scope.out` |
| reference_frameworks | Optional: existing frameworks | N/A |

### Input Format

**User-provided problem description:**

```yaml
problem_description: |
  What workflow or process needs systematizing?
  What's painful or inconsistent about it?
  What would success look like?
```

**User-provided context:**

```yaml
context:
  domain: [Area of work]
  constraints: [Limitations, requirements]
  intended_users: [Who will run this framework]
```

**Optional reference frameworks:**

```yaml
reference_frameworks:
  - name: [Framework Name]
    path: docs/models/[framework].md
```

## Process

**1. Clarify Problem** - Ask what workflow or process the user wants to systematize:
- What are the steps they currently do manually?
- What's painful or inconsistent about it?
- What would success look like?

**2. Articulate Purpose** - Draft why this framework should exist:
- What value does systematizing provide?
- Why a framework vs. a checklist or ad-hoc process?

**3. Set Boundaries** - Define scope:
- What's explicitly in scope?
- What's explicitly out of scope?
- What adjacent problems are we not solving?

**4. Identify Triggers** - When should this framework be run:
- One-time vs. ongoing?
- What events or conditions trigger execution?

**5. Determine Type** - What kind of framework:
- Foundation: single assessment, run once, feeds other frameworks
- Pipeline: sequential stages, ongoing, feedback loops
- Cyclical: repeating execution on a cadence
- Hub: central stage that others connect to

**6. Map Dependencies** - What other frameworks does this require:
- Does it need outputs from another framework?
- What external inputs are required?

## Interaction Protocol

Use structured questions for:
- Gathering problem description, context, constraints
- Framework type selection
- Scope boundary decisions
- Charter approval

**Menu format:**
- 2-4 options per question
- Each option: short label (1-5 words) + description

## Output

Create and save to `output/{date}/{name}/` where `{date}` is today (YYYY-MM-DD) and `{name}` is the framework name (kebab-case).

If running multiple times on the same day, add a suffix: `output/2026-01-08-02/{name}/`.

| File | Content |
|------|---------|
| `run.md` | Initialize run log with progress tracking |
| `1-frame/charter.md` | Framework charter |

### Framework Charter (1-frame/charter.md)

```markdown
# Framework Charter: {NAME}

**Acronym:** {If applicable}

## Problem
{Specific workflow/process being addressed}
{Current pain points}

## Purpose
{Why this framework needs to exist}
{Value over ad-hoc approach}

## Scope
**In:**
- {What's covered}

**Out:**
- {What's excluded}

## Triggers
- {When to run this framework}

## Type
{Foundation / Pipeline / Cyclical / Hub}

## Dependencies
| Requires | From | Why |
|----------|------|-----|
| {Input} | {Source} | {How it's used} |
```

## Quality Criteria

- [ ] Problem is specific, not generic
- [ ] Purpose explains value vs. ad-hoc process
- [ ] Scope has explicit in/out boundaries
- [ ] Triggers are concrete conditions
- [ ] Type matches workflow pattern
- [ ] Dependencies identified (or "none" stated)

## Completion

Present: Framework charter with all sections. Approve → Organize.

When running with `--config` and all inputs provided, still present the charter for approval unless called from `/framework-auto --approve-all`.
