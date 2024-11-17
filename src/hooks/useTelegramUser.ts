import { useEffect, useState } from 'react';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  // useEffect(() => {
  //   const telegram: any = window.Telegram?.WebApp;

  //   if (telegram?.initDataUnsafe?.user) {
  //     setUser(telegram.initDataUnsafe.user);
  //   } else {
  //     console.warn("Telegram user information not available.");
  //   }
  // }, []);

  return user;
}
