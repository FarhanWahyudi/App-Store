import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userService from '@/services/user';
import { FormEvent, useState } from 'react';

export default function ModalDeletedUser({ deletedUser, setDeletedUser, setUsersData }: any) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    await userService
      .deleteUsers(deletedUser.id)
      .then(async () => {
        setDeletedUser({});
        const { data } = await userService
          .getAllUsers()
          .then((res) => {
            return res;
          })
          .catch((err) => {
            throw new Error(err.message);
          });
        const users = data.data;
        setUsersData(users);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <form onSubmit={handleDeleteUser}>
        <h1 className="font-bold text-2xl mb-3">Delete this User?</h1>
        <h3>Fullname: {deletedUser.fullname}</h3>
        <h3>Email: {deletedUser.email}</h3>
        <div className="flex justify-end">
          <Button type="submit" size="py-1 px-2 mt-5" style="text-slate-50 rounded-md bg-red-500">
            {isLoading ? 'Loading' : 'Delete'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
