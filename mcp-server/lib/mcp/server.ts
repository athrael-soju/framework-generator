import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { loadCommand } from '../commands/loader';
import {
  initializeRun,
  parseRunLog,
  updateStageComplete,
  setRunStatus,
  getCurrentStage,
  getLastCompletedStage,
  listRuns,
  createStageDir,
  writeStageFile,
  readStageFile,
} from '../state/run-manager';
import type { StageExecutionResult } from '../types';

// Create MCP server instance
export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'framework-generator',
    version: '1.0.0',
  });

  // Register all tools
  registerFrameTools(server);
  registerOrganizeTools(server);
  registerRefineTools(server);
  registerGenerateTools(server);
  registerEvaluateTools(server);
  registerUtilityTools(server);

  return server;
}

// Frame tool - Define new framework purpose/boundaries
function registerFrameTools(server: McpServer) {
  server.tool(
    'framework_frame',
    'Define a new framework\'s purpose and boundaries. This is the first stage.',
    {
      frameworkName: z.string().describe('Name of the framework (will be converted to kebab-case)'),
      problemDescription: z.string().describe('What workflow or process needs systematizing?'),
      domain: z.string().describe('Area of work this framework covers'),
      constraints: z.array(z.string()).describe('Limitations or requirements'),
      intendedUsers: z.array(z.string()).describe('Who will run this framework'),
      triggers: z.array(z.string()).describe('When should this framework be run'),
      frameworkType: z.enum(['Foundation', 'Pipeline', 'Cyclical', 'Hub']).describe('Type of framework pattern'),
    },
    async (args) => {
      try {
        // Initialize the run
        const { date, name } = await initializeRun(args.frameworkName);

        // Create frame stage directory
        await createStageDir(date, name, 1, 'frame');

        // Generate charter content
        const charter = generateCharter(args);

        // Write charter file
        await writeStageFile(date, name, 1, 'frame', 'charter.md', charter);

        // Update run log
        await updateStageComplete(date, name, 'frame', 'Charter created, ready for Organize');

        // Load frame command for quality criteria
        const frameCommand = await loadCommand('frame');

        const result: StageExecutionResult = {
          success: true,
          stage: 'frame',
          outputs: [
            { file: 'run.md', content: 'Run log initialized' },
            { file: '1-frame/charter.md', content: charter },
          ],
          approval: {
            required: true,
            nextStage: 'organize',
            qualityCriteria: frameCommand?.qualityCriteria || [],
          },
        };

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                success: false,
                stage: 'frame',
                error: error instanceof Error ? error.message : 'Unknown error',
              }),
            },
          ],
          isError: true,
        };
      }
    }
  );
}

// Organize tool - Map stages and flow
function registerOrganizeTools(server: McpServer) {
  server.tool(
    'framework_organize',
    'Map the stages and flow for an existing framework. Requires Frame stage complete.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
      stages: z.array(z.object({
        name: z.string(),
        purpose: z.string(),
        inputs: z.string(),
        outputs: z.string(),
      })).describe('Array of stages with their purpose, inputs, and outputs'),
      flowDiagram: z.string().describe('Mermaid flowchart diagram'),
      feedbackLoops: z.array(z.object({
        from: z.string(),
        condition: z.string(),
        to: z.string(),
      })).optional().describe('Feedback loops between stages'),
      terminalStates: z.array(z.object({
        name: z.string(),
        definition: z.string(),
        actions: z.string(),
      })).optional().describe('Terminal states for the framework'),
    },
    async (args) => {
      try {
        // Verify run exists and frame is complete
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const frameStatus = runLog.progress.find(p => p.stage === 'Frame');
        if (frameStatus?.status !== 'Complete') {
          throw new Error('Frame stage must be complete before Organize');
        }

        // Create organize stage directory
        await createStageDir(args.date, args.frameworkName, 2, 'organize');

        // Generate stage map content
        const stageMap = generateStageMap(args);

        // Write stage map file
        await writeStageFile(args.date, args.frameworkName, 2, 'organize', 'stage-map.md', stageMap);

        // Update run log
        await updateStageComplete(args.date, args.frameworkName, 'organize', 'Stage map created, ready for Refine');

        const organizeCommand = await loadCommand('organize');

        const result: StageExecutionResult = {
          success: true,
          stage: 'organize',
          outputs: [
            { file: '2-organize/stage-map.md', content: stageMap },
          ],
          approval: {
            required: true,
            nextStage: 'refine',
            qualityCriteria: organizeCommand?.qualityCriteria || [],
          },
        };

        return {
          content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, stage: 'organize', error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

// Refine tool - Specify each stage in detail
function registerRefineTools(server: McpServer) {
  server.tool(
    'framework_refine',
    'Specify each stage in detail. Requires Organize stage complete.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
      stageSpecifications: z.array(z.object({
        stageName: z.string(),
        purpose: z.string(),
        activities: z.array(z.object({
          activity: z.string(),
          inputs: z.string(),
          outputs: z.string(),
        })),
        contextTables: z.record(z.string(), z.array(z.record(z.string(), z.string()))).optional(),
        outputFormat: z.string(),
        qualityCriteria: z.array(z.string()),
        completion: z.string(),
      })).describe('Detailed specifications for each stage'),
    },
    async (args) => {
      try {
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const organizeStatus = runLog.progress.find(p => p.stage === 'Organize');
        if (organizeStatus?.status !== 'Complete') {
          throw new Error('Organize stage must be complete before Refine');
        }

        await createStageDir(args.date, args.frameworkName, 3, 'refine');

        const outputs: { file: string; content: string }[] = [];

        for (const spec of args.stageSpecifications) {
          const content = generateStageSpec(spec);
          const fileName = `${spec.stageName.toLowerCase().replace(/\s+/g, '-')}-spec.md`;
          await writeStageFile(args.date, args.frameworkName, 3, 'refine', fileName, content);
          outputs.push({ file: `3-refine/${fileName}`, content });
        }

        await updateStageComplete(args.date, args.frameworkName, 'refine', 'Stage specifications created, ready for Generate');

        const refineCommand = await loadCommand('refine');

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            success: true,
            stage: 'refine',
            outputs,
            approval: {
              required: true,
              nextStage: 'generate',
              qualityCriteria: refineCommand?.qualityCriteria || [],
            },
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, stage: 'refine', error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

// Generate tool - Produce framework plugin
function registerGenerateTools(server: McpServer) {
  server.tool(
    'framework_generate',
    'Generate the framework plugin with command files. Requires Refine stage complete.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
    },
    async (args) => {
      try {
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const refineStatus = runLog.progress.find(p => p.stage === 'Refine');
        if (refineStatus?.status !== 'Complete') {
          throw new Error('Refine stage must be complete before Generate');
        }

        // Read previous stage outputs
        const charter = await readStageFile(args.date, args.frameworkName, 1, 'frame', 'charter.md');
        const stageMap = await readStageFile(args.date, args.frameworkName, 2, 'organize', 'stage-map.md');

        if (!charter || !stageMap) {
          throw new Error('Missing required stage outputs from Frame or Organize');
        }

        await createStageDir(args.date, args.frameworkName, 4, 'generate');

        // Generate plugin manifest
        const pluginManifest = {
          name: args.frameworkName,
          version: '1.0.0',
          description: `Framework plugin for ${runLog.name}`,
        };

        await writeStageFile(args.date, args.frameworkName, 4, 'generate', '.claude-plugin/plugin.json', JSON.stringify(pluginManifest, null, 2));

        // Generate README
        const readme = generateReadme(runLog.name);
        await writeStageFile(args.date, args.frameworkName, 4, 'generate', 'README.md', readme);

        // Generate CLAUDE.md
        const claudeMd = generateClaudeMd(runLog.name);
        await writeStageFile(args.date, args.frameworkName, 4, 'generate', 'CLAUDE.md', claudeMd);

        await updateStageComplete(args.date, args.frameworkName, 'generate', 'Plugin files generated, ready for Evaluate');

        const generateCommand = await loadCommand('generate');

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            success: true,
            stage: 'generate',
            outputs: [
              { file: '4-generate/.claude-plugin/plugin.json', content: JSON.stringify(pluginManifest) },
              { file: '4-generate/README.md', content: readme },
              { file: '4-generate/CLAUDE.md', content: claudeMd },
            ],
            approval: {
              required: true,
              nextStage: 'evaluate',
              qualityCriteria: generateCommand?.qualityCriteria || [],
            },
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, stage: 'generate', error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

// Evaluate tool - Validate and determine next action
function registerEvaluateTools(server: McpServer) {
  server.tool(
    'framework_evaluate',
    'Validate the generated framework and determine next action. Requires Generate stage complete.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
      conventionChecks: z.object({
        readme: z.array(z.boolean()),
        claudeMd: z.array(z.boolean()),
        commandFiles: z.array(z.boolean()),
        pluginManifest: z.array(z.boolean()),
        consistency: z.array(z.boolean()),
      }).describe('Results of convention checks'),
      dryRunNotes: z.string().optional().describe('Notes from dry run of first stage'),
      status: z.enum(['ready', 'needs-refinement', 'needs-restructure', 'needs-rescoping']).describe('Validation status'),
    },
    async (args) => {
      try {
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const generateStatus = runLog.progress.find(p => p.stage === 'Generate');
        if (generateStatus?.status !== 'Complete') {
          throw new Error('Generate stage must be complete before Evaluate');
        }

        await createStageDir(args.date, args.frameworkName, 5, 'evaluate');

        // Generate validation report
        const validationReport = generateValidationReport(args);
        await writeStageFile(args.date, args.frameworkName, 5, 'evaluate', 'validation.md', validationReport);

        // Update run status based on evaluation
        let nextAction = '';
        if (args.status === 'ready') {
          await setRunStatus(args.date, args.frameworkName, 'Complete');
          nextAction = 'Framework is ready for use';
        } else if (args.status === 'needs-refinement') {
          await setRunStatus(args.date, args.frameworkName, 'Return to Refine');
          nextAction = 'Return to Refine stage to address issues';
        } else if (args.status === 'needs-restructure') {
          await setRunStatus(args.date, args.frameworkName, 'Return to Organize');
          nextAction = 'Return to Organize stage to restructure';
        } else {
          await setRunStatus(args.date, args.frameworkName, 'Return to Frame');
          nextAction = 'Return to Frame stage to rescope';
        }

        await updateStageComplete(args.date, args.frameworkName, 'evaluate', nextAction);

        const evaluateCommand = await loadCommand('evaluate');

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            success: true,
            stage: 'evaluate',
            status: args.status,
            nextAction,
            outputs: [
              { file: '5-evaluate/validation.md', content: validationReport },
            ],
            approval: {
              required: args.status !== 'ready',
              nextStage: args.status === 'ready' ? null : args.status.replace('needs-', ''),
              qualityCriteria: evaluateCommand?.qualityCriteria || [],
            },
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ success: false, stage: 'evaluate', error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

// Utility tools - status, list, resume
function registerUtilityTools(server: McpServer) {
  // Status tool
  server.tool(
    'framework_status',
    'Get the current status of a framework run.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
    },
    async (args) => {
      try {
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const currentStage = getCurrentStage(runLog);
        const lastCompleted = getLastCompletedStage(runLog);

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            name: runLog.name,
            date: args.date,
            status: runLog.status,
            currentStage,
            lastCompletedStage: lastCompleted,
            progress: runLog.progress,
            recentLog: runLog.log.slice(-3),
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );

  // List tool
  server.tool(
    'framework_list',
    'List all framework runs.',
    {
      filter: z.enum(['all', 'in-progress', 'complete']).optional().describe('Filter runs by status'),
    },
    async (args) => {
      try {
        let runs = await listRuns();

        if (args.filter === 'in-progress') {
          runs = runs.filter(r => r.status === 'In Progress');
        } else if (args.filter === 'complete') {
          runs = runs.filter(r => r.status === 'Complete');
        }

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            count: runs.length,
            runs,
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );

  // Resume tool
  server.tool(
    'framework_resume',
    'Get information to resume a framework run from its last completed stage.',
    {
      frameworkName: z.string().describe('Name of the framework'),
      date: z.string().describe('Date of the run (YYYY-MM-DD)'),
    },
    async (args) => {
      try {
        const runLog = await parseRunLog(args.date, args.frameworkName);
        if (!runLog) {
          throw new Error(`Run not found: ${args.date}/${args.frameworkName}`);
        }

        const currentStage = getCurrentStage(runLog);
        const lastCompleted = getLastCompletedStage(runLog);

        if (!currentStage) {
          return {
            content: [{ type: 'text' as const, text: JSON.stringify({
              message: 'Framework run is complete',
              status: runLog.status,
            }, null, 2) }],
          };
        }

        // Load the command for the current stage
        const command = await loadCommand(currentStage);

        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            name: runLog.name,
            date: args.date,
            resumeAt: currentStage,
            lastCompleted,
            command: command ? {
              name: command.name,
              description: command.description,
              inputs: command.inputs,
              qualityCriteria: command.qualityCriteria,
            } : null,
            status: runLog.status,
          }, null, 2) }],
        };
      } catch (error) {
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }) }],
          isError: true,
        };
      }
    }
  );
}

// Helper functions for generating content
function generateCharter(args: {
  frameworkName: string;
  problemDescription: string;
  domain: string;
  constraints: string[];
  intendedUsers: string[];
  triggers: string[];
  frameworkType: string;
}): string {
  return `# Framework Charter: ${args.frameworkName.toUpperCase()}

## Problem
${args.problemDescription}

## Purpose
Systematize the ${args.domain} workflow to ensure consistency, reduce errors, and improve efficiency.

## Scope
**In:**
- ${args.domain} activities
- Workflows within defined constraints

**Out:**
- Activities outside ${args.domain}
- Edge cases not covered by constraints

## Triggers
${args.triggers.map(t => `- ${t}`).join('\n')}

## Type
${args.frameworkType}

## Dependencies
| Requires | From | Why |
|----------|------|-----|
| User input | User | Framework parameters |

## Constraints
${args.constraints.map(c => `- ${c}`).join('\n')}

## Intended Users
${args.intendedUsers.map(u => `- ${u}`).join('\n')}
`;
}

function generateStageMap(args: {
  frameworkName: string;
  stages: Array<{ name: string; purpose: string; inputs: string; outputs: string }>;
  flowDiagram: string;
  feedbackLoops?: Array<{ from: string; condition: string; to: string }>;
  terminalStates?: Array<{ name: string; definition: string; actions: string }>;
}): string {
  let content = `# Stage Map: ${args.frameworkName.toUpperCase()}

## Stages

| Stage | Purpose | Inputs | Outputs |
|-------|---------|--------|---------|
${args.stages.map(s => `| ${s.name} | ${s.purpose} | ${s.inputs} | ${s.outputs} |`).join('\n')}

## Flow

\`\`\`mermaid
${args.flowDiagram}
\`\`\`

`;

  if (args.feedbackLoops && args.feedbackLoops.length > 0) {
    content += `## Feedback Loops

| From | Condition | To |
|------|-----------|-----|
${args.feedbackLoops.map(f => `| ${f.from} | ${f.condition} | ${f.to} |`).join('\n')}

`;
  }

  if (args.terminalStates && args.terminalStates.length > 0) {
    content += `## Terminal States

| State | Definition | Actions |
|-------|------------|---------|
${args.terminalStates.map(t => `| ${t.name} | ${t.definition} | ${t.actions} |`).join('\n')}
`;
  }

  return content;
}

function generateStageSpec(spec: {
  stageName: string;
  purpose: string;
  activities: Array<{ activity: string; inputs: string; outputs: string }>;
  contextTables?: Record<string, Array<Record<string, string>>>;
  outputFormat: string;
  qualityCriteria: string[];
  completion: string;
}): string {
  let content = `# Stage Specification: ${spec.stageName}

## Purpose
${spec.purpose}

## Activities

| Activity | Inputs | Outputs |
|----------|--------|---------|
${spec.activities.map(a => `| ${a.activity} | ${a.inputs} | ${a.outputs} |`).join('\n')}

`;

  if (spec.contextTables) {
    for (const [tableName, rows] of Object.entries(spec.contextTables)) {
      if (rows.length > 0) {
        const headers = Object.keys(rows[0]);
        content += `## ${tableName}

| ${headers.join(' | ')} |
|${headers.map(() => '---').join('|')}|
${rows.map(row => `| ${headers.map(h => row[h] || '').join(' | ')} |`).join('\n')}

`;
      }
    }
  }

  content += `## Output Format

${spec.outputFormat}

## Quality Criteria

${spec.qualityCriteria.map(c => `- [ ] ${c}`).join('\n')}

## Completion

${spec.completion}
`;

  return content;
}

function generateReadme(name: string): string {
  return `# ${name} Framework

A Claude Code plugin for the ${name} framework.

## Installation

Add this plugin to your Claude Code configuration.

## Commands

| Command | Description |
|---------|-------------|
| /${name.toLowerCase()} | Run the ${name} framework |

## Workflow

See the stage map for detailed workflow information.

## Quick Start

1. Install the plugin
2. Run \`/${name.toLowerCase()}\` to start
3. Follow the stage prompts

## Output Structure

\`\`\`
runs/
  {date}/
    {name}/
      run.md
      1-{stage}/
      2-{stage}/
      ...
\`\`\`
`;
}

function generateClaudeMd(name: string): string {
  return `# CLAUDE.md

You are assisting with the ${name} Framework.

## Context

| Document | Purpose |
|----------|---------|
| \`README.md\` | Plugin overview |
| \`commands/*.md\` | Stage definitions |

## Stage Execution

When executing a stage:

1. **State the stage** - Which stage and why
2. **Confirm inputs** - Verify requirements
3. **Execute activities** - Follow the activities table
4. **Produce outputs** - Generate specified format
5. **Check quality** - Run through criteria
6. **Request approval** - Present output and ask

## Interaction Protocol

Use \`AskUserQuestion\` tool for:
- Gathering input
- Clarifying requirements
- Requesting approval

## Command Conventions

All stages save to \`./runs/{date}/{name}/\`.
`;
}

function generateValidationReport(args: {
  frameworkName: string;
  conventionChecks: {
    readme: boolean[];
    claudeMd: boolean[];
    commandFiles: boolean[];
    pluginManifest: boolean[];
    consistency: boolean[];
  };
  dryRunNotes?: string;
  status: string;
}): string {
  const checkmark = (passed: boolean) => passed ? '[x]' : '[ ]';

  return `# Validation Report: ${args.frameworkName}

## Convention Compliance

### README
${args.conventionChecks.readme.map((c, i) => `- ${checkmark(c)} Check ${i + 1}`).join('\n')}

### CLAUDE.md
${args.conventionChecks.claudeMd.map((c, i) => `- ${checkmark(c)} Check ${i + 1}`).join('\n')}

### Command Files
${args.conventionChecks.commandFiles.map((c, i) => `- ${checkmark(c)} Check ${i + 1}`).join('\n')}

### Plugin Manifest
${args.conventionChecks.pluginManifest.map((c, i) => `- ${checkmark(c)} Check ${i + 1}`).join('\n')}

### Consistency
${args.conventionChecks.consistency.map((c, i) => `- ${checkmark(c)} Check ${i + 1}`).join('\n')}

## Dry Run Notes

${args.dryRunNotes || 'No dry run performed'}

## Status

${args.status === 'ready' ? '[x] Ready for use' : '[ ] Ready for use'}
${args.status === 'needs-refinement' ? '[x] Needs refinement' : '[ ] Needs refinement'}
${args.status === 'needs-restructure' ? '[x] Needs restructure' : '[ ] Needs restructure'}
${args.status === 'needs-rescoping' ? '[x] Needs rescoping' : '[ ] Needs rescoping'}
`;
}
