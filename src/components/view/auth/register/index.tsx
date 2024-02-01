'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function RegisterView() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    const res = await fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        fullname: form.fullname.value,
        email: form.email.value,
        password: form.password.value,
        confirmPassword: form.confirmPassword.value,
      }),
    });

    if (res.status === 200) {
      form.reset();
      setIsLoading(false);
      push('/login');
    } else if (res.status === 400) {
      setError('Account is Already Exists');
      setIsLoading(false);
    } else if (res.status === 401) {
      setError('Password is Inavalid');
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-3">Register</h1>
      <div className="w-1/3 border-2 border-gray-300 rounded-md p-7">
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-y-1 mt-5">
            <label htmlFor="fullname" className="font-bold text-base">
              Fullname
            </label>
            <input type="text" className="outline-none bg-slate-200 p-2 rounded-sm" name="fullname" id="fullname" placeholder="john doe" />
          </div>
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
          <div className="flex flex-col gap-y-1 mt-5">
            <label htmlFor="confirmPassword" className="font-bold text-base">
              Confirm Password
            </label>
            <input type="password" className="outline-none bg-slate-200 p-2 rounded-sm" name="confirmPassword" id="confirmPassword" placeholder="****" />
          </div>
          {error !== '' && <p className="text-center text-red-600 font-medium mt-3">{error}</p>}
          <button type="submit" className="w-full p-2 text-center bg-black text-white rounded-sm mt-7" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
        <p className="mt-5 text-center">
          Have an account? Sign in{' '}
          <Link href="/login" className="font-bold">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
