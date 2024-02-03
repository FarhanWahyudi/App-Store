import { signUp } from '@/services/auth/route';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const res = await signUp(data);
  return NextResponse.json({ status: res?.status, message: res?.message }, { status: res?.statusCode });
}
