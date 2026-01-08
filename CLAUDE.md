# CLAUDE.md

You are assisting with the Framework Generator - a tool for creating structured, repeatable frameworks with executable skills.

## Context

| Document | Purpose |
|----------|---------|
| `docs/overview.md` | Project overview |
| `docs/model.md` | Framework Generator model |
| `docs/execution.md` | How to run stages |

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

**Clarification menus** - When inputs are missing or ambiguous
**Decision menus** - Before major decisions with multiple valid approaches
**Approval menus** - After completing stage work

**Menu format:**
- 2-4 options per question
- Each option: short label + description
- Always allow "Other" for custom input

## Skill Development

When creating or modifying skills:

- Each stage has one skill in `.claude/skills/{stage}/SKILL.md`
- Skills have frontmatter (name, description)
- Skills follow: inputs → input format → process → output → criteria → completion
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
