import instance from '@/lib/axios/instance';

const userService = {
  getAllUsers: () => instance.get('/api/users'),
  updateUsers: (id: string, data: any) => instance.put('/api/users', { id, data }),
  deleteUsers: (id: string) => instance.delete('api/users', { data: { id } }),
};

export default userService;
