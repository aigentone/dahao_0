import { NextResponse } from 'next/server';
import { GovernanceLoader } from '@/lib/governance-loader';

export async function GET() {
  try {
    // Use the new GovernanceLoader that supports rules
    const loader = GovernanceLoader.getInstance();
    const governanceData = await loader.loadGovernanceData();
    
    return NextResponse.json(governanceData);
  } catch (error) {
    console.error('Error loading governance data:', error);
    return NextResponse.json(
      { error: 'Failed to load governance data' },
      { status: 500 }
    );
  }
}

// All the individual loading functions have been replaced by GovernanceLoader