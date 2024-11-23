import { toMoney } from "number-string";
import sendIcon from "../assets/icons/svg/send.svg";
import { useState } from "react";

export default function Keypad() {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0, "Delete"];
  const [amount, setAmount] = useState("1.55787");
  const [narration, setNarration] = useState("");
  const [hideMoney, setHideMoney] = useState(false);

  const handleClick = (key: string | number) => {
    if (key === "Delete") {
      let newAmount = amount.substring(
        0,
        amount.includes(".") ? amount.indexOf(".") : amount.length - 1
      );
      if (!newAmount) newAmount = "0";
      setAmount(newAmount);
      return;
    }

    let formerAmount = amount;
    if (formerAmount === "0" && key !== ".") formerAmount = "";
    if (amount.includes(".") && key === ".") return;
    setAmount(formerAmount + key.toString());
  };

  return (
    <div className="bg-white/20 flex flex-col w-full rounded-t-xl px-6 dropShadow-lg">
      {/* Inputs */}
      <div className="flex flex-col w-full gap-2">
        {/* Balance */}
        <div className="flex w-full justify-center">
          <div className="flex mx-auto gap-2 text-textSecondary font-inter font-medium pt-6 pb-3">
            <span>USD Balance:</span>
            <div
              onClick={() => setHideMoney(!hideMoney)}
              className="flex relative cursor-pointer"
            >
              <span className={hideMoney ? "blur " : ""}>{toMoney(1000)}</span>
            </div>
          </div>
        </div>
        {/* Input Box */}
        <div className="flex w-full">
          <p className="bg-secondary/40 border-b-[0.5rem] text-[1.5rem] rounded-t-xl font-inter font-medium p-3 pb-1.5 flex w-full border-primaryDark">
            {toMoney(amount)}
          </p>
        </div>

        {/* Naration & Send */}
        <div className="flex w-full gap-2">
          <div className="flex w-full">
            <input
              name="narration"
              onChange={(event) => {
                setNarration(event.target.value);
              }}
              placeholder="Narration (eg Sent with love)"
              type="text"
              className="w-full border-none outline-none bg-transparent text-[1.2rem] text-textSecondary"
              maxLength={100}
              value={narration}
            />
            <span className="my-auto text-textSecondary text-[1.2rem]">
              {narration.length}/100
            </span>
          </div>
          <button className="flex px-6 py-2 bg-secondary/30 rounded-lg">
            <span>
              <img src={sendIcon} className="h-8" alt="Send Tip" />
            </span>
          </button>
        </div>
      </div>

      {/* Key Pad */}
      <div className="grid w-full grid-cols-3 pb-4">
        {keys.map((key) => (
          <button
            onClick={() => handleClick(key)}
            className="py-4 text-[1.5rem] font-tnr-bold font-bold"
            key={key}
          >
            <span
              className={
                key === "Delete"
                  ? "font-inter text-[1rem] text-primaryDark"
                  : ""
              }
            >
              {key}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
