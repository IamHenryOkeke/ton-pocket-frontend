import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/back-button";
import useAppState from "../hooks/useAppState";
import { useEffect } from "react";
import { toMoney } from "number-string";

export default function PreviewTipDetails() {
  const navigate = useNavigate();
  const { userName, goalId } = useParams();
  const tipWallet = useAppState((state) => state.tipWallet);

  useEffect(() => {
    if (!tipWallet?.id || !tipWallet?.user) navigate("/app/tip");
  }, [navigate, tipWallet?.id, tipWallet?.user]);

  return (
    <main className="px-4 py-10 pb-10 bg-primaryDark/20">
      <div>
        <div className="flex items-center mb-5">
          <BackButton />
          <h3 className="text-center w-full">
            Tip a Friend{goalId ? "'s Goal" : ""}
          </h3>
        </div>
        <div className="h-screen flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <img
                src={goalId ? tipWallet?.Goal?.[0]?.image_url : ""}
                alt=""
                className="flex items-center justify-center w-full h-48 bg-white/30 border border-dashed border-gray-400 rounded-lg cursor-pointer"
              />
              <h1 className="text-center mt-2 font-semibold">
                {goalId
                  ? tipWallet?.Goal?.[0]?.name
                  : tipWallet?.user?.username + "'s Pocket"}
              </h1>
              {goalId ? (
                <div className="text-[#2D2D2D] text-sm space-y-3">
                  <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                    <span>Target</span>
                    <span>
                      {toMoney(tipWallet?.Goal?.[0]?.targetAmount || 0)}
                    </span>
                  </div>
                  <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                    <span>Current Balance</span>
                    <span>
                      {toMoney(tipWallet?.Goal?.[0]?.currentAmount || 0)}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="w-full">
            {userName && (
              <Link to={`/app/tip/user/${userName}/send-tip`}>
                <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
                  Next
                </button>
              </Link>
            )}

            {goalId && (
              <Link to={`/app/tip/goal/${goalId}/send-tip`}>
                <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
                  Next
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
