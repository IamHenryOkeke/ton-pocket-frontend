import { ContractPocket } from "../../lib/types";

export async function mockGetUserPocket(
  address: string,
  newUser?: boolean
): Promise<ContractPocket | null> {
  console.log(address);
  if (newUser) return null;

  const address_2 = "0QB-ysKQ6GKMqtcr93bM7UHAcDkId_N7aSPyjQ5oQo8OsO0k";
  return {
    unique_id: address_2 === address ? "jondoe_pocket_2" : "jodoe_pocket",
    balance: 1200,
  };
}
