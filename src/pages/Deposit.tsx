import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { useState } from 'react';
import BackButton from '../components/back-button';

export default function Deposit() {
  const [visible, setVisible] = useState(false);
  return (
    <main className="px-4 pt-10 pb-20 bg-primaryDark/20 h-screen">
      <div className='flex items-center'>
        <BackButton />
        <h3 className='text-center w-full font-semibold'>Deposit</h3>
      </div>
      <MoonPayBuyWidget
        variant="overlay"
        baseCurrencyCode="usd"
        baseCurrencyAmount="100"
        defaultCurrencyCode="eth"
        onLogin={async () => console.log("Customer logged in!")}
        visible={visible}
      />
      <button className="mt-10 font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark  disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setVisible(!visible)}>
        Deposit with MoonPay
      </button>
    </main>
  )
}
