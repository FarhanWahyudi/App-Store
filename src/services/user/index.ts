import instance from '@/lib/axios/instance';

const userService = {
  getAllUsers: () => instance.get('/api/users'),
  updateUsers: (id: string, data: any, token: string) =>
    instance.put(
      '/api/users',
      { data, id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUsers: (id: string, token: string) =>
    instance.delete('api/users', {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userService;
