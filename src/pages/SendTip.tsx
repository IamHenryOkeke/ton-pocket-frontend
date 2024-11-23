import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/back-button";
import { useEffect, useState } from "react";
import useAppState from "../hooks/useAppState";
import Keypad from "../components/numberKeypad";

export default function SendTip() {
  const [isSent] = useState(false);
  const { userName } = useParams();
  const navigate = useNavigate();
  const tipWallet = useAppState((state) => state.tipWallet);

  useEffect(() => {
    if (!tipWallet?.id || !tipWallet?.user) navigate("/app/tip");
  }, [navigate, tipWallet?.id, tipWallet?.user]);

  return (
    <main className={"h-screen bg-primaryDark/20"}>
      {!isSent ? (
        <div className="flex flex-col justify-between h-full w-full">
          <div className="flex px-4 pt-5 items-center mb-5">
            <BackButton />
            <h3 className="text-center w-full font-bold">
              {tipWallet?.Goal
                ? `${tipWallet?.user?.username}'s Goal - (${tipWallet?.Goal?.[0]?.name})`
                : `${tipWallet?.user?.username}'s Pocket`}
            </h3>
          </div>

          <Keypad />
        </div>
      ) : (
        <TipSent userName={userName} />
      )}
    </main>
  );
}

function TipSent({ userName }: { userName?: string }) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="pt-40 flex flex-col items-center text-center gap-4">
        <img src="/src/assets/PocketCreated.svg" alt="" />
        <div>
          <h3 className="font-bold">Sent.</h3>
          <p className="font-medium text-xs text-[#555555]">
            $200 is on it's way to {userName}
          </p>
        </div>
      </div>
      <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
        Done
      </button>
    </div>
  );
}
