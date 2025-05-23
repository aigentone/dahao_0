// src/app/api/auth/check-config/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const configured = !!(
    process.env.GITHUB_CLIENT_ID && 
    process.env.GITHUB_CLIENT_SECRET
  );

  return NextResponse.json({ 
    configured,
    message: configured 
      ? 'GitHub OAuth is configured' 
      : 'GitHub OAuth credentials are not set in environment variables'
  });
}