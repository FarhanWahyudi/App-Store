import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userService from '@/services/user';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function ModalUpdateUser({ updatedUser, setUpdatedUser, setUsersData }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    event.preventDefault();
    const data = {
      role: form.role.value,
    };

    await userService
      .updateUsers(updatedUser.id, data, session.data?.accessToken)
      .then(async () => {
        setUpdatedUser({});
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
    <Modal onClose={() => setUpdatedUser({})}>
      <form onSubmit={handleUpdateUser}>
        <h1 className="font-bold text-2xl">Update User</h1>
        <Input name="fullname" label="Fullname" placeholder="john doe" type="text" defaultValue={updatedUser.fullname} disabled />
        <Input name="email" label="Email" placeholder="johndoe@example.com" type="email" defaultValue={updatedUser.email} disabled />
        <Select
          name="role"
          label="role"
          defaultValue={updatedUser.role}
          options={[
            { label: 'admin', value: 'admin' },
            { label: 'member', value: 'member' },
          ]}
        />
        <div className="flex justify-end">
          <Button type="submit" size="py-1 px-2 mt-5" style="text-slate-50 rounded-md bg-green-500">
            {isLoading ? 'Loading' : 'Update'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
