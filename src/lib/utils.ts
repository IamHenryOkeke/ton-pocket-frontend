import { UserWallet } from "./types";

export function findConnectedWallet(wallets: UserWallet[]) {
  for (let index = 0; index < wallets.length; index++) {
    const wallet = wallets[index];
    if (wallet.connected) return wallet;
  }
}
