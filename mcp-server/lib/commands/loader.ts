import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { paths } from '../utils/paths';
import type { CommandDefinition, CommandFrontmatter, CommandInput, CommandOutput } from '../types';

// Parse inputs table from command markdown
function parseInputsTable(content: string): CommandInput[] {
  const inputs: CommandInput[] = [];
  const inputsMatch = content.match(/## Inputs\n\n\| Input \| Source \|\n\|[-|\s]+\|\n([\s\S]*?)(?=\n##|\n###|$)/);

  if (inputsMatch) {
    const rows = inputsMatch[1].trim().split('\n');
    for (const row of rows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 2) {
        inputs.push({
          name: cells[0],
          source: cells[1],
        });
      }
    }
  }

  return inputs;
}

// Parse outputs table from command markdown
function parseOutputsTable(content: string): CommandOutput[] {
  const outputs: CommandOutput[] = [];
  const outputsMatch = content.match(/## Output\n\n\| File \| Content \|\n\|[-|\s]+\|\n([\s\S]*?)(?=\n##|\n###|$)/);

  if (outputsMatch) {
    const rows = outputsMatch[1].trim().split('\n');
    for (const row of rows) {
      const cells = row.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 2) {
        outputs.push({
          file: cells[0].replace(/`/g, ''),
          content: cells[1],
        });
      }
    }
  }

  return outputs;
}

// Parse quality criteria from command markdown
function parseQualityCriteria(content: string): string[] {
  const criteria: string[] = [];
  const criteriaMatch = content.match(/## Quality Criteria\n\n([\s\S]*?)(?=\n##|$)/);

  if (criteriaMatch) {
    const lines = criteriaMatch[1].trim().split('\n');
    for (const line of lines) {
      const match = line.match(/^- \[ \] (.+)$/);
      if (match) {
        criteria.push(match[1]);
      }
    }
  }

  return criteria;
}

// Extract section content
function extractSection(content: string, sectionName: string): string {
  const regex = new RegExp(`## ${sectionName}\\n\\n([\\s\\S]*?)(?=\\n## |$)`);
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

// Load a single command file
export async function loadCommand(stageName: string): Promise<CommandDefinition | null> {
  const filePath = paths.commandFile(stageName);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontmatter = data as CommandFrontmatter;

    // Extract title (first H1)
    const titleMatch = content.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : stageName;

    // Extract description (paragraph after title)
    const descMatch = content.match(/^# .+\n\n(.+?)(?=\n\n|$)/m);
    const description = descMatch ? descMatch[1] : '';

    return {
      name: stageName,
      frontmatter,
      title,
      description,
      inputs: parseInputsTable(content),
      inputFormat: extractSection(content, 'Input Format') || extractSection(content, 'Inputs'),
      process: extractSection(content, 'Process'),
      outputs: parseOutputsTable(content),
      qualityCriteria: parseQualityCriteria(content),
      completion: extractSection(content, 'Completion'),
      rawContent: content,
    };
  } catch (error) {
    console.error(`Failed to load command ${stageName}:`, error);
    return null;
  }
}

// Load all command files
export async function loadAllCommands(): Promise<Map<string, CommandDefinition>> {
  const commands = new Map<string, CommandDefinition>();
  const stages = ['frame', 'organize', 'refine', 'generate', 'evaluate'];

  for (const stage of stages) {
    const command = await loadCommand(stage);
    if (command) {
      commands.set(stage, command);
    }
  }

  return commands;
}

// Get available stages
export function getStages(): string[] {
  return ['frame', 'organize', 'refine', 'generate', 'evaluate'];
}

// Get next stage
export function getNextStage(currentStage: string): string | null {
  const stages = getStages();
  const currentIndex = stages.indexOf(currentStage);

  if (currentIndex === -1 || currentIndex === stages.length - 1) {
    return null;
  }

  return stages[currentIndex + 1];
}

// Get previous stage
export function getPreviousStage(currentStage: string): string | null {
  const stages = getStages();
  const currentIndex = stages.indexOf(currentStage);

  if (currentIndex <= 0) {
    return null;
  }

  return stages[currentIndex - 1];
}

// Check if commands directory exists
export async function commandsExist(): Promise<boolean> {
  try {
    const stats = await fs.stat(paths.commandsDir);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

// List all command files
export async function listCommandFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(paths.commandsDir);
    return files.filter(f => f.endsWith('.md')).map(f => path.basename(f, '.md'));
  } catch {
    return [];
  }
}
