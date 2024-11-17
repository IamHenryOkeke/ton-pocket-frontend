import { FaPlus, FaSearch, FaBell } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { IoSwapVerticalOutline } from "react-icons/io5";
import { RiBatterySaverLine } from "react-icons/ri";
import Button from "../components/button";
import TransactionPreviewCard from "../components/transaction-preview-card";
import Navbar from "../components/navbar";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "../hooks/useClickOutside";

export default function Home() {
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  return (
    <main onClick={() => { if (showQuickMenu) setShowQuickMenu(false) }} className="px-4 pt-10 pb-20 bg-primaryDark/20 space-y-5">
      <div className="relative flex justify-between">
        <div className="flex items-center gap-2">
          <img src="/src/assets/Profile.svg" alt="" />
          <div className="flex flex-col text-xs font-medium">
            <span>Hi, Geezie_001</span>
            <span>Wellcome Back</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FaSearch size={20} />
          <FaPlus size={20} onClick={() => setShowQuickMenu(!showQuickMenu)} />
          <FaBell size={20} />
        </div>
        <QuickMenu isOpen={showQuickMenu} setIsOpen={setShowQuickMenu} />
      </div>
      <div className="bg-white/30 rounded-2xl p-6 flex justify-between">
        <div>
          <h2 className="text-[#484848] text-sm">Total Balance</h2>
          <p className="text-3xl font-medium text-[#111111]">$12,056.00</p>
        </div>
        <div className="text-[#484848]">
          <select name="" id="" className="px-2 py-1.5 font-medium">
            <option value="usd">USD</option>
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <Button text="Withdraw" variant="none" />
        <Button text="Deposit" variant="fill" />
      </div>
      <div>
        <h3 className="font-bold text-xl mb-2">
          Explore!
        </h3>
        <div className="flex gap-5">
          <Link to="/app/pocket/create" className="w-full flex flex-col gap-1 p-3 font-medium text-sm bg-white/30 border-2 border-white/30 rounded-[10px]">
            <GoPlusCircle className="h-5 w-5" />
            <p className="text-start">
              Create <br /> tip pocket
            </p>
          </Link>
          <Link to="/app/pocket/tip" className="w-full flex flex-col gap-1 p-3 font-medium text-sm bg-primaryDark text-white border-2 border-white/30 rounded-[10px]">
            <img src="/src/assets/Tip.svg" alt="" className="h-5 w-5" />
            <p className="text-start">
              Tip <br /> a friend
            </p>
          </Link>
          <Link to="/app/asset-swap" className="w-full flex flex-col gap-1 p-3 font-medium text-sm bg-primaryDark text-white border-2 border-white/30 rounded-[10px]">
            <IoSwapVerticalOutline className="h-5 w-5" />
            <p className="text-start">
              Asset <br /> swap
            </p>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h3 className="text-xl">Transactions</h3>
          <button className="rounded-lg px-4 text-sm border border-[#282828]">View more</button>
        </div>
        <div className="mt-1 mb-4 space-y-3 divide-y-2 divide-black/50">
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for akara" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="500" description="Tip received" transactionType="credit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for akara" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Tip sent" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for netflix" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for plane fare" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Tip sent" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for netflix" transactionType="debit" />
          <TransactionPreviewCard status="Processed" date={new Date()} amount="1,500" description="Paid for plane fare" transactionType="debit" />
        </div>
      </div>
      <Navbar />
    </main>
  )
}

type QuickMenuType = {
  isOpen: boolean;
  setIsOpen: any;
}

function QuickMenu({ isOpen, setIsOpen }: QuickMenuType) {
  const sideNavRef = useRef<any>();

  useOnClickOutside(sideNavRef, () => {
    setIsOpen(false);
  });
  return (
    <>
      {
        isOpen && (
          <div className="text-sm absolute space-y-2 right-8 top-8 px-2 py-3 bg-white rounded-lg">
            <Link to="/app/tip" className="flex items-center gap-1"><RiBatterySaverLine className="h-5 w-5" />Save</Link>
            <Link to="/app/tip" className="flex items-center gap-1"><GoPlusCircle className="h-5 w-5" />Create a tip pocket</Link>
            <Link to="/app/tip" className="flex items-center gap-1"><img src="/src/assets/TipDark.svg" alt="icon" className="h-5 w-5" />Add to tip pocket</Link>
          </div>
        )
      }
    </>
  )
}