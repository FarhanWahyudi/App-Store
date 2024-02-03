import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import app from './init';
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: any, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();
  return data;
}

export async function signUp(userData: { fullname: string; email: string; password: string; confirmPassword: string; role?: string }) {
  const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length > 0) {
    return { status: false, statusCode: 400, message: 'Account is Already exists' };
  } else if (userData.password !== userData.confirmPassword) {
    return { status: false, statusCode: 401, message: 'Password is Invalid' };
  } else {
    if (!userData.role) {
      userData.role = 'member';
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, 10);
    try {
      await addDoc(collection(firestore, 'users'), userData);
      return { status: true, statusCode: 200, message: 'Register Success' };
    } catch {
      return { status: false, statusCode: 400, message: 'Register Failed' };
    }
  }
}

export async function signIn(data: { email: string }) {
  const q = query(collection(firestore, 'users'), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (user) {
    return user[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const q = query(collection(firestore, 'users'), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (user.length > 0) {
    data.role = 'member';
    await updateDoc(doc(firestore, 'users', user[0].id), data).then(() => {
      callback(data);
    });
  } else {
    data.role = 'member';
    await addDoc(collection(firestore, 'users'), data).then(() => {
      callback(data);
    });
  }
}
