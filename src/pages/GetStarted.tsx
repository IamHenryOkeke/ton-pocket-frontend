import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useNavigate } from "react-router-dom";
import { useTelegramUser } from "../hooks/useTelegramUser";
import { useEffect } from "react";
import { API_ROUTES, customAxios } from "../routes/apiRoutes";
import { mockGetUserPocket } from "../mock/contractCalls/mockPocketsContract";
import Swal from "sweetalert2";
import useAppState from "../hooks/useAppState";

export default function GetStarted() {
  const user = useTelegramUser();
  const navigate = useNavigate();
  const [tonConnectUI] = useTonConnectUI();
  const connectedAddress = useTonAddress();

  const pocketDetails = useAppState((state) => state.pocketDetails);
  const setPocketDetails = useAppState((state) => state.setPocketDetails);
  const userChecked = useAppState((state) => state.userChecked);
  const pocketChecked = useAppState((state) => state.pocketChecked);

  const appUser = useAppState((state) => state.appUser);
  const setAppUser = useAppState((state) => state.setAppUser);
  const setPocketChecked = useAppState((state) => state.setPocketChecked);

  // Todo: Remove this mock function.
  // Step1: Get pocket details from smart contract when wallet gets connected.
  useEffect(() => {
    if (connectedAddress && userChecked && !pocketChecked)
      (async () => {
        const details = await mockGetUserPocket(
          connectedAddress,
          appUser ? false : true
        );

        setPocketDetails(details);
        console.log("Pocket Checked called");
        setPocketChecked(true);
      })();
  }, [
    appUser,
    connectedAddress,
    pocketChecked,
    setPocketChecked,
    setPocketDetails,
    userChecked,
  ]);

  // Todo: Figure out what wallet balance shows. This field is optional on the backend.
  // Step2: Update user on backend with latest details.
  useEffect(() => {
    if (pocketChecked)
      if (appUser) {
        // If appUser: then we update the user accordingly
        (async () => {
          try {
            console.table({
              username: appUser.username,
              phoneNumber: appUser?.phoneNumber,
              connectedAddress,
              pocketUniqueId: pocketDetails?.unique_id,
              pocketBalance: pocketDetails?.balance,
            });

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

            setAppUser(data.data);
            navigate("/app/home");
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

            setAppUser(data);
            navigate("/app/home");
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
  }, [
    appUser,
    connectedAddress,
    navigate,
    pocketChecked,
    pocketDetails?.balance,
    pocketDetails?.unique_id,
    setAppUser,
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
