# Build MCP Server + Web UI for Framework Generator

## Context

You are working in `c:\Users\athra\Projects\Personal\Framework-Generator\mcp-server` - a fresh Next.js 16 project with TypeScript and Tailwind.

The parent directory `Framework-Generator` contains a Claude Code plugin with:
- `commands/*.md` - Stage definitions (frame.md, organize.md, refine.md, generate.md, evaluate.md)
- `output/` - Where framework runs are stored
- `CLAUDE.md` - Run log template and conventions

## Goal

Build an MCP server with HTTP/SSE transport + Web UI that exposes the Framework Generator's 5-stage workflow (Frame → Organize → Refine → Generate → Evaluate).

## Progress Tracking

**IMPORTANT**: Maintain a `PROGRESS.md` file in the project root to track your work.

### PROGRESS.md Format

```markdown
# MCP Server Progress

## Status
Current Phase: {1-5}
Last Updated: {timestamp}

## Features Implemented
- [ ] Feature name - brief description

## Bugs Found
| Bug | Severity | Status | Notes |
|-----|----------|--------|-------|
| Description | High/Med/Low | Open/Fixed | How discovered, fix attempted |

## Blockers
- Description of what's blocking progress

## Next Actions
1. Immediate next step
2. Following step
```

### Progress Rules

1. **Before each iteration**: Read `PROGRESS.md` to understand current state
2. **After implementing a feature**: Check the box and add completion note
3. **When encountering a bug**: Add to bugs table immediately with severity
4. **Before attempting a fix**: Document what you'll try in the Notes column
5. **After fixing a bug**: Update status to "Fixed" and note the solution
6. **If blocked**: Add to Blockers section and attempt workaround

## Requirements

### MCP Tools (8 total)
| Tool | Description |
|------|-------------|
| `framework_frame` | Define new framework purpose/boundaries |
| `framework_organize` | Map stages and flow |
| `framework_refine` | Specify each stage in detail |
| `framework_generate` | Produce framework plugin |
| `framework_evaluate` | Validate and determine next action |
| `framework_status` | Get current run status |
| `framework_list` | List all framework runs |
| `framework_resume` | Continue from last completed stage |

### Web UI Pages
| Route | Purpose |
|-------|---------|
| `/` | Dashboard - list frameworks and runs |
| `/new` | Create new framework wizard |
| `/runs/[date]/[name]` | View run progress and artifacts |

### Key Patterns
- State lives in filesystem (`../output/{date}/{name}/run.md`)
- Parse `../commands/*.md` to extract templates and quality criteria
- Each stage tool returns `approval: { required: true, nextStage, qualityCriteria }`
- MCP endpoint at `/api/mcp` using SSE transport

## Phases

### Phase 1: Core Infrastructure
- [ ] Install dependencies: `@modelcontextprotocol/sdk`, `zod`, `gray-matter`
- [ ] Create `lib/types.ts` with type definitions
- [ ] Create `lib/utils/paths.ts` for path resolution
- [ ] Create `lib/commands/loader.ts` to parse command markdown files
- [ ] Create `lib/state/run-manager.ts` for run.md parsing/writing

### Phase 2: MCP Server
- [ ] Create `lib/mcp/server.ts` with tool registrations
- [ ] Create `app/api/mcp/route.ts` for HTTP/SSE endpoint
- [ ] Implement all 8 tools with proper Zod schemas
- [ ] Test MCP endpoint responds correctly

### Phase 3: REST API
- [ ] Create `app/api/frameworks/route.ts` - list/create frameworks
- [ ] Create `app/api/runs/route.ts` - list runs
- [ ] Create `app/api/runs/[date]/[name]/route.ts` - get run details

### Phase 4: Web UI
- [ ] Create dashboard at `app/page.tsx`
- [ ] Create new framework wizard at `app/new/page.tsx`
- [ ] Create run detail view at `app/runs/[date]/[name]/page.tsx`
- [ ] Add components: FrameworkCard, RunProgress, MarkdownPreview

### Phase 5: Verification
- [ ] `npm run build` compiles without errors
- [ ] `npm run dev` starts at localhost:3000
- [ ] MCP endpoint accepts tool calls
- [ ] Web UI displays framework data

## Iteration Protocol

Each iteration, follow this sequence:

1. **Read** `PROGRESS.md` to understand current state
2. **Check** for open bugs - prioritize High severity fixes
3. **Identify** next unchecked feature from current phase
4. **Implement** the feature or fix
5. **Test** by running `npm run build` or manual verification
6. **Update** `PROGRESS.md` with results
7. **If phase complete**, run full verification before moving to next phase

## Error Handling

When you encounter an error:

1. **Log it** in PROGRESS.md bugs table immediately
2. **Categorize** severity:
   - High: Blocks build or core functionality
   - Medium: Feature doesn't work but build passes
   - Low: Minor issue, cosmetic, or edge case
3. **Attempt fix** - document approach in Notes
4. **If fix fails after 2 attempts**: Add to Blockers, try workaround or move on
5. **If workaround found**: Note it and continue

## Completion Criteria

All must be true:
- [ ] All Phase 1-4 features checked in PROGRESS.md
- [ ] No High severity bugs open
- [ ] `npm run build` passes
- [ ] `npm run dev` starts successfully
- [ ] PROGRESS.md shows all features implemented

When ALL criteria are met, output: <promise>DONE</promise>

## Notes

- Use App Router (not Pages Router)
- Prefer server components where possible
- Keep UI minimal - function over form
- Read existing `../commands/*.md` files to understand stage structure
- If MCP SDK has issues, check https://github.com/modelcontextprotocol/typescript-sdk
