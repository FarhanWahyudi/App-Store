import instance from '@/lib/axios/instance';

const authService = {
  registerAccount: (data: any) => instance.post('/api/auth/register', data),
};

export default authService;
