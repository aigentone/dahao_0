import { NextRequest, NextResponse } from 'next/server';
import { getGitHubAuthUrl, exchangeCodeForToken, getGitHubUser } from '@/lib/auth/github';

// GitHub OAuth callback handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  // Initial OAuth redirect
  if (!code) {
    const authUrl = getGitHubAuthUrl();
    return NextResponse.redirect(authUrl);
  }

  // Handle OAuth callback
  try {
    // Verify state parameter for CSRF protection
    const sessionState = request.cookies.get('oauth_state')?.value;
    if (state !== sessionState) {
      return NextResponse.json(
        { error: 'Invalid state parameter' },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code);
    
    if (!tokenData.access_token) {
      throw new Error('No access token received');
    }

    // Get user information from GitHub
    const user = await getGitHubUser(tokenData.access_token);

    // Create user session
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Set secure HTTP-only cookie with user session
    response.cookies.set('session', JSON.stringify({
      user: {
        id: user.id.toString(),
        username: user.login,
        email: user.email,
        avatarUrl: user.avatar_url,
        githubId: user.id.toString(),
      },
      accessToken: tokenData.access_token,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Clear OAuth state cookie
    response.cookies.delete('oauth_state');

    return response;
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}