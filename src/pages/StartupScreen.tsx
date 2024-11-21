import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartupScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const userAddress = useTonAddress();

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) {
    if (userAddress) {
      navigate("/app/home");
      return
    }
    navigate("/welcome")
  }

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
};

