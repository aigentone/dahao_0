// src/app/api/public/documents/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Public API for listing documents without authentication
 * This handles the base /api/public/documents endpoint
 */

const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'aigentone';
const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO || 'dahao_0';
const BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main';
const DOCUMENTS_PATH = process.env.NEXT_PUBLIC_DOCUMENTS_PATH || 'dahao-template';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DOCUMENTS_PATH}?ref=${BRANCH}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DAHAO-Public-Viewer'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }

    const files = await response.json();
    
    // Filter and format the response
    const documents = files
      .filter((file: any) => file.type === 'file' && file.name.endsWith('.md'))
      .map((file: any) => ({
        id: file.name.replace('.md', ''),
        title: file.name.replace('.md', '').replace(/-/g, ' '),
        path: file.path,
        type: 'document'
      }));

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Public API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}