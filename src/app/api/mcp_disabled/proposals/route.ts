import { NextRequest, NextResponse } from 'next/server';
import { mcpClient } from '@/lib/mcp-client';

export async function GET() {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mcp?action=active-proposals`);
    const data = await result.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create-proposal',
        ...body
      })
    });
    
    const data = await result.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create proposal' },
      { status: 500 }
    );
  }
}