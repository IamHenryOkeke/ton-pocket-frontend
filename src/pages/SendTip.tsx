import { useParams } from "react-router-dom";
import BackButton from "../components/back-button";
import { useState } from "react";

export default function SendTip() {
  const [isSent] = useState(false);
  const { userName } = useParams();

  return (
    <main className="h-screen px-4 py-10 pb-10 bg-primaryDark/20">
      {!isSent ? (
        <div>
          <div className="flex items-center mb-5">
            <BackButton />
            <h3 className="text-center w-full">{userName}</h3>
          </div>
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
