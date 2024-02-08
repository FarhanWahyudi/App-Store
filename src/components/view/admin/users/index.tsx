'use client';

import Button from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import ModalUpdateUser from './modalUpdateUser';
import ModalDeletedUser from './modalDeletedUser';

type propTypes = {
  users: any;
};

export default function UserAdminView({ users }: propTypes) {
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <div className="p-7">
        <h1 className="font-bold text-2xl mb-5">User Management</h1>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-slate-200 border-b-2 border-gray-300">
              <th className="text-center py-2 w-12">No.</th>
              <th className="text-left py-2 w-72">Fullname</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2 w-32">Role</th>
              <th className="text-left py-2 w-40">Action</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user: any, index: number) => (
              <tr key={user.fullname + index} className={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-slate-50'}`}>
                <td className="py-3 text-center">{index + 1}</td>
                <td className="py-3">{user.fullname}</td>
                <td className="py-3">{user.email}</td>
                {user.role === 'admin' ? <td className="py-3 text-red-600 font-bold">{user.role}</td> : <td className="py-3">{user.role}</td>}
                <td className="py-3">
                  <div className="flex gap-2">
                    <Button onClick={() => setUpdatedUser(user)} type="button" size="py-1 px-2" style="text-slate-50 rounded-md bg-green-500">
                      Update
                    </Button>
                    <Button onClick={() => setDeletedUser(user)} type="button" size="py-1 px-2" style="text-slate-50 rounded-md bg-red-500">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(updatedUser).length ? <ModalUpdateUser setUsersData={setUsersData} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} /> : <></>}
      {Object.keys(deletedUser).length ? <ModalDeletedUser setUsersData={setUsersData} deletedUser={deletedUser} setDeletedUser={setDeletedUser} /> : <></>}
    </>
  );
}
