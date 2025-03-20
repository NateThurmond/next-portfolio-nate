import { NextResponse } from 'next/server';
import { fetchGitHubProjects } from '../../../lib/fetchGitHubProjects';

export async function GET() {
  try {
    const projects = await fetchGitHubProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects.' }, { status: 500 });
  }
}