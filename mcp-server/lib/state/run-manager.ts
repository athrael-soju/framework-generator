import fs from 'fs/promises';
import path from 'path';
import { paths, stageNames, getTodayDate, getUniqueRunDir } from '../utils/paths';
import type { RunLog, StageProgress, LogEntry, StageStatus, RunStatus } from '../types';

// Parse run.md file into RunLog structure
export async function parseRunLog(date: string, name: string): Promise<RunLog | null> {
  const runLogPath = paths.runLog(date, name);

  try {
    const content = await fs.readFile(runLogPath, 'utf-8');
    return parseRunLogContent(content, name);
  } catch {
    return null;
  }
}

// Parse run.md content into RunLog structure
function parseRunLogContent(content: string, fallbackName: string): RunLog {
  // Extract framework name
  const nameMatch = content.match(/\*\*Framework:\*\* (.+)/);
  const name = nameMatch ? nameMatch[1].trim() : fallbackName;

  // Extract started date
  const startedMatch = content.match(/\*\*Started:\*\* (.+)/);
  const started = startedMatch ? startedMatch[1].trim() : getTodayDate();

  // Extract status
  const statusMatch = content.match(/\*\*Status:\*\* (.+)/);
  const status = (statusMatch ? statusMatch[1].trim() : 'In Progress') as RunStatus;

  // Parse progress table
  const progress: StageProgress[] = [];
  const progressMatch = content.match(/## Progress\n\n\| Stage \| Status \| Completed \|\n\|[-|\s]+\|\n([\s\S]*?)(?=\n##|$)/);

  if (progressMatch) {
    const rows = progressMatch[1].trim().split('\n');
    for (const row of rows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 2) {
        progress.push({
          stage: cells[0],
          status: cells[1] as StageStatus,
          completed: cells[2] || undefined,
        });
      }
    }
  }

  // Parse log entries
  const log: LogEntry[] = [];
  const logSection = content.match(/## Log\n\n([\s\S]*?)$/);

  if (logSection) {
    const logContent = logSection[1];
    const dateMatches = logContent.matchAll(/### (\d{4}-\d{2}-\d{2})\n\n([\s\S]*?)(?=\n### |\n*$)/g);

    for (const match of dateMatches) {
      const entries: string[] = [];
      const entryLines = match[2].trim().split('\n');
      for (const line of entryLines) {
        if (line.startsWith('- ')) {
          entries.push(line.substring(2));
        }
      }
      log.push({
        date: match[1],
        entries,
      });
    }
  }

  return { name, started, status, progress, log };
}

// Generate run.md content from RunLog
function generateRunLogContent(runLog: RunLog): string {
  let content = `# Framework Run: ${runLog.name.toUpperCase()}\n\n`;
  content += `**Framework:** ${runLog.name}\n`;
  content += `**Started:** ${runLog.started}\n`;
  content += `**Status:** ${runLog.status}\n\n`;

  content += `## Progress\n\n`;
  content += `| Stage | Status | Completed |\n`;
  content += `|-------|--------|----------|\n`;

  for (const stage of runLog.progress) {
    content += `| ${stage.stage} | ${stage.status} | ${stage.completed || ''} |\n`;
  }

  content += `\n## Log\n\n`;

  for (const entry of runLog.log) {
    content += `### ${entry.date}\n\n`;
    for (const e of entry.entries) {
      content += `- ${e}\n`;
    }
    content += '\n';
  }

  return content;
}

// Initialize a new run
export async function initializeRun(frameworkName: string): Promise<{ runLog: RunLog; path: string; date: string; name: string }> {
  const { date, name, path: runPath } = await getUniqueRunDir(frameworkName);

  // Create run directory
  await fs.mkdir(runPath, { recursive: true });

  const runLog: RunLog = {
    name: frameworkName,
    started: date,
    status: 'In Progress',
    progress: [
      { stage: 'Frame', status: 'Pending' },
      { stage: 'Organize', status: 'Pending' },
      { stage: 'Refine', status: 'Pending' },
      { stage: 'Generate', status: 'Pending' },
      { stage: 'Evaluate', status: 'Pending' },
    ],
    log: [
      {
        date,
        entries: [`**Frame started** - Initializing framework: ${frameworkName}`],
      },
    ],
  };

  // Write run.md
  const runLogPath = paths.runLog(date, name);
  await fs.writeFile(runLogPath, generateRunLogContent(runLog));

  return { runLog, path: runPath, date, name };
}

// Update run log with stage completion
export async function updateStageComplete(
  date: string,
  name: string,
  stageName: string,
  logMessage: string
): Promise<RunLog | null> {
  const runLog = await parseRunLog(date, name);
  if (!runLog) return null;

  const today = getTodayDate();
  const displayName = stageNames[stageName.toLowerCase()] || stageName;

  // Update stage status
  const stageIndex = runLog.progress.findIndex(
    p => p.stage.toLowerCase() === stageName.toLowerCase()
  );
  if (stageIndex !== -1) {
    runLog.progress[stageIndex].status = 'Complete';
    runLog.progress[stageIndex].completed = today;
  }

  // Add log entry
  const todayLog = runLog.log.find(l => l.date === today);
  if (todayLog) {
    todayLog.entries.push(`**${displayName} approved** - ${logMessage}`);
  } else {
    runLog.log.push({
      date: today,
      entries: [`**${displayName} approved** - ${logMessage}`],
    });
  }

  // Write updated run.md
  const runLogPath = paths.runLog(date, name);
  await fs.writeFile(runLogPath, generateRunLogContent(runLog));

  return runLog;
}

// Add log entry without stage completion
export async function addLogEntry(
  date: string,
  name: string,
  message: string
): Promise<RunLog | null> {
  const runLog = await parseRunLog(date, name);
  if (!runLog) return null;

  const today = getTodayDate();

  const todayLog = runLog.log.find(l => l.date === today);
  if (todayLog) {
    todayLog.entries.push(message);
  } else {
    runLog.log.push({
      date: today,
      entries: [message],
    });
  }

  const runLogPath = paths.runLog(date, name);
  await fs.writeFile(runLogPath, generateRunLogContent(runLog));

  return runLog;
}

// Set run status
export async function setRunStatus(
  date: string,
  name: string,
  status: RunStatus
): Promise<RunLog | null> {
  const runLog = await parseRunLog(date, name);
  if (!runLog) return null;

  runLog.status = status;

  const runLogPath = paths.runLog(date, name);
  await fs.writeFile(runLogPath, generateRunLogContent(runLog));

  return runLog;
}

// Get current stage (first pending stage)
export function getCurrentStage(runLog: RunLog): string | null {
  const pending = runLog.progress.find(p => p.status === 'Pending');
  return pending ? pending.stage.toLowerCase() : null;
}

// Get last completed stage
export function getLastCompletedStage(runLog: RunLog): string | null {
  const completed = runLog.progress.filter(p => p.status === 'Complete');
  if (completed.length === 0) return null;
  return completed[completed.length - 1].stage.toLowerCase();
}

// List all runs
export async function listRuns(): Promise<{ date: string; name: string; status: RunStatus }[]> {
  const runs: { date: string; name: string; status: RunStatus }[] = [];

  try {
    const outputDir = paths.outputDir;
    const dates = await fs.readdir(outputDir);

    for (const date of dates) {
      // Check if it's a date directory (YYYY-MM-DD format)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;

      const datePath = path.join(outputDir, date);
      const stats = await fs.stat(datePath);
      if (!stats.isDirectory()) continue;

      const frameworks = await fs.readdir(datePath);
      for (const framework of frameworks) {
        const runLog = await parseRunLog(date, framework);
        if (runLog) {
          runs.push({
            date,
            name: framework,
            status: runLog.status,
          });
        }
      }
    }
  } catch {
    // Output directory doesn't exist yet
  }

  return runs;
}

// Check if a run exists
export async function runExists(date: string, name: string): Promise<boolean> {
  try {
    const runLogPath = paths.runLog(date, name);
    await fs.stat(runLogPath);
    return true;
  } catch {
    return false;
  }
}

// Create stage directory
export async function createStageDir(
  date: string,
  name: string,
  stageNum: number,
  stageName: string
): Promise<string> {
  const stageDir = paths.stageDir(date, name, stageNum, stageName);
  await fs.mkdir(stageDir, { recursive: true });
  return stageDir;
}

// Write stage output file
export async function writeStageFile(
  date: string,
  name: string,
  stageNum: number,
  stageName: string,
  fileName: string,
  content: string
): Promise<string> {
  const filePath = paths.stageFile(date, name, stageNum, stageName, fileName);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
  return filePath;
}

// Read stage output file
export async function readStageFile(
  date: string,
  name: string,
  stageNum: number,
  stageName: string,
  fileName: string
): Promise<string | null> {
  try {
    const filePath = paths.stageFile(date, name, stageNum, stageName, fileName);
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}
