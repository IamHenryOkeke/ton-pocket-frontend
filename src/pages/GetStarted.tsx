import { useTonConnectUI } from "@tonconnect/ui-react";
// import { useNavigate } from "react-router-dom";
import { useTelegramUser } from "../hooks/useTelegramUser";
import { useEffect } from "react";

export default function GetStarted() {
  // const navigate = useNavigate();
  const user = useTelegramUser();
  const [tonConnectUI] = useTonConnectUI();
  // const userAddress = useTonAddress();

  // useEffect(() => {
  //   // if user has an account with that username
  //   // setHasAccount(true)
  // }, [])

  useEffect(() => {
    // on wallet connect navigate user to app/home

    // navigate("/app/home")
  }, [])

  return (
    <div className="px-4 py-10">
      <h1 className="text-2xl font-orbitron font-bold mb-5">Let's Get Started</h1>
      <div>
        <span className="font-semibold text-sm">Telegram Username:</span>
        <p className="w-full mt-1 p-2 border border-primaryDark/80 rounded">
          {user?.username || <span className="text-opacity-10">Loading username....</span>}
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => tonConnectUI.openModal()}
          className="mx-auto font-orbitron disabled:bg-opacity-65 disabled:cursor-not-allowed font-extrabold px-10 py-2.5 text-white rounded-md bg-primaryDark"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}

