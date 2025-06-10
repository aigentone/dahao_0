import { NextResponse } from 'next/server';
import { governanceLoader } from '@/lib/governance-loader';

export async function GET() {
  try {
    const data = await governanceLoader.loadGovernanceData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading governance data:', error);
    return NextResponse.json(
      { error: 'Failed to load governance data' },
      { status: 500 }
    );
  }
}