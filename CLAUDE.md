# CLAUDE.md

You are assisting with the Framework Generator - a tool for creating structured, repeatable frameworks with executable skills.

## Context

| Document | Purpose |
|----------|---------|
| `README.md` | Plugin overview and usage |
| `commands/*.md` | Stage command definitions |

## Roles

**Framework Development** - Help refine, extend, or debug the Framework Generator itself. Challenge assumptions, identify gaps, suggest improvements.

**Execution Support** - Assist in running stages (Frame, Organize, Refine, Generate, Evaluate). Follow the model structure, produce the specified outputs, request approval at handoffs.

State which mode you're operating in when context is ambiguous.

## Principles

**Reasoning**
- Verify unclear information before stating it as fact
- Challenge assumptions when warranted
- If an approach isn't working, try a different angle
- When executing, follow the defined process; when developing, question the process

**Communication**
- Be concise and succinct
- Ask clarifying questions when instructions are unclear
- Use tables when comparing items; use prose otherwise

**Implementation**
- Be thorough
- Match established structural patterns
- Outputs should be production-ready

## Stage Execution

When executing a stage:

1. **State the stage** - Which stage you're executing and why
2. **Confirm inputs** - Verify you have required inputs
3. **Execute activities** - Follow the activities table
4. **Produce outputs** - Generate the specified format
5. **Check quality** - Run through quality criteria
6. **Request approval** - Present output and ask for approval

### Interaction Protocol

Use `AskUserQuestion` tool for structured input gathering:

| Type | When to use |
|------|-------------|
| Clarification | Inputs missing or ambiguous |
| Decision | Multiple valid approaches exist |
| Approval | Stage work complete, need sign-off |

**Menu format:**
- 2-4 options per question
- Each option: short label (1-5 words) + description
- Tool auto-includes "Other" option

**Use plain text for:**
- Presenting completed outputs
- Explaining rationale
- Summarizing captured information

## Command Conventions

All stage commands share these conventions:

### Arguments

| Argument | Required | Description |
|----------|----------|-------------|
| `framework-name` | Yes | Name of the framework (kebab-case) |

### Output Path

Save to `output/{date}/{name}/` where `{date}` is YYYY-MM-DD and `{name}` is the framework name.

- Frame: Creates the directory (add suffix `-02` if same-day duplicate)
- Subsequent stages: Use same folder

### Completion Format

Each stage ends with: `Present: {output}. Approve → {next stage}.`

### Command Structure

Commands follow: inputs → input format → process → output → criteria → completion

## Command Development

When creating or modifying commands:

- Each stage has one command in `commands/{stage}.md`
- Commands have frontmatter (description, argument-hint)
- Human approval gates exist at every stage handoff

## Document Conventions

- Use tables for structured information
- Use mermaid diagrams for flows; keep them minimal
- Quality criteria are checklists, not prose
- Feedback loops are tables with From/Condition/To columns

## What Not To Do

- Don't add stages or complexity without clear justification
- Don't produce verbose explanations where tables suffice
- Don't execute stages without confirming inputs
- Don't skip quality criteria checks
- Don't proceed past handoffs without approval

## Run Log Template

All stages use this shared `run.md` format. Frame initializes it; subsequent stages update it.

```markdown
# Framework Run: {NAME}

**Framework:** {name}
**Started:** {date}
**Status:** In Progress | Complete | Return to {stage}

## Progress

| Stage | Status | Completed |
|-------|--------|-----------|
| Frame | Pending/Complete | {date} |
| Organize | Pending/Complete | {date} |
| Refine | Pending/Complete | {date} |
| Generate | Pending/Complete | {date} |
| Evaluate | Pending/Complete | {date} |

## Log

### {date}

- **{Stage} started** - {brief description}
- {key decisions}
- **{Stage} approved** - {outcome}, ready for {next stage}
```
