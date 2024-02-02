'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginView() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: '/',
      });
      if (!res?.error) {
        setIsLoading(false);
        push('/');
      } else {
        setIsLoading(false);
        setError('Email or Password is incorrect');
      }
    } catch (error) {
      setIsLoading(false);
      setError('Email or Password is incorrect');
    }
  };
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-3">Login</h1>
      <div className="w-1/3 border-2 border-gray-300 rounded-md p-7">
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-y-1 mt-5">
            <label htmlFor="email" className="font-bold text-base">
              Email
            </label>
            <input type="email" className="outline-none bg-slate-200 p-2 rounded-sm" name="email" id="email" placeholder="johndoe@example.com" />
          </div>
          <div className="flex flex-col gap-y-1 mt-5">
            <label htmlFor="password" className="font-bold text-base">
              Password
            </label>
            <input type="password" className="outline-none bg-slate-200 p-2 rounded-sm" name="password" id="password" placeholder="****" />
          </div>
          {error !== '' && <p className="text-center text-red-600 font-medium mt-3">{error}</p>}
          <button type="submit" className="w-full p-2 text-center bg-black text-white rounded-sm mt-7" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="mt-5 text-center">
          Dont have an Account? Sign up{' '}
          <Link href="/register" className="font-bold">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
