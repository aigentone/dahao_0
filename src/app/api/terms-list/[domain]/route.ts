import { NextRequest, NextResponse } from 'next/server';

interface TermInfo {
  name: string;
  domain: string;
  hasDiscussion: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { domain: string } }
) {
  try {
    const { domain } = await params;
    
    // Define available terms for each organization domain
    const termMap: Record<string, TermInfo[]> = {
      'core-governance': [
        { name: 'harm', domain: 'core-governance', hasDiscussion: true },
        { name: 'wellbeing', domain: 'core-governance', hasDiscussion: true },
        { name: 'transparency', domain: 'core-governance', hasDiscussion: true },
      ],
      'animal-welfare': [
        { name: 'suffering', domain: 'animal-welfare', hasDiscussion: true },
      ],
      'environment': []
    };
    
    const terms = termMap[domain] || [];
    
    return NextResponse.json(terms);
    
  } catch (error) {
    console.error('Error fetching terms list:', error);
    return NextResponse.json(
      { error: 'Failed to fetch terms list' },
      { status: 500 }
    );
  }
}