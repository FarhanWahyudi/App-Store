import withauth from '@/middlewares/withAuth';
import { NextResponse } from 'next/server';

export function mainMiddleware() {
  const res = NextResponse.next();
  return res;
}

export default withauth(mainMiddleware, ['admin', 'user']);
