# Build MCP Server + Web UI for Framework Generator

## MANDATORY FIRST ACTION

**STOP. Before doing ANYTHING else, you MUST:**

1. **Read `PROGRESS.md`** in the project root
2. **If it doesn't exist**, create it using the template below
3. **Update the "Last Updated" timestamp** to the current time
4. **Check for open High severity bugs** - fix these FIRST
5. **Identify the next unchecked task** from the current phase

**DO NOT skip this step. DO NOT proceed to implementation without reading PROGRESS.md first.**

---

## PROGRESS.md Template

If `PROGRESS.md` doesn't exist, create it with this exact content:

```markdown
# MCP Server Progress

## Status
Current Phase: 1
Last Updated: {YYYY-MM-DD HH:MM}

## Features Implemented

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

## Bugs Found
| Bug | Severity | Status | Notes |
|-----|----------|--------|-------|

## Blockers

## Next Actions
1. Install dependencies
2. Create lib/types.ts
```

---

## Iteration Protocol (MUST FOLLOW)

Every single iteration, execute these steps IN ORDER:

### Step 1: Read Progress (REQUIRED)
```
Read file: PROGRESS.md
```
Understand: What phase? What's done? Any bugs? What's next?

### Step 2: Update Timestamp (REQUIRED)
Edit PROGRESS.md to update "Last Updated" to current time.

### Step 3: Check for Bugs (REQUIRED)
If there are High severity bugs with Status=Open, fix them BEFORE any new work.

### Step 4: Implement Next Task
Find the first unchecked `- [ ]` item in the current phase. Implement it.

### Step 5: Test
Run `npm run build` to verify no errors.

### Step 6: Update Progress (REQUIRED)
Edit PROGRESS.md:
- Check off completed task: `- [x]`
- Add any bugs found to the table
- Update "Next Actions"
- If phase complete, increment "Current Phase"

### Step 7: Continue or Complete
If all phases done and all checks pass → output `<promise>DONE</promise>`
Otherwise → continue to next iteration

---

## Context

Working directory: `c:\Users\athra\Projects\Personal\Framework-Generator\mcp-server`

Parent directory `Framework-Generator` contains:
- `commands/*.md` - Stage definitions (frame, organize, refine, generate, evaluate)
- `output/` - Where framework runs are stored
- `CLAUDE.md` - Run log template and conventions

## Goal

Build an MCP server with HTTP/SSE transport + Web UI that exposes the Framework Generator's 5-stage workflow.

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

## Bug Severity Guide

- **High**: Blocks build, crashes app, or breaks core functionality
- **Medium**: Feature doesn't work correctly but app still runs
- **Low**: Cosmetic, edge case, or minor issue

## Error Handling

When you encounter an error:
1. **IMMEDIATELY** add it to PROGRESS.md bugs table
2. Assign severity (High/Med/Low)
3. Set Status to "Open"
4. Attempt fix - document approach in Notes column
5. If fixed, update Status to "Fixed"
6. If not fixed after 2 attempts, add to Blockers section

## Completion Criteria

ALL must be true:
- All Phase 1-5 tasks checked `[x]` in PROGRESS.md
- No High severity bugs with Status=Open
- `npm run build` passes
- `npm run dev` starts successfully

When ALL criteria met: `<promise>DONE</promise>`

## Testing the MCP Endpoint

After implementing the MCP server (Phase 2), verify it works:

### 1. Start the dev server
```bash
npm run dev
```

### 2. Test SSE connection (should stay open)
```bash
curl -N http://localhost:3000/api/mcp
```

### 3. Test tools/list (JSON-RPC)
```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```
**Expected**: Returns JSON with 8 tools listed

### 4. Test framework_list tool
```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"framework_list","arguments":{}},"id":2}'
```
**Expected**: Returns array of framework runs (may be empty)

### 5. Optional: MCP Inspector
```bash
npx @modelcontextprotocol/inspector http://localhost:3000/api/mcp
```

If any test fails, log it in PROGRESS.md bugs table with severity High.

## Technical Notes

- Use Next.js App Router (not Pages Router)
- Prefer server components where possible
- Keep UI minimal - function over form
- MCP SDK docs: https://github.com/modelcontextprotocol/typescript-sdk
