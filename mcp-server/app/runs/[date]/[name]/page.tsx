import Link from 'next/link';
import { parseRunLog, getCurrentStage } from '@/lib/state/run-manager';
import { loadCommand } from '@/lib/commands/loader';
import { paths } from '@/lib/utils/paths';
import { RunProgress } from '@/components/RunProgress';
import { MarkdownPreview } from '@/components/MarkdownPreview';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ date: string; name: string }>;
}

export default async function RunDetailPage({ params }: PageProps) {
  const { date, name } = await params;

  const runLog = await parseRunLog(date, name);
  if (!runLog) {
    notFound();
  }

  const currentStage = getCurrentStage(runLog);

  // Get artifacts
  const artifacts: Record<string, { name: string; content: string }[]> = {};
  const runDir = paths.runDir(date, name);

  try {
    const dirs = await fs.readdir(runDir);
    for (const dir of dirs) {
      const dirPath = path.join(runDir, dir);
      const stats = await fs.stat(dirPath);
      if (stats.isDirectory() && /^\d+-/.test(dir)) {
        const files = await fs.readdir(dirPath);
        const mdFiles = files.filter(f => f.endsWith('.md'));

        artifacts[dir] = [];
        for (const file of mdFiles) {
          try {
            const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
            artifacts[dir].push({ name: file, content });
          } catch {
            // Skip unreadable files
          }
        }
      }
    }
  } catch {
    // No stage directories yet
  }

  // Get next stage command info
  let nextStageCommand = null;
  if (currentStage) {
    const command = await loadCommand(currentStage);
    if (command) {
      nextStageCommand = command;
    }
  }

  const statusColor = runLog.status === 'Complete'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : runLog.status === 'In Progress'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-2 inline-block"
          >
            &larr; Back to Dashboard
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {runLog.name}
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                Started: {runLog.started}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor}`}>
              {runLog.status}
            </span>
          </div>
        </header>

        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 mb-6">
          <RunProgress progress={runLog.progress} currentStage={currentStage} />
        </div>

        {currentStage && nextStageCommand && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-6 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Next: {nextStageCommand.title}
            </h2>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              {nextStageCommand.frontmatter.description}
            </p>

            {nextStageCommand.qualityCriteria.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Quality Criteria:
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {nextStageCommand.qualityCriteria.map((criterion, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500">&#9744;</span>
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {Object.keys(artifacts).length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Artifacts
            </h2>

            <div className="space-y-4">
              {Object.entries(artifacts).map(([stage, files]) => (
                <div
                  key={stage}
                  className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-700 border-b border-zinc-200 dark:border-zinc-600">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                      {stage}
                    </h3>
                  </div>

                  <div className="p-4 space-y-4">
                    {files.map((file) => (
                      <div key={file.name}>
                        <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                          {file.name}
                        </h4>
                        <MarkdownPreview content={file.content} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Activity Log
          </h2>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            {runLog.log.length === 0 ? (
              <p className="text-zinc-500 dark:text-zinc-400">No activity yet</p>
            ) : (
              <div className="space-y-4">
                {runLog.log.map((entry, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      {entry.date}
                    </h3>
                    <ul className="space-y-1">
                      {entry.entries.map((e, j) => (
                        <li key={j} className="text-sm text-zinc-600 dark:text-zinc-400">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
