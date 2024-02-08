import { deleteData, retrieveData, updateData } from '@/lib/firebase/route';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const users = await retrieveData('users');
  const data = users.map((user: any) => {
    delete user.password;
    delete user.confirmPassword;
    return user;
  });
  return NextResponse.json({ status: true, statusCode: 200, message: 'success', data });
}

export async function PUT(req: NextRequest) {
  const { id, data } = await req.json();
  const result = await updateData('users', id, data);
  return NextResponse.json({ status: result.status, message: result.message }, { status: result.statusCode });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const result = await deleteData('users', id);
  return NextResponse.json({ status: result.status, message: result.message }, { status: result.statusCode });
}
