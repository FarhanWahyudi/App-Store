import Button from '@/components/ui/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="bg-black flex items-center justify-between py-2.5 px-5 w-full">
      <h1 className="text-white capitalize">{session?.user?.name}</h1>
      {status === 'authenticated' && (
        <Button onClick={() => signOut()} type="button" size="text-sm px-2 py-1" style="bg-white rounded">
          Logout
        </Button>
      )}
      {status === 'loading' && (
        <Button disabled type="button" size="text-sm px-2 py-1" style="bg-white rounded">
          loading
        </Button>
      )}
      {status === 'unauthenticated' && (
        <Button onClick={() => signIn()} type="button" size="text-sm px-2 py-1" style="bg-white rounded">
          Login
        </Button>
      )}
    </div>
  );
}
