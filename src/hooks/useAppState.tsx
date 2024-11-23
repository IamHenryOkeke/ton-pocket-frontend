import { create } from "zustand";
import {
  AppUser,
  ContractPocket,
  TelegramUser,
  UserWallet,
} from "../lib/types";

export type AppState = {
  telegramUser?: TelegramUser;
  appUser?: AppUser;
  userChecked: boolean; // We use this to know when the backed has checked if a user exists.
  pocketDetails?: ContractPocket | null;
  pocketChecked: boolean; // So we know when the smart contract has been called to retrieve user wallet.
  tipWallet?: UserWallet;

  setPocketChecked: (pocketChecked: boolean) => void;
  setTelegramUser: (telegramUser: TelegramUser) => void;
  setPocketDetails: (pocketDetails: ContractPocket | null) => void;
  setAppUser: (appUser: AppUser) => void;
  setUserChecked: (userChecked: boolean) => void;
  setTipWallet: (wallet: UserWallet) => void;
};

const useAppState = create<AppState>()((set) => ({
  telegramUser: undefined,
  appUser: undefined,
  userChecked: false,
  pocketDetails: undefined,
  pocketChecked: false,

  setTelegramUser: (telegramUser: TelegramUser) =>
    set(() => ({ telegramUser })),
  setAppUser: (appUser: AppUser) => set(() => ({ appUser })),
  setUserChecked: (userChecked: boolean) => set(() => ({ userChecked })),
  setPocketChecked: (pocketChecked: boolean) => set(() => ({ pocketChecked })),
  setPocketDetails: (pocketDetails: ContractPocket | null) =>
    set(() => ({ pocketDetails })),
  setTipWallet: (tipWallet: UserWallet) => set(() => ({ tipWallet })),
}));

export default useAppState;
