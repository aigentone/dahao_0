// src/app/api/public/documents/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

/**
 * Public API for reading documents without authentication
 * This is separate from /api/documents which requires auth
 * 
 * Directory structure options:
 * - If your repo has /documents folder: set NEXT_PUBLIC_DOCUMENTS_PATH=documents
 * - If your repo has /dahao-template folder: set NEXT_PUBLIC_DOCUMENTS_PATH=dahao-template
 * - If your repo has /constitution/sections: set NEXT_PUBLIC_DOCUMENTS_PATH=constitution/sections
 */

// This uses the public GitHub API without authentication
const REPO_OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || 'aigentone'; // Your GitHub username
const REPO_NAME = process.env.NEXT_PUBLIC_GITHUB_REPO || 'dahao_0';    // Your repo name
const BRANCH = process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main';

// You can change this to match where your documents are stored
// Options: 'documents', 'dahao-template', 'constitution/sections', etc.
const DOCUMENTS_PATH = process.env.NEXT_PUBLIC_DOCUMENTS_PATH || 'dahao-template';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const pathSegments = params.path || [];
    
    // Get specific document
    const documentPath = pathSegments.join('/');
    const fullPath = `${DOCUMENTS_PATH}/${documentPath}`;
    
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${fullPath}?ref=${BRANCH}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DAHAO-Public-Viewer'
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const data = await response.json();
    
    if (data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      
      return NextResponse.json({
        id: documentPath,
        title: documentPath.replace(/-/g, ' '),
        content: content,
        path: data.path,
        lastModified: new Date().toISOString(),
        author: 'DAHAO Community',
        tags: [],
        type: 'document'
      });
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('Public API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}