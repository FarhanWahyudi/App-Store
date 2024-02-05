'use client';

import Button from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type propTypes = {
  lists: Array<{
    title: string;
    link: string;
    icon: any;
  }>;
};

export default function Sidebar({ lists }: propTypes) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col justify-between w-1/6 h-screen bg-black p-5">
      <div className="flex flex-col gap-5">
        <h1 className="text-white text-2xl font-bold text-center">Admin Panel</h1>
        <div className="flex flex-col gap-1.5">
          {lists.map((list, index) => (
            <Link
              key={list.title + index}
              href={list.link}
              className={`${pathname === list.link ? 'bg-white text-black' : 'bg-black text-white'} flex gap-2 items-center  py-1.5 px-2 rounded-md transition-all ease-in-out duration-300 hover:bg-white hover:text-black`}
            >
              <FontAwesomeIcon icon={list.icon} />
              <h3 className="font-medium">{list.title}</h3>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <Button onClick={() => signOut()} type="button" size="w-full py-1.5" style="bg-white rounded-md font-medium">
          Logout
        </Button>
      </div>
    </div>
  );
}
