'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
          <Input name="email" label="Email" placeholder="johndoe@example.com" type="email" />
          <Input name="password" label="Password" placeholder="****" type="password" />
          {error !== '' && <p className="text-center text-red-600 font-medium mt-3">{error}</p>}
          <Button type="submit" disabled={isLoading} size="p-2 w-full mt-7" style="bg-black text-white rounded-sm">
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
        </form>
        <hr className="my-5 border-slate-900" />
        <Button onClick={() => signIn('google', { callbackUrl: '/', redirect: false })} type="button" size="p-2 w-full" style="text-black border border-black rounded-sm">
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign in with Google
        </Button>
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
