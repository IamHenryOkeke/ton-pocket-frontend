export type TelegramUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username: string;
  photo_url: string;
};

export type AppUser = {
  telegramUserId: number;
  username: string;
  phoneNumber?: string;
  id: number;
  registrationDate: Date;
  Wallets?: UserWallet[];
};

export type TipPocket = {
  id: string;
  unique_id: string;
  name: string;
  description?: string;
  walletId?: number;
  balance: number;
  isActive: boolean;
  Wallet?: UserWallet;
};

export type UserWallet = {
  id: number;
  userId: number;
  address: string;
  balance: string | null;
  connected: boolean;
  Goal?: UserGoal[];
  user?: AppUser;
  TipPocket?: TipPocket;
};

export type UserGoal = {
  id: string;
  unique_id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  recurringAmount: number;
  intervals: number;
  image_url?: string;
  CreatorId: number;
  createdAt: Date;
  endDate: Date;
  type: string;
  status: string;
  isActive: boolean;
  walletId: number;
  Wallet?: UserWallet;
  Creator?: AppUser;
};

export type ContractPocket = {
  unique_id: string;
  balance: number;
};
