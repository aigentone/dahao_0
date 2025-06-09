import { NextResponse } from 'next/server';
// TODO: Uncomment when database is set up
// import { db } from '@/lib/db';
// import { proposals, votes, comments } from '@/lib/db/schema';
// import { eq, desc } from 'drizzle-orm';
// import { validateSession } from '@/lib/auth/session';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement database functionality
  return NextResponse.json(
    { error: 'Proposal system not yet implemented' },
    { status: 501 }
  );

  /* TODO: Uncomment when database is set up
  try {
    const proposalId = parseInt(params.id);
    if (isNaN(proposalId)) {
      return NextResponse.json(
        { error: 'Invalid proposal ID' },
        { status: 400 }
      );
    }

    // Get proposal with author info
    const proposal = await db
      .select({
        id: proposals.id,
        title: proposals.title,
        description: proposals.description,
        category: proposals.category,
        status: proposals.status,
        votesFor: proposals.votesFor,
        votesAgainst: proposals.votesAgainst,
        votesAbstain: proposals.votesAbstain,
        createdAt: proposals.createdAt,
        updatedAt: proposals.updatedAt,
        authorId: proposals.authorId,
      })
      .from(proposals)
      .where(eq(proposals.id, proposalId))
      .limit(1);

    if (proposal.length === 0) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Get votes for this proposal
    const proposalVotes = await db
      .select({
        userId: votes.userId,
        vote: votes.vote,
        createdAt: votes.createdAt,
      })
      .from(votes)
      .where(eq(votes.proposalId, proposalId));

    // Get comments for this proposal
    const proposalComments = await db
      .select({
        id: comments.id,
        content: comments.content,
        authorId: comments.authorId,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .where(eq(comments.proposalId, proposalId))
      .orderBy(desc(comments.createdAt));

    return NextResponse.json({
      proposal: proposal[0],
      votes: proposalVotes,
      comments: proposalComments,
    });
  } catch (error) {
    console.error('Failed to fetch proposal:', error);
    return NextResponse.json(
      { error: 'Failed to fetch proposal' },
      { status: 500 }
    );
  }
  */
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement database functionality
  return NextResponse.json(
    { error: 'Proposal system not yet implemented' },
    { status: 501 }
  );

  /* TODO: Uncomment when database is set up
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = parseInt(params.id);
    if (isNaN(proposalId)) {
      return NextResponse.json(
        { error: 'Invalid proposal ID' },
        { status: 400 }
      );
    }

    const { title, description, category } = await request.json();

    // Check if user is the author
    const proposal = await db
      .select({ authorId: proposals.authorId })
      .from(proposals)
      .where(eq(proposals.id, proposalId))
      .limit(1);

    if (proposal.length === 0) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    if (proposal[0].authorId !== session.userId) {
      return NextResponse.json(
        { error: 'You can only edit your own proposals' },
        { status: 403 }
      );
    }

    // Update proposal
    const updated = await db
      .update(proposals)
      .set({
        title,
        description,
        category,
        updatedAt: new Date(),
      })
      .where(eq(proposals.id, proposalId))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Failed to update proposal:', error);
    return NextResponse.json(
      { error: 'Failed to update proposal' },
      { status: 500 }
    );
  }
  */
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // TODO: Implement database functionality
  return NextResponse.json(
    { error: 'Proposal system not yet implemented' },
    { status: 501 }
  );

  /* TODO: Uncomment when database is set up
  try {
    const session = await validateSession(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const proposalId = parseInt(params.id);
    if (isNaN(proposalId)) {
      return NextResponse.json(
        { error: 'Invalid proposal ID' },
        { status: 400 }
      );
    }

    // Check if user is the author
    const proposal = await db
      .select({ authorId: proposals.authorId })
      .from(proposals)
      .where(eq(proposals.id, proposalId))
      .limit(1);

    if (proposal.length === 0) {
      return NextResponse.json(
        { error: 'Proposal not found' },
        { status: 404 }
      );
    }

    if (proposal[0].authorId !== session.userId) {
      return NextResponse.json(
        { error: 'You can only delete your own proposals' },
        { status: 403 }
      );
    }

    // Delete proposal (cascades to votes and comments)
    await db.delete(proposals).where(eq(proposals.id, proposalId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete proposal:', error);
    return NextResponse.json(
      { error: 'Failed to delete proposal' },
      { status: 500 }
    );
  }
  */
}