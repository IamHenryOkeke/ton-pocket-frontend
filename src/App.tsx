import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import CreatePocket from "./pages/CreatePocket";
import PreviewPocket from "./pages/PreviewPocket";
import StartupScreen from "./pages/StartupScreen";
import GetStarted from "./pages/GetStarted";
import Welcome from "./pages/Welcome";
import AssetSwap from "./pages/AssetSwap";

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
        path: "tip",
        children: [
          {
            path: "create-pocket",
            element: <CreatePocket />,
          },
          {
            path: "preview-pocket",
            element: <PreviewPocket />,
          },
          {
            path: "gift",
            element: <>a friend</>
          }
        ]
      }
    ]
  },
]);

export default function App() {
  return (
    <div className="font-inter">
      <RouterProvider router={router} />
    </div>
  )
}
