'use client';

import Link from 'next/link';

interface FrameworkCardProps {
  date: string;
  name: string;
  status: string;
}

export function FrameworkCard({ date, name, status }: FrameworkCardProps) {
  const statusColor = status === 'Complete'
    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    : status === 'In Progress'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

  return (
    <Link
      href={`/runs/${date}/${name}`}
      className="block p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {date}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${statusColor}`}>
          {status}
        </span>
      </div>
    </Link>
  );
}
