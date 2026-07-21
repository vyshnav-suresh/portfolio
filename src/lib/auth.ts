import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// Returns a 401 response if the request has no valid admin session, else null.
export async function requireAuth(request: Request) {
  const token = await getToken({
    req: request as never,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
