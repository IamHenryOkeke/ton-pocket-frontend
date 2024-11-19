import { ChangeEvent, useEffect, useState } from "react";
import BackButton from "../components/back-button";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { TonConnectButton, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";

type Token = "USDT" | "TON";

export default function AssetSwap() {
  const [fromToken, setFromToken] = useState<Token>("USDT");
  const [toToken, setToToken] = useState<Token>("TON");
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [invalidInput, setInvalidInput] = useState<boolean>(true);

  const userAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [balances, setBalances] = useState({
    USDT: 1000,
    TON: 500
  });

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    // setFromAmount(toAmount);
    // setToAmount(fromAmount);
  };

  const handleFromTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Regex to allow numbers but restrict invalid leading zeros
    if (/^(0|[1-9]\d*)(\.\d*)?$/.test(inputValue) || inputValue === "") {
      setFromAmount(inputValue);
      if (Number(inputValue) <= balances[fromToken] && inputValue !== "") {
        setInvalidInput(false);
      } else {
        setInvalidInput(true);
      }
    }
  };

  // const handleToTokenInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;

  //   // Regex to allow numbers but restrict invalid leading zeros
  //   if (/^(0|[1-9]\d*)(\.\d*)?$/.test(inputValue) || inputValue === "") {
  //     if (Number(inputValue) <= balances[toToken]) {
  //       setToAmount(inputValue);
  //     }
  //   }
  // };

  const handleSwap = () => {
    if (fromAmount === '' || Number(fromAmount) <= 0) {
      alert('Please enter a valid amount to swap.');
      return;
    }

    alert(`Swapping ${fromAmount} ${fromToken} to ${toToken}`);
    // Update balances (example logic, real implementation will depend on backend/Web3 integration)
    setBalances((prevBalances) => ({
      ...prevBalances,
      [fromToken]: prevBalances[fromToken] - Number(fromAmount),
      [toToken]: Number(prevBalances[toToken]) + Number(toAmount), // Adjust this based on conversion rate
    }));
    setFromAmount("");
    setInvalidInput(true);
  };

  // Mock conversion rates
  const conversionRates = {
    USDT_TO_TON: 0.5,
    TON_TO_USDT: 2,
  };

  // Update the 'toAmount' based on 'fromAmount'
  useEffect(() => {
    if (fromToken === "USDT" && toToken === "TON") {
      setToAmount((Number(fromAmount) * conversionRates.USDT_TO_TON).toString());
    } else if (fromToken === "TON" && toToken === "USDT") {
      setToAmount((Number(fromAmount) * conversionRates.TON_TO_USDT).toString());
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  // Update the 'fromAmount' when 'toAmount' changes
  // useEffect(() => {
  //   if (fromToken === "USDT" && toToken === "TON" && toAmount !== "") {
  //     setFromAmount(Number(toAmount) / conversionRates.USDT_TO_TON);
  //   } else if (fromToken === "TON" && toToken === "USDT") {
  //     setFromAmount(Number(toAmount) / conversionRates.TON_TO_USDT);
  //   }
  // }, [toAmount, fromToken, toToken]);
  return (
    <main className="px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5 h-screen">
      <div className='flex items-center'>
        <BackButton />
        <h3 className='text-center w-full font-semibold'>Swap Tokens</h3>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="w-full relative">
          {/* From Token */}
          <div className="mb-4 bg-white/30 rounded-lg text-[#646464] p-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">You Pay</label>
            <div className="flex text-3xl font-bold items-center space-x-2 mt-2">
              <input
                value={fromAmount}
                onChange={handleFromTokenInputChange}
                placeholder="0"
                className={`w-4/5 ${invalidInput ? "text-red-500" : ""} bg-transparent py-2 border rounded-lg focus:outline-none`}
              />
              <p>{fromToken}</p>
            </div>
            <div className="flex justify-between">
              <p>$200</p>
              <p>{balances[fromToken]} {fromToken}</p>
            </div>
          </div>
          <div className="mb-4 bg-white/30 rounded-lg text-[#646464] p-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">You Receive</label>
            <div className="text-3xl font-bold flex items-center space-x-2 mt-2">
              <input
                value={toAmount}
                // onChange={handleToTokenInputChange}
                disabled
                placeholder="0"
                className="w-4/5 bg-transparent py-2 border rounded-lg focus:outline-none"
              />
              <p>{toToken}</p>
            </div>
            <div className="flex justify-between">
              <p>$200</p>
              <p>{balances[toToken]} {toToken}</p>
            </div>
          </div>

          <div className="absolute top-[120px] left-[170px] flex justify-center my-4">
            <button
              onClick={switchTokens}
              className="p-2 rounded-full bg-primaryDark text-white hover:bg-primary"
            >
              <IoSwapVerticalOutline className="h-5 w-5" />
            </button>
          </div>
        </div>
        {
          userAddress ?
            <button
              onClick={handleSwap}
              disabled={invalidInput}
              className={`font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark  disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {/* {
            invalidInput ? "Insufficient Fund" : "Swap"
          } */}
              Swap
            </button>
            :
            <TonConnectButton />
        }
      </div>
    </main>
  );
}

// function SwapCompleted() {
//   return (
//     <div className='h-screen flex flex-col justify-between'>
//       <div className='pt-40 flex flex-col items-center text-center gap-4'>
//         <img src="/src/assets/PocketCreated.svg" alt="" />
//         <div>
//           <h3 className='font-bold'>Done.</h3>
//           <p className='font-medium text-xs text-[#555555]'>Your swap has been completed</p>
//         </div>
//       </div>
//       <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
//         Done
//       </button>
//     </div>
//   )
// }
