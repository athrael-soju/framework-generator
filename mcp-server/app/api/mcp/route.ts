export async function GET(request: Request) {
  // SSE endpoint for server-to-client messages
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(encoder.encode(`event: connected\ndata: {"status": "connected"}\n\n`));

      // Keep connection alive with periodic pings
      const pingInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch {
          clearInterval(pingInterval);
        }
      }, 30000);

      // Handle connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(pingInterval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate request structure
    if (!body.method) {
      return Response.json(
        { error: 'Missing method field' },
        { status: 400 }
      );
    }

    // Handle MCP protocol messages
    if (body.method === 'initialize') {
      return Response.json({
        jsonrpc: '2.0',
        id: body.id,
        result: {
          protocolVersion: '2024-11-05',
          serverInfo: {
            name: 'framework-generator',
            version: '1.0.0',
          },
          capabilities: {
            tools: {},
          },
        },
      });
    }

    if (body.method === 'tools/list') {
      // Get tools from the MCP server
      const tools = [
        {
          name: 'framework_frame',
          description: "Define a new framework's purpose and boundaries. This is the first stage.",
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string', description: 'Name of the framework' },
              problemDescription: { type: 'string', description: 'What workflow needs systematizing' },
              domain: { type: 'string', description: 'Area of work' },
              constraints: { type: 'array', items: { type: 'string' }, description: 'Limitations' },
              intendedUsers: { type: 'array', items: { type: 'string' }, description: 'Who will use this' },
              triggers: { type: 'array', items: { type: 'string' }, description: 'When to run' },
              frameworkType: { type: 'string', enum: ['Foundation', 'Pipeline', 'Cyclical', 'Hub'] },
            },
            required: ['frameworkName', 'problemDescription', 'domain', 'constraints', 'intendedUsers', 'triggers', 'frameworkType'],
          },
        },
        {
          name: 'framework_organize',
          description: 'Map the stages and flow for an existing framework.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
              stages: { type: 'array' },
              flowDiagram: { type: 'string' },
              feedbackLoops: { type: 'array' },
              terminalStates: { type: 'array' },
            },
            required: ['frameworkName', 'date', 'stages', 'flowDiagram'],
          },
        },
        {
          name: 'framework_refine',
          description: 'Specify each stage in detail.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
              stageSpecifications: { type: 'array' },
            },
            required: ['frameworkName', 'date', 'stageSpecifications'],
          },
        },
        {
          name: 'framework_generate',
          description: 'Generate the framework plugin with command files.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
            },
            required: ['frameworkName', 'date'],
          },
        },
        {
          name: 'framework_evaluate',
          description: 'Validate the generated framework.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
              conventionChecks: { type: 'object' },
              dryRunNotes: { type: 'string' },
              status: { type: 'string', enum: ['ready', 'needs-refinement', 'needs-restructure', 'needs-rescoping'] },
            },
            required: ['frameworkName', 'date', 'conventionChecks', 'status'],
          },
        },
        {
          name: 'framework_status',
          description: 'Get the current status of a framework run.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
            },
            required: ['frameworkName', 'date'],
          },
        },
        {
          name: 'framework_list',
          description: 'List all framework runs.',
          inputSchema: {
            type: 'object',
            properties: {
              filter: { type: 'string', enum: ['all', 'in-progress', 'complete'] },
            },
          },
        },
        {
          name: 'framework_resume',
          description: 'Get information to resume a framework run.',
          inputSchema: {
            type: 'object',
            properties: {
              frameworkName: { type: 'string' },
              date: { type: 'string' },
            },
            required: ['frameworkName', 'date'],
          },
        },
      ];

      return Response.json({
        jsonrpc: '2.0',
        id: body.id,
        result: { tools },
      });
    }

    if (body.method === 'tools/call') {
      const { name, arguments: args } = body.params;

      // Use a simple handler approach instead of full transport
      const result = await handleToolCall(name, args);

      return Response.json({
        jsonrpc: '2.0',
        id: body.id,
        result,
      });
    }

    // Unknown method
    return Response.json(
      {
        jsonrpc: '2.0',
        id: body.id,
        error: {
          code: -32601,
          message: `Method not found: ${body.method}`,
        },
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('MCP API error:', error);
    return Response.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal error',
        },
      },
      { status: 500 }
    );
  }
}

// Simple tool call handler
async function handleToolCall(name: string, args: Record<string, unknown>) {
  const { loadCommand } = await import('@/lib/commands/loader');
  const {
    initializeRun,
    parseRunLog,
    updateStageComplete,
    listRuns,
    getCurrentStage,
    getLastCompletedStage,
    createStageDir,
    writeStageFile,
  } = await import('@/lib/state/run-manager');

  switch (name) {
    case 'framework_frame': {
      const { date, name: frameworkName } = await initializeRun(args.frameworkName as string);
      await createStageDir(date, frameworkName, 1, 'frame');

      const charter = `# Framework Charter: ${(args.frameworkName as string).toUpperCase()}

## Problem
${args.problemDescription}

## Purpose
Systematize the ${args.domain} workflow.

## Scope
**In:** ${args.domain} activities
**Out:** Activities outside scope

## Triggers
${(args.triggers as string[]).map((t: string) => `- ${t}`).join('\n')}

## Type
${args.frameworkType}

## Constraints
${(args.constraints as string[]).map((c: string) => `- ${c}`).join('\n')}
`;

      await writeStageFile(date, frameworkName, 1, 'frame', 'charter.md', charter);
      await updateStageComplete(date, frameworkName, 'frame', 'Charter created');

      return {
        content: [{ type: 'text', text: JSON.stringify({ success: true, date, name: frameworkName, stage: 'frame' }) }],
      };
    }

    case 'framework_status': {
      const log = await parseRunLog(args.date as string, args.frameworkName as string);
      if (!log) {
        return { content: [{ type: 'text', text: JSON.stringify({ error: 'Run not found' }) }], isError: true };
      }
      return {
        content: [{ type: 'text', text: JSON.stringify({
          name: log.name,
          status: log.status,
          currentStage: getCurrentStage(log),
          lastCompleted: getLastCompletedStage(log),
          progress: log.progress,
        }) }],
      };
    }

    case 'framework_list': {
      const runs = await listRuns();
      const filtered = args.filter === 'in-progress'
        ? runs.filter(r => r.status === 'In Progress')
        : args.filter === 'complete'
          ? runs.filter(r => r.status === 'Complete')
          : runs;
      return { content: [{ type: 'text', text: JSON.stringify({ count: filtered.length, runs: filtered }) }] };
    }

    case 'framework_resume': {
      const log = await parseRunLog(args.date as string, args.frameworkName as string);
      if (!log) {
        return { content: [{ type: 'text', text: JSON.stringify({ error: 'Run not found' }) }], isError: true };
      }
      const currentStage = getCurrentStage(log);
      const command = currentStage ? await loadCommand(currentStage) : null;
      return {
        content: [{ type: 'text', text: JSON.stringify({
          name: log.name,
          resumeAt: currentStage,
          command: command?.description,
        }) }],
      };
    }

    default:
      return { content: [{ type: 'text', text: JSON.stringify({ error: `Unknown tool: ${name}` }) }], isError: true };
  }
}
