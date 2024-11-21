import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { TelegramUser } from '../lib/types';

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const username = WebApp.initDataUnsafe.user as TelegramUser
    setUser(username);
  }, [])

  return user;
}
