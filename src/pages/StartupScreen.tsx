import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTelegramUser } from "../hooks/useTelegramUser";
import { API_ROUTES, customAxios } from "../routes/apiRoutes";
import Swal from "sweetalert2";
import useAppState, { AppState } from "../hooks/useAppState";
import { findConnectedWallet } from "../lib/utils";

export default function StartupScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const userAddress = useTonAddress();
  const user = useTelegramUser();
  const navigate = useNavigate();

  const setAppUser = useAppState((state) => (state as AppState).setAppUser);
  const userChecked = useAppState((state) => (state as AppState).userChecked);
  const setUserChecked = useAppState(
    (state) => (state as AppState).setUserChecked
  );
  const appUser = useAppState((state) => (state as AppState).appUser);

  // Check backend for user details
  useEffect(() => {
    // Get User Details on the backend
    if (user?.id)
      (async () => {
        try {
          const { data } = await customAxios().get(
            API_ROUTES.user.get + user.id
          );

          setAppUser(data.data);
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
  }, [setAppUser, setUserChecked, user?.id]);

  useEffect(() => {
    if (userChecked) {
      const timer = setTimeout(() => setIsLoading(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [userChecked]);

  useEffect(() => {
    if (!isLoading) {
      if (appUser && appUser?.Wallets) {
        const connectedWallet = findConnectedWallet(appUser.Wallets);
        if (userAddress && userAddress === connectedWallet?.address) {
          navigate("/app/home");
          return;
        }

        navigate("/get-started");
        return;
      }
      navigate("/welcome");
    }
  }, [appUser, isLoading, navigate, userAddress]);

  return (
    <main>
      <div className="h-screen flex items-center flex-col justify-center text-center bg-gradient-to-r from-[#4c6ef5] to-[#b3e5fc]">
        <img src="/Logo.svg" alt="Logo" />
      </div>
      <div className="mt-6">
        <div className="loader w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </main>
  );
}
