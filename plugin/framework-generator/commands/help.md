---
description: "Show help for Framework Generator commands"
---

# Framework Generator Help

The Framework Generator creates structured, repeatable frameworks with executable skills through staged refinement.

## Commands

| Command | Description |
|---------|-------------|
| `/frame` | Define framework purpose and boundaries |
| `/organize` | Map stages and flow |
| `/refine` | Specify each stage in detail |
| `/generate` | Produce documentation and skill files |
| `/evaluate` | Validate and iterate |

## Workflow

```
Frame → Organize → Refine → Generate → Evaluate
  ↑__________________________________________|
              (feedback loops)
```

## Quick Start

1. **Start a new framework:**
   ```
   /frame my-framework
   ```

2. **Continue through stages:**
   - Each stage produces artifacts in `output/{date}/{name}/`
   - Approve each stage before proceeding to the next
   - Use feedback loops to return to earlier stages if needed

## Stage Outputs

| Stage | Output Location |
|-------|-----------------|
| Frame | `1-frame/charter.md` |
| Organize | `2-organize/stage-map.md` |
| Refine | `3-refine/{stage}-spec.md` |
| Generate | `4-generate/` (full framework) |
| Evaluate | `5-evaluate/validation.md` |

## Principles

- Human approval gates at every stage handoff
- Quality criteria checklists for each stage
- Feedback loops for iteration
- Self-contained skill files (no external references)

## More Information

See the plugin README for detailed documentation.
