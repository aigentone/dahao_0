import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issueNumber = parseInt(params.id);
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'get-proposal-discussion',
        issueNumber
      })
    });
    
    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposal' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issueNumber = parseInt(params.id);
    const { status } = await request.json();
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update-proposal-status',
        issueNumber,
        status
      })
    });
    
    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update proposal status' },
      { status: 500 }
    );
  }
}