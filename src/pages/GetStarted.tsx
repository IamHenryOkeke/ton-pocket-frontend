import { useTelegramUser } from '../hooks/useTelegramUser';

export default function GetStarted() {
  // const user = useTelegramUser();

  // if (!user) {
  //   return <div>Loading...</div>; // Show loading if user is not available
  // }

  return (
    <div className="p-4">
      {/* <h1 className="text-lg font-bold">Welcome, {user.first_name}!</h1>
      <p>Username: {user.username || 'N/A'}</p>
      <img
        src={user.photo_url}
        alt="User Avatar"
        className="w-16 h-16 rounded-full mt-4"
      /> */}
      <ConnectToTelegram />
    </div>
  );
}

import React, { useEffect } from 'react';

function ConnectToTelegram() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?19';
    script.async = true;
    script.setAttribute('data-telegram-login', '<your_bot_username>'); // Replace with your bot's username
    script.setAttribute('data-size', 'large'); // Button size
    script.setAttribute('data-auth-url', 'https://your-backend-url.com/auth/telegram'); // Your backend endpoint for authentication
    script.setAttribute('data-request-access', 'write'); // Request additional access permissions if needed
    document.getElementById('telegram-login-button').appendChild(script);
  }, []);

  return (
    <div id="telegram-login-button"></div>
  );
}


