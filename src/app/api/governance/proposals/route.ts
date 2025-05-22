import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { getSession } from '@/lib/auth/session';
import matter from 'gray-matter';

const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'dahao-dao';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'dahao';
const PROPOSALS_PATH = 'governance/proposals';

async function getOctokit(request: NextRequest) {
  const session = await getSession(request);
  if (!session?.accessToken) {
    throw new Error('Unauthorized');
  }
  return new Octokit({ auth: session.accessToken });
}

// GET /api/governance/proposals - List all proposals
export async function GET(request: NextRequest) {
  try {
    const octokit = await getOctokit(request);
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: PROPOSALS_PATH,
    });

    if (Array.isArray(data)) {
      const proposals = await Promise.all(
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
              const { data: frontmatter, content: body } = matter(content);
              
              if (status && frontmatter.status !== status) {
                return null;
              }
              
              return {
                id: file.path.replace(`${PROPOSALS_PATH}/`, '').replace('.md', ''),
                title: frontmatter.title || 'Untitled',
                description: body.substring(0, 200) + '...',
                author: frontmatter.author || 'Unknown',
                status: frontmatter.status || 'draft',
                type: frontmatter.type || 'standard',
                createdAt: frontmatter.createdAt || new Date().toISOString(),
                votingEndsAt: frontmatter.votingEndsAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                votes: frontmatter.votes || { for: 0, against: 0, abstain: 0 },
                quorum: frontmatter.quorum || 10,
                threshold: frontmatter.threshold || 66,
              };
            }
          })
      );

      return NextResponse.json(proposals.filter(Boolean));
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Governance API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/governance/proposals - Create new proposal
export async function POST(request: NextRequest) {
  try {
    const octokit = await getOctokit(request);
    const session = await getSession(request);
    const body = await request.json();
    
    const {
      title,
      description,
      type = 'standard',
      votingEndsAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      quorum = 10,
      threshold = 66,
    } = body;

    const proposalId = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
    const filePath = `${PROPOSALS_PATH}/${proposalId}.md`;

    const frontmatter = {
      title,
      author: session?.user?.username || 'Unknown',
      status: 'draft',
      type,
      createdAt: new Date().toISOString(),
      votingEndsAt,
      votes: { for: 0, against: 0, abstain: 0 },
      quorum,
      threshold,
    };

    const fileContent = matter.stringify(description, frontmatter);

    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Create proposal: ${title}`,
      content: Buffer.from(fileContent).toString('base64'),
    });

    return NextResponse.json({
      id: proposalId,
      path: filePath,
      sha: data.content?.sha,
    });
  } catch (error) {
    console.error('Governance API error:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}