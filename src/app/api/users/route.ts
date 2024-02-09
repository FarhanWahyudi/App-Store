import { deleteData, retrieveData, updateData } from '@/lib/firebase/route';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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
  const reqHeader = new Headers(req.headers);
  const token = reqHeader.get('Authorization')?.split(' ')[1] || '';
  return jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
    if (decoded && decoded.role === 'admin') {
      const result = await updateData('users', id, data);
      return NextResponse.json({ status: result.status, message: result.message }, { status: result.statusCode });
    } else {
      return NextResponse.json({ status: false, message: 'Access denied' }, { status: 403 });
    }
  });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const reqHeader = new Headers(req.headers);
  const token = reqHeader.get('Authorization')?.split(' ')[1] || '';
  return jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err: any, decoded: any) => {
    if (decoded && decoded.role === 'admin') {
      const result = await deleteData('users', id);
      return NextResponse.json({ status: result.status, message: result.message }, { status: result.statusCode });
    } else {
      return NextResponse.json({ status: false, message: 'Access denied' }, { status: 403 });
    }
  });
}
