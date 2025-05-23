import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { Session, User } from './types';
import { NextRequest } from 'next/server';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function createSession(user: User, accessToken: string): Promise<string> {
  const token = await new SignJWT({ userId: user.id, accessToken })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return token;
}

export async function validateSession(request: Request): Promise<Session | null> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('session='));
  if (!sessionCookie) return null;

  const token = sessionCookie.split('=')[1];

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;
    const accessToken = payload.accessToken as string;

    // In a real app, you'd fetch the user from the database here
    // For now, we'll create a mock user
    const user: User = {
      id: userId,
      githubId: 0,
      username: 'user',
      name: null,
      email: null,
      avatarUrl: null,
      bio: null,
      location: null,
      company: null,
      blog: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!accessToken) {
      console.error('Access token not found in session payload');
      return null;
    }

    return {
      userId,
      user,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
      accessToken,
    };
  } catch (error) {
    return null;
  }
}

export async function getSession(request?: NextRequest): Promise<Session | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;
    const accessToken = payload.accessToken as string;

    // In a real app, you'd fetch the user from the database here
    const user: User = {
      id: userId,
      githubId: 0,
      username: 'user',
      name: null,
      email: null,
      avatarUrl: null,
      bio: null,
      location: null,
      company: null,
      blog: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!accessToken) {
      console.error('Access token not found in session payload');
      return null;
    }

    return {
      userId,
      user,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
      accessToken,
    };
  } catch (error) {
    return null;
  }
}

export function deleteSession() {
  cookies().delete('session');
}