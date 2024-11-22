import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../components/back-button";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Button from "../components/button";
import { toMoney } from "number-string";

dayjs.extend(localizedFormat);

export default function PreviewGoal() {
  const location = useLocation();
  const {
    name,
    image_url,
    unique_id,
    description,
    targetAmount,
    recurringAmount,
    intervals,
    endDate,
    type,
  } = location.state || {};
  const [isCreated] = useState(false);
  console.table(location.state);

  return (
    <main className="px-4 py-10 pb-10 bg-primaryDark/20">
      {!isCreated ? (
        <div>
          <div className="flex items-center mb-5">
            <BackButton />
            <h3 className="text-center w-full">Create a {type} Goal </h3>
          </div>
          <div className="h-screen flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <img
                  src={image_url}
                  alt=""
                  className="flex items-center justify-center w-full h-48 bg-white/30 border border-dashed border-gray-400 rounded-lg cursor-pointer"
                />
                <h1 className="text-center mt-2 font-semibold">
                  {name} - ({unique_id})
                </h1>
              </div>
              <div className="text-[#2D2D2D] text-sm space-y-3">
                <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                  <span>Description</span>
                  <span>{description || "Nil"}</span>
                </div>
                <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                  <span>Your {type} Target</span>
                  <span>{toMoney(targetAmount)}</span>
                </div>
                <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                  <span>Amount You will pay every {intervals} days</span>
                  <span>{toMoney(recurringAmount)}</span>
                </div>
                <div className="pb-5 pt-2 flex justify-between border-b-[2px] border-[#606060]">
                  <span>Complete goal before</span>
                  <span>
                    {endDate
                      ? dayjs(new Date(endDate)).format("LL")
                      : "Not Applicable"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <Link className="w-full" to="/app/goal/create">
                  <Button text="Restart" variant="none" />
                </Link>
                <Button text="Create" variant="fill" />
              </div>
              <p className="text-[10px] text-center mt-2">
                By tapping “Create”, you agree to our{" "}
                <span className="text-primaryDark">Terms & Conditions. </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <PocketCreated />
      )}
    </main>
  );
}

function PocketCreated() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="pt-40 flex flex-col items-center text-center gap-4">
        <img src="/src/assets/PocketCreated.svg" alt="" />
        <div>
          <h3 className="font-bold">Finished.</h3>
          <p className="font-medium text-xs text-[#555555]">
            Enjoy your new tip pocket.
          </p>
        </div>
      </div>
      <button className="font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
        Done
      </button>
    </div>
  );
}
