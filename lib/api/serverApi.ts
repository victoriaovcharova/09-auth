import { nextServer } from './api';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

export const getProfile = async (): Promise<User> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await nextServer.get<User>('/auth/me', {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};