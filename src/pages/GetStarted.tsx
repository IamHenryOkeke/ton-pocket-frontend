import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
// import { useNavigate } from "react-router-dom";
import { useTelegramUser } from "../hooks/useTelegramUser";
import { useEffect, useState } from "react";
import { API_ROUTES, customAxios } from "../routes/apiRoutes";
import { AppUser, ContractPocket } from "../lib/types";
import { mockGetUserPocket } from "../mock/contractCalls/mockPocketsContract";
import Swal from "sweetalert2";

export default function GetStarted() {
  // const navigate = useNavigate();
  const user = useTelegramUser();
  const [appUser, setAppUser] = useState<AppUser | null>();
  const [userChecked, setUserChecked] = useState(false); // We use this to know when the backed has checked if a user exists.
  const [pocketChecked, setPocketChecked] = useState(false); // So we know when the smart contract has been called to retrieve user wallet.

  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress();
  const [pocketDetails, setPocketDetails] = useState<ContractPocket | null>();

  // Step 1: Check backend for user details
  useEffect(() => {
    // Get User Details on the backend
    if (user?.id)
      (async () => {
        try {
          const { data } = await customAxios().get(
            API_ROUTES.user.get + user.id
          );
          console.log(data);
          setAppUser(data);
          setUserChecked(true);
        } catch (error) {
          console.log(error);
          const errMsg =
            (error as any)?.response?.data?.error?.message ||
            (error as any)?.message ||
            "Something went wrong";

          if (errMsg === "User not found") {
            setUserChecked(true);
            return;
          }

          Swal.fire({
            icon: "error",
            text: errMsg,
          });
        }
      })();
  }, [user?.id]);

  // Todo: Remove this mock function.
  // Step2: Get pocket details from smart contract when wallet gets connected.
  useEffect(() => {
    if (connectedAddress && userChecked)
      (async () => {
        const details = await mockGetUserPocket(
          connectedAddress,
          appUser ? false : true
        );

        console.log(details);
        setPocketDetails(details);
        setPocketChecked(true);
      })();
  }, [appUser, connectedAddress, userChecked]);

  // Todo: Figure out what wallet balance shows. Field is optional on the backend.
  // Step3: Update user on backend with latest details.
  useEffect(() => {
    if (pocketChecked)
      if (appUser) {
        // If appUser: then we update the user accordingly
        (async () => {
          try {
            const { data } = await customAxios().post(
              API_ROUTES.user.update + appUser.telegramUserId,
              {
                username: appUser.username,
                phoneNumber: appUser?.phoneNumber,
                connectedAddress,
                pocketUniqueId: pocketDetails?.unique_id,
                pocketBalance: pocketDetails?.balance,
              }
            );
            console.log(data);
          } catch (error) {
            console.log(error);
            const errMsg =
              (error as any)?.response?.data?.error?.message ||
              (error as any)?.message ||
              "Something went wrong";

            Swal.fire({
              icon: "error",
              text: errMsg,
            });
          }
        })();
      } else {
        // If not appUser: then we register a new user.
        (async () => {
          try {
            const { data } = await customAxios().post(
              API_ROUTES.user.register,
              {
                telegramUserId: user?.id,
                username: user?.username,
                connectedAddress,
                pocketUniqueId: pocketDetails?.unique_id,
                pocketBalance: pocketDetails?.balance,
              }
            );
            console.log(data);
          } catch (error) {
            console.log(error);
            const errMsg =
              (error as any)?.response?.data?.error?.message ||
              (error as any)?.message ||
              "Something went wrong";

            Swal.fire({
              icon: "error",
              text: errMsg,
            });
          }
        })();
      }

    // on wallet connect navigate user to app/home
    // navigate("/app/home")
  }, [
    appUser,
    connectedAddress,
    pocketChecked,
    pocketDetails?.balance,
    pocketDetails?.unique_id,
    user?.id,
    user?.username,
  ]);

  return (
    <div className="px-4 py-10">
      <h1 className="text-2xl font-orbitron font-bold mb-5">
        Let's Get Started
      </h1>
      <div>
        <span className="font-semibold text-sm">Telegram Username:</span>
        <p className="w-full mt-1 p-2 border border-primaryDark/80 rounded">
          {user?.username || (
            <span className="text-opacity-10">Loading username....</span>
          )}
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => tonConnectUI.openModal()}
          className="mx-auto font-orbitron disabled:bg-opacity-65 disabled:cursor-not-allowed font-extrabold px-10 py-2.5 text-white rounded-md bg-primaryDark"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
