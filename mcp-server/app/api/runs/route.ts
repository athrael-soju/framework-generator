import { NextResponse } from 'next/server';
import { listRuns } from '@/lib/state/run-manager';

// GET /api/runs - List all framework runs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') as 'all' | 'in-progress' | 'complete' | null;

    let runs = await listRuns();

    // Apply filter
    if (filter === 'in-progress') {
      runs = runs.filter(r => r.status === 'In Progress');
    } else if (filter === 'complete') {
      runs = runs.filter(r => r.status === 'Complete');
    }

    // Sort by date descending
    runs.sort((a, b) => b.date.localeCompare(a.date));

    return NextResponse.json({
      count: runs.length,
      runs,
    });
  } catch (error) {
    console.error('Error listing runs:', error);
    return NextResponse.json(
      { error: 'Failed to list runs' },
      { status: 500 }
    );
  }
}
