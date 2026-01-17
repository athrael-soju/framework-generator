'use client';

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({ content, className = '' }: MarkdownPreviewProps) {
  // Simple markdown rendering - just display as preformatted text
  // For production, you'd want to use a proper markdown parser
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <pre className="whitespace-pre-wrap text-sm font-mono bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto">
        {content}
      </pre>
    </div>
  );
}
