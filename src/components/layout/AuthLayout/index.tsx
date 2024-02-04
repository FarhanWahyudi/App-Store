import Button from '@/components/ui/Button';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

type propTypes = {
  children: React.ReactNode;
  title: string;
  linkText: string;
  link: string;
};
export default function AuthLayout({ children, title, linkText, link }: propTypes) {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <div className="w-1/3 border-2 border-gray-300 rounded-md p-7">
        {children}
        <hr className="my-5 border-slate-900" />
        <Button onClick={() => signIn('google', { callbackUrl: '/', redirect: false })} type="button" size="p-2 w-full" style="text-black border border-black rounded-sm">
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign in with Google
        </Button>
        <p className="mt-5 text-center">
          {linkText}
          <Link href={link} className="font-bold">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}
