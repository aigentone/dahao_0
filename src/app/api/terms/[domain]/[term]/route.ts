import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { TermDiscussion } from '@/types/github-compatible';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ domain: string; term: string }> }
) {
  try {
    const { domain, term } = await params;
    
    // Construct path to term discussion file
    const discussionPath = path.join(
      process.cwd(),
      'dahao-governance',
      domain,
      'terms',
      term,
      '.github',
      'discussion.yml'
    );

    // Check if file exists
    try {
      await fs.access(discussionPath);
    } catch (error) {
      return NextResponse.json(
        { error: `Term discussion not found: ${domain}/${term}` },
        { status: 404 }
      );
    }

    // Load and parse the YAML file
    const content = await fs.readFile(discussionPath, 'utf-8');
    const data = yaml.load(content) as { discussion: TermDiscussion };

    if (!data || !data.discussion) {
      return NextResponse.json(
        { error: 'Invalid discussion file format' },
        { status: 500 }
      );
    }

    // Return the term discussion
    return NextResponse.json(data.discussion);

  } catch (error) {
    console.error('Error loading term discussion:', error);
    return NextResponse.json(
      { error: 'Failed to load term discussion' },
      { status: 500 }
    );
  }
}