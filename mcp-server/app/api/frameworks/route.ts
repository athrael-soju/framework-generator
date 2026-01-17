import { NextResponse } from 'next/server';
import { loadAllCommands } from '@/lib/commands/loader';
import { initializeRun } from '@/lib/state/run-manager';

// GET /api/frameworks - List available framework commands
export async function GET() {
  try {
    const commands = await loadAllCommands();

    const frameworks = Array.from(commands.entries()).map(([name, command]) => ({
      name,
      title: command.title,
      description: command.frontmatter.description,
      argumentHint: command.frontmatter['argument-hint'],
    }));

    return NextResponse.json({
      count: frameworks.length,
      frameworks,
    });
  } catch (error) {
    console.error('Error listing frameworks:', error);
    return NextResponse.json(
      { error: 'Failed to list frameworks' },
      { status: 500 }
    );
  }
}

// POST /api/frameworks - Create a new framework run
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { error: 'Framework name is required' },
        { status: 400 }
      );
    }

    const { runLog, path, date, name } = await initializeRun(body.name);

    return NextResponse.json({
      success: true,
      date,
      name,
      path,
      status: runLog.status,
      message: `Framework run created at ${date}/${name}`,
    });
  } catch (error) {
    console.error('Error creating framework:', error);
    return NextResponse.json(
      { error: 'Failed to create framework run' },
      { status: 500 }
    );
  }
}
