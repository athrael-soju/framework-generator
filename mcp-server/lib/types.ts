// Framework Generator MCP Server Types

export type StageStatus = 'Pending' | 'Complete';
export type RunStatus = 'In Progress' | 'Complete' | `Return to ${string}`;
export type FrameworkType = 'Foundation' | 'Pipeline' | 'Cyclical' | 'Hub';

export interface StageProgress {
  stage: string;
  status: StageStatus;
  completed?: string; // date string
}

export interface RunLog {
  name: string;
  started: string;
  status: RunStatus;
  progress: StageProgress[];
  log: LogEntry[];
}

export interface LogEntry {
  date: string;
  entries: string[];
}

export interface CommandFrontmatter {
  description: string;
  'argument-hint': string;
}

export interface CommandInput {
  name: string;
  source: string;
}

export interface CommandOutput {
  file: string;
  content: string;
}

export interface CommandDefinition {
  name: string;
  frontmatter: CommandFrontmatter;
  title: string;
  description: string;
  inputs: CommandInput[];
  inputFormat: string;
  process: string;
  outputs: CommandOutput[];
  qualityCriteria: string[];
  completion: string;
  rawContent: string;
}

export interface FrameworkRun {
  date: string;
  name: string;
  path: string;
  runLog: RunLog;
}

export interface StageExecutionResult {
  success: boolean;
  stage: string;
  outputs: {
    file: string;
    content: string;
  }[];
  approval: {
    required: boolean;
    nextStage: string | null;
    qualityCriteria: string[];
  };
  error?: string;
}

export interface FrameworkCharter {
  name: string;
  acronym?: string;
  problem: string;
  purpose: string;
  scope: {
    in: string[];
    out: string[];
  };
  triggers: string[];
  type: FrameworkType;
  dependencies: {
    requires: string;
    from: string;
    why: string;
  }[];
}

export interface StageMapEntry {
  name: string;
  purpose: string;
  inputs: string;
  outputs: string;
}

export interface FeedbackLoop {
  from: string;
  condition: string;
  to: string;
}

export interface TerminalState {
  name: string;
  definition: string;
  actions: string;
}

export interface StageMap {
  stages: StageMapEntry[];
  flowDiagram: string;
  dependencies: {
    needs: string;
    from: string;
    atStage: string;
  }[];
  feedbackLoops: FeedbackLoop[];
  terminalStates: TerminalState[];
}

export interface StageSpecification {
  stageName: string;
  purpose: string;
  activities: {
    activity: string;
    inputs: string;
    outputs: string;
  }[];
  contextTables: Record<string, unknown[]>;
  outputFormat: string;
  qualityCriteria: string[];
  completion: string;
}

// MCP Tool Input Schemas
export interface FrameInput {
  frameworkName: string;
  problemDescription: string;
  context: {
    domain: string;
    constraints: string[];
    intendedUsers: string[];
  };
  referenceFrameworks?: {
    name: string;
    path: string;
  }[];
}

export interface OrganizeInput {
  frameworkName: string;
  date: string;
}

export interface RefineInput {
  frameworkName: string;
  date: string;
}

export interface GenerateInput {
  frameworkName: string;
  date: string;
}

export interface EvaluateInput {
  frameworkName: string;
  date: string;
  dryRunStage?: string;
}

export interface StatusInput {
  frameworkName: string;
  date: string;
}

export interface ListInput {
  filter?: 'all' | 'in-progress' | 'complete';
}

export interface ResumeInput {
  frameworkName: string;
  date: string;
}
