import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { TonConnectUIProvider } from '@tonconnect/ui-react';

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import CreatePocket from "./pages/CreatePocket";
import PreviewPocket from "./pages/PreviewPocket";
import StartupScreen from "./pages/StartupScreen";
import GetStarted from "./pages/GetStarted";
import Welcome from "./pages/Welcome";
import AssetSwap from "./pages/AssetSwap";
import PreviewTipDetails from "./pages/PreviewTipDetails";
import TipHome from "./pages/TipHome";
import SendTip from "./pages/SendTip";
import Deposit from "./pages/Deposit";
import { MoonPayProvider } from "@moonpay/moonpay-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartupScreen />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "asset-swap",
        element: <AssetSwap />,
      },
      {
        path: "deposit",
        element: <Deposit />,
      },
      {
        path: "pocket",
        children: [
          {
            path: "create",
            element: <CreatePocket />,
          },
          {
            path: "preview",
            element: <PreviewPocket />,
          },
          {
            path: "tip",
            children: [
              {
                path: "",
                element: <TipHome />,
              },
              {
                path: ":userName",
                element: <PreviewTipDetails />
              },
              {
                path: ":userName/send-tip",
                element: <SendTip />
              }
            ]
          },
        ]
      }
    ]
  },
]);

export default function App() {
  return (
    <div className="font-inter">
      <TonConnectUIProvider
        manifestUrl={`${process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://ton-pocket-frontend.vercel.app/"}tonconnect-manifest.json`}
        actionsConfiguration={{
          twaReturnUrl: `${process.env.NODE_ENV === "development" ? "http://localhost:3000/app/home" : "https://ton-pocket-frontend.vercel.app/app/home"}`
        }}
      >
        <MoonPayProvider
          apiKey="pk_test_Z8IxrCcFiYAEv45mZEj1h8DkLonTTFs"
          debug
        >
          <RouterProvider router={router} />
        </MoonPayProvider>
      </TonConnectUIProvider>
    </div>
  )
}
