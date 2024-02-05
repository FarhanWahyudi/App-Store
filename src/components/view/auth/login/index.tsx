'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginView() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
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
        callbackUrl,
      });
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
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
    <form onSubmit={handleLogin}>
      <Input name="email" label="Email" placeholder="johndoe@example.com" type="email" />
      <Input name="password" label="Password" placeholder="****" type="password" />
      {error !== '' && <p className="text-center text-red-600 font-medium mt-3">{error}</p>}
      <Button type="submit" disabled={isLoading} size="p-2 w-full mt-7" style="bg-black text-white rounded-sm">
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
