'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import authService from '@/services/auth';

export default function RegisterView() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    await authService
      .registerAccount(data)
      .then(() => {
        form.reset();
        setIsLoading(false);
        push('/login');
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleRegister}>
      <Input name="fullname" label="Fullname" placeholder="john doe" type="text" />
      <Input name="email" label="Email" placeholder="johndoe@example.com" type="email" />
      <Input name="password" label="Password" placeholder="****" type="password" />
      <Input name="confirmPassword" label="Confirm Password" placeholder="****" type="password" />
      {error !== '' && <p className="text-center text-red-600 font-medium mt-3">{error}</p>}
      <Button type="submit" disabled={isLoading} size="p-2 w-full mt-7" style="bg-black text-white rounded-sm">
        {isLoading ? 'Loading...' : 'Login'}
      </Button>
    </form>
  );
}
