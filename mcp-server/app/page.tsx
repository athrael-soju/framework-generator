import Link from 'next/link';
import { FrameworkCard } from '@/components/FrameworkCard';
import { listRuns } from '@/lib/state/run-manager';
import { loadAllCommands } from '@/lib/commands/loader';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const runs = await listRuns();
  const commands = await loadAllCommands();

  // Sort runs by date descending
  runs.sort((a, b) => b.date.localeCompare(a.date));

  const inProgress = runs.filter(r => r.status === 'In Progress');
  const complete = runs.filter(r => r.status === 'Complete');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Framework Generator
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Create structured, repeatable frameworks
          </p>
        </header>

        <div className="mb-8">
          <Link
            href="/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Framework
          </Link>
        </div>

        {runs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <p className="text-zinc-500 dark:text-zinc-400">
              No framework runs yet. Create your first framework to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {inProgress.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  In Progress ({inProgress.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {inProgress.map((run) => (
                    <FrameworkCard
                      key={`${run.date}-${run.name}`}
                      date={run.date}
                      name={run.name}
                      status={run.status}
                    />
                  ))}
                </div>
              </section>
            )}

            {complete.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Complete ({complete.length})
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {complete.map((run) => (
                    <FrameworkCard
                      key={`${run.date}-${run.name}`}
                      date={run.date}
                      name={run.name}
                      status={run.status}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        <section className="mt-12">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Available Stages
          </h2>
          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-700">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-zinc-500 dark:text-zinc-300">Stage</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-zinc-500 dark:text-zinc-300">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {Array.from(commands.entries()).map(([name, command]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100 capitalize">
                      {name}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {command.frontmatter.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
