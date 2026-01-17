'use client';

interface StageProgress {
  stage: string;
  status: 'Pending' | 'Complete';
  completed?: string;
}

interface RunProgressProps {
  progress: StageProgress[];
  currentStage?: string | null;
}

export function RunProgress({ progress, currentStage }: RunProgressProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Progress</h3>
      <div className="flex gap-2">
        {progress.map((stage) => {
          const isCurrent = currentStage?.toLowerCase() === stage.stage.toLowerCase();
          const isComplete = stage.status === 'Complete';

          return (
            <div
              key={stage.stage}
              className="flex-1"
            >
              <div
                className={`h-2 rounded-full ${
                  isComplete
                    ? 'bg-green-500'
                    : isCurrent
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-zinc-200 dark:bg-zinc-700'
                }`}
              />
              <p className={`text-xs mt-1 text-center ${
                isCurrent
                  ? 'font-medium text-blue-600 dark:text-blue-400'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}>
                {stage.stage}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
