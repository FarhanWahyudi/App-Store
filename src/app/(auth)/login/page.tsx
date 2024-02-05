import LoginView from '@/components/view/auth/login';
import { Suspense } from 'react';

export default function RegisterPage() {
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <LoginView />
      </Suspense>
    </>
  );
}
