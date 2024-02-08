import { addData, retrieveDAtaByField } from '@/lib/firebase/route';
import { addDoc, collection, doc, getFirestore, updateDoc } from 'firebase/firestore';
import bcrypt from 'bcrypt';
import app from '@/lib/firebase/init';

const firestore = getFirestore(app);

export async function signUp(userData: { fullname: string; email: string; password: string; confirmPassword: string; role?: string; created_at: Date; updated_at: Date }) {
  const users = await retrieveDAtaByField('users', 'email', userData.email);

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: 'Account is Already exists' };
  } else if (userData.password !== userData.confirmPassword) {
    return { status: false, statusCode: 401, message: 'Password is Invalid' };
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }
    userData.created_at = new Date();
    userData.updated_at = new Date();
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, 10);
    await addData('users', userData);
  }
}

export async function signIn(data: { email: string }) {
  const user = await retrieveDAtaByField('users', 'email', data.email);

  if (user) {
    return user[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: { email: string; role?: string; created_at: Date; updated_at: Date; password?: string }, callback: Function) {
  const user = await retrieveDAtaByField('users', 'email', data.email);

  if (user.length > 0) {
    data.role = 'member';
    await updateDoc(doc(firestore, 'users', user[0].id), data).then(() => {
      callback(data);
    });
  } else {
    data.role = 'member';
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = '';
    await addDoc(collection(firestore, 'users'), data).then(() => {
      callback(data);
    });
  }
}
