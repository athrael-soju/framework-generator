import path from 'path';

// Base paths relative to the mcp-server directory
const MCP_SERVER_DIR = process.cwd();
const PARENT_DIR = path.dirname(MCP_SERVER_DIR);

export const paths = {
  // Parent Framework-Generator paths
  commandsDir: path.join(PARENT_DIR, 'commands'),
  outputDir: path.join(PARENT_DIR, 'output'),
  claudeMd: path.join(PARENT_DIR, 'CLAUDE.md'),

  // Get the command file path for a stage
  commandFile: (stage: string): string => {
    return path.join(PARENT_DIR, 'commands', `${stage}.md`);
  },

  // Get run directory path
  runDir: (date: string, name: string): string => {
    return path.join(PARENT_DIR, 'output', date, name);
  },

  // Get run.md path
  runLog: (date: string, name: string): string => {
    return path.join(PARENT_DIR, 'output', date, name, 'run.md');
  },

  // Get stage output directory
  stageDir: (date: string, name: string, stageNum: number, stageName: string): string => {
    return path.join(PARENT_DIR, 'output', date, name, `${stageNum}-${stageName}`);
  },

  // Get path for specific stage output file
  stageFile: (date: string, name: string, stageNum: number, stageName: string, fileName: string): string => {
    return path.join(PARENT_DIR, 'output', date, name, `${stageNum}-${stageName}`, fileName);
  },

  // Get generate output directory
  generateDir: (date: string, name: string): string => {
    return path.join(PARENT_DIR, 'output', date, name, '4-generate');
  },
};

// Stage number mapping
export const stageNumbers: Record<string, number> = {
  frame: 1,
  organize: 2,
  refine: 3,
  generate: 4,
  evaluate: 5,
};

// Stage name mapping (for display)
export const stageNames: Record<string, string> = {
  frame: 'Frame',
  organize: 'Organize',
  refine: 'Refine',
  generate: 'Generate',
  evaluate: 'Evaluate',
};

// Get today's date in YYYY-MM-DD format
export function getTodayDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Convert name to kebab-case
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate unique run directory (add suffix if exists)
export async function getUniqueRunDir(name: string, date?: string): Promise<{ date: string; name: string; path: string }> {
  const fs = await import('fs/promises');
  const targetDate = date || getTodayDate();
  const kebabName = toKebabCase(name);

  let finalName = kebabName;
  let suffix = 1;
  let runPath = paths.runDir(targetDate, finalName);

  try {
    while (await fs.stat(runPath).then(() => true).catch(() => false)) {
      suffix++;
      finalName = `${kebabName}-${suffix.toString().padStart(2, '0')}`;
      runPath = paths.runDir(targetDate, finalName);
    }
  } catch {
    // Directory doesn't exist, use original name
  }

  return { date: targetDate, name: finalName, path: runPath };
}
