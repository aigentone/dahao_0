import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { getSession } from '@/lib/auth/session';

const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'dahao-dao';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'dahao';

async function getOctokit(request: NextRequest) {
  const session = await getSession(request);
  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }
  return new Octokit({ auth: session.accessToken });
}

// GET /api/git/files - List files in repository
// GET /api/git/files/[path] - Get file content
// GET /api/git/commits - Get commit history
// GET /api/git/branches - List branches
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const pathSegments = params.path || [];
    const endpoint = pathSegments[0];

    switch (endpoint) {
      case 'files': {
        const filePath = pathSegments.slice(1).join('/');
        
        if (filePath) {
          // Get specific file content
          const { data } = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
          });

          if ('content' in data) {
            return NextResponse.json({
              path: data.path,
              content: Buffer.from(data.content, 'base64').toString('utf-8'),
              sha: data.sha,
              type: data.type,
            });
          }
        } else {
          // List files in root or specified directory
          const searchParams = request.nextUrl.searchParams;
          const path = searchParams.get('path') || '';
          
          const { data } = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path,
          });

          if (Array.isArray(data)) {
            return NextResponse.json(data.map(file => ({
              path: file.path,
              type: file.type,
              sha: file.sha,
            })));
          }
        }
        break;
      }

      case 'commits': {
        const { data } = await octokit.repos.listCommits({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          per_page: 50,
        });

        return NextResponse.json(data.map(commit => ({
          sha: commit.sha,
          author: commit.commit.author?.name || 'Unknown',
          message: commit.commit.message,
          date: commit.commit.author?.date || new Date().toISOString(),
        })));
      }

      case 'branches': {
        const { data } = await octokit.repos.listBranches({
          owner: REPO_OWNER,
          repo: REPO_NAME,
        });

        return NextResponse.json(data.map(branch => ({
          name: branch.name,
          protected: branch.protected,
        })));
      }

      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        );
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('Git API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/git/files - Create new file
// POST /api/git/branches - Create new branch
// POST /api/git/pull-requests - Create pull request
export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const pathSegments = params.path || [];
    const endpoint = pathSegments[0];
    const body = await request.json();

    switch (endpoint) {
      case 'files': {
        const { path, content, message } = body;
        
        const { data } = await octokit.repos.createOrUpdateFileContents({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path,
          message,
          content: Buffer.from(content).toString('base64'),
        });

        return NextResponse.json({
          path: data.content?.path,
          sha: data.content?.sha,
        });
      }

      case 'branches': {
        const { branchName } = body;
        
        // Get the SHA of the main branch
        const { data: mainBranch } = await octokit.repos.getBranch({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          branch: 'main',
        });

        // Create new branch
        const { data } = await octokit.git.createRef({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          ref: `refs/heads/${branchName}`,
          sha: mainBranch.commit.sha,
        });

        return NextResponse.json({
          name: branchName,
          sha: data.object.sha,
        });
      }

      case 'pull-requests': {
        const { title, body: description, base = 'main', head } = body;
        
        const { data } = await octokit.pulls.create({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          title,
          body: description,
          base,
          head,
        });

        return NextResponse.json({
          number: data.number,
          url: data.html_url,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Git API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/git/files - Update existing file
export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const body = await request.json();
    const { path, content, message } = body;

    // Get current file to get its SHA
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
    });

    if (!('sha' in currentFile)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Update file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha: currentFile.sha,
    });

    return NextResponse.json({
      path: data.content?.path,
      sha: data.content?.sha,
    });
  } catch (error) {
    console.error('Git API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/git/files - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const body = await request.json();
    const { path, message } = body;

    // Get current file to get its SHA
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
    });

    if (!('sha' in currentFile)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Delete file
    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      sha: currentFile.sha,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Git API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}