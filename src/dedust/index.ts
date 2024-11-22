import { Asset, Factory, MAINNET_FACTORY_ADDR, PoolType, ReadinessStatus } from '@dedust/sdk';
import { Address, toNano, TonClient4 } from "@ton/ton";
import { Sender } from '@ton/core';

const tonClient = new TonClient4({ endpoint: "https://mainnet-v4.tonhubapi.com" });
const factory = tonClient.open(Factory.createFromAddress(MAINNET_FACTORY_ADDR));
const tonVault = tonClient.open(await factory.getNativeVault());

const USDT_ADDRESS = Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs');
const TON = Asset.native();
const USDT = Asset.jetton(USDT_ADDRESS);


export const swapTonToUsdt = async (senderAddress: any, value: string) => {
  const pool = tonClient.open(await factory.getPool(PoolType.VOLATILE, [TON, USDT]));
  
  // Check if pool exists:
  if ((await pool.getReadinessStatus()) !== ReadinessStatus.READY) {
    throw new Error('Pool (TON, USDT) does not exist.');
  }
  
  // Check if vault exits:
  if ((await tonVault.getReadinessStatus()) !== ReadinessStatus.READY) {
    throw new Error('Vault (TON) does not exist.');
  }

  const amountIn = toNano(value);

  const res = await tonVault.sendSwap(senderAddress, {
    poolAddress: pool.address,
    amount: amountIn,
    gasAmount: toNano("0.25"),
  });

  return res;
}