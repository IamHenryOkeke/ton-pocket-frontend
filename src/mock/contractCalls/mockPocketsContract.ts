export async function mockGetUserPocket(address: string, newUser?: boolean) {
  console.log(address);
  if (newUser) return null;
  return {
    unique_id: "",
    balance: 1200,
  };
}
