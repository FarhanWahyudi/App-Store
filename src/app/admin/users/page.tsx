import UserAdminView from '@/components/view/admin/users';

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { cache: 'no-store' });
  const { data } = await res.json();

  return data;
}

export default async function AdminUsersPage() {
  const users = await getUsers();
  return (
    <>
      <UserAdminView users={users} />
    </>
  );
}
