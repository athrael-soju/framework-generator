import { NextResponse } from 'next/server';
import { parseRunLog, getCurrentStage, getLastCompletedStage } from '@/lib/state/run-manager';
import { loadCommand } from '@/lib/commands/loader';
import { paths } from '@/lib/utils/paths';
import fs from 'fs/promises';
import path from 'path';

interface RouteContext {
  params: Promise<{ date: string; name: string }>;
}

// GET /api/runs/[date]/[name] - Get run details
export async function GET(request: Request, context: RouteContext) {
  try {
    const { date, name } = await context.params;

    const runLog = await parseRunLog(date, name);
    if (!runLog) {
      return NextResponse.json(
        { error: 'Run not found' },
        { status: 404 }
      );
    }

    const currentStage = getCurrentStage(runLog);
    const lastCompleted = getLastCompletedStage(runLog);

    // Get files for each completed stage
    const artifacts: Record<string, string[]> = {};
    const runDir = paths.runDir(date, name);

    try {
      const dirs = await fs.readdir(runDir);
      for (const dir of dirs) {
        const dirPath = path.join(runDir, dir);
        const stats = await fs.stat(dirPath);
        if (stats.isDirectory() && /^\d+-/.test(dir)) {
          const files = await fs.readdir(dirPath);
          artifacts[dir] = files.filter(f => f.endsWith('.md'));
        }
      }
    } catch {
      // No stage directories yet
    }

    // Get command info for current stage
    let nextStageCommand = null;
    if (currentStage) {
      const command = await loadCommand(currentStage);
      if (command) {
        nextStageCommand = {
          name: command.name,
          description: command.frontmatter.description,
          inputs: command.inputs,
          qualityCriteria: command.qualityCriteria,
        };
      }
    }

    return NextResponse.json({
      name: runLog.name,
      date,
      status: runLog.status,
      started: runLog.started,
      currentStage,
      lastCompletedStage: lastCompleted,
      progress: runLog.progress,
      log: runLog.log,
      artifacts,
      nextStageCommand,
    });
  } catch (error) {
    console.error('Error getting run details:', error);
    return NextResponse.json(
      { error: 'Failed to get run details' },
      { status: 500 }
    );
  }
}
