import { ContractPocket } from "../../lib/types";

export async function mockGetUserPocket(
  address: string,
  newUser?: boolean
): Promise<ContractPocket | null> {
  console.log(address);
  if (newUser) return null;
  return {
    unique_id: "jodoe_pocket",
    balance: 1200,
  };
}
