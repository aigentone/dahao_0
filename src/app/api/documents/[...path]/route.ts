import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { getSession } from '@/lib/auth/session';
import matter from 'gray-matter';

const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'dahao-dao';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'dahao';
const DOCUMENTS_PATH = 'documents';

async function getOctokit(request: NextRequest) {
  const session = await getSession(request);
  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }
  return new Octokit({ auth: session.accessToken });
}

// GET /api/documents - List all documents
// GET /api/documents/[id] - Get specific document
// GET /api/documents/search - Search documents
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const pathSegments = params.path || [];
    
    if (pathSegments[0] === 'search') {
      // Search documents
      const searchParams = request.nextUrl.searchParams;
      const query = searchParams.get('q') || '';
      
      const { data } = await octokit.search.code({
        q: `${query} repo:${REPO_OWNER}/${REPO_NAME} path:${DOCUMENTS_PATH}`,
      });

      const documents = await Promise.all(
        data.items.map(async (item) => {
          const fileData = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: item.path,
          });

          if ('content' in fileData.data) {
            const content = Buffer.from(fileData.data.content, 'base64').toString('utf-8');
            const { data: frontmatter, content: body } = matter(content);
            
            return {
              id: item.path.replace(`${DOCUMENTS_PATH}/`, '').replace('.md', ''),
              title: frontmatter.title || 'Untitled',
              content: body,
              path: item.path,
              lastModified: frontmatter.lastModified || new Date().toISOString(),
              author: frontmatter.author || 'Unknown',
              tags: frontmatter.tags || [],
              type: frontmatter.type || 'standard',
            };
          }
        })
      );

      return NextResponse.json(documents.filter(Boolean));
    } else if (pathSegments.length > 0) {
      // Get specific document
      const documentId = pathSegments.join('/');
      const filePath = `${DOCUMENTS_PATH}/${documentId}.md`;
      
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filePath,
      });

      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const { data: frontmatter, content: body } = matter(content);
        
        return NextResponse.json({
          id: documentId,
          title: frontmatter.title || 'Untitled',
          content: body,
          path: filePath,
          lastModified: frontmatter.lastModified || new Date().toISOString(),
          author: frontmatter.author || 'Unknown',
          tags: frontmatter.tags || [],
          type: frontmatter.type || 'standard',
        });
      }
    } else {
      // List all documents
      const searchParams = request.nextUrl.searchParams;
      const type = searchParams.get('type');
      
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: DOCUMENTS_PATH,
      });

      if (Array.isArray(data)) {
        const documents = await Promise.all(
          data
            .filter(file => file.type === 'file' && file.name.endsWith('.md'))
            .map(async (file) => {
              const fileData = await octokit.repos.getContent({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                path: file.path,
              });

              if ('content' in fileData.data) {
                const content = Buffer.from(fileData.data.content, 'base64').toString('utf-8');
                const { data: frontmatter } = matter(content);
                
                if (type && frontmatter.type !== type) {
                  return null;
                }
                
                return {
                  id: file.path.replace(`${DOCUMENTS_PATH}/`, '').replace('.md', ''),
                  title: frontmatter.title || 'Untitled',
                  path: file.path,
                  lastModified: frontmatter.lastModified || new Date().toISOString(),
                  author: frontmatter.author || 'Unknown',
                  tags: frontmatter.tags || [],
                  type: frontmatter.type || 'standard',
                };
              }
            })
        );

        return NextResponse.json(documents.filter(Boolean));
      }
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    console.error('Documents API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/documents - Create new document
export async function POST(request: NextRequest) {
  try {
    const octokit = await getOctokit(request);
    const session = await getSession(request);
    const body = await request.json();
    
    const { title, content, path, tags = [], type = 'standard' } = body;
    const documentPath = path || `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const filePath = `${DOCUMENTS_PATH}/${documentPath}.md`;

    const frontmatter = {
      title,
      author: session?.user?.username || 'Unknown',
      lastModified: new Date().toISOString(),
      tags,
      type,
    };

    const fileContent = matter.stringify(content, frontmatter);

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Create document: ${title}`,
      content: Buffer.from(fileContent).toString('base64'),
    });

    return NextResponse.json({
      id: documentPath,
      path: filePath,
      sha: data.content?.sha,
    });
  } catch (error) {
    console.error('Documents API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/documents/[id] - Update document
export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const documentId = params.path.join('/');
    const filePath = `${DOCUMENTS_PATH}/${documentId}.md`;
    const body = await request.json();

    // Get current file
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
    });

    if (!('sha' in currentFile)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Parse existing content
    const existingContent = Buffer.from(currentFile.content, 'base64').toString('utf-8');
    const { data: existingFrontmatter } = matter(existingContent);

    // Update frontmatter
    const updatedFrontmatter = {
      ...existingFrontmatter,
      ...body,
      lastModified: new Date().toISOString(),
    };

    const fileContent = matter.stringify(body.content || '', updatedFrontmatter);

    // Update file
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Update document: ${updatedFrontmatter.title}`,
      content: Buffer.from(fileContent).toString('base64'),
      sha: currentFile.sha,
    });

    return NextResponse.json({
      id: documentId,
      path: filePath,
      sha: data.content?.sha,
    });
  } catch (error) {
    console.error('Documents API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/documents/[id] - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const octokit = await getOctokit(request);
    const documentId = params.path.join('/');
    const filePath = `${DOCUMENTS_PATH}/${documentId}.md`;

    // Get current file
    const { data: currentFile } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
    });

    if (!('sha' in currentFile)) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      );
    }

    // Delete file
    await octokit.repos.deleteFile({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Delete document: ${documentId}`,
      sha: currentFile.sha,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Documents API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}