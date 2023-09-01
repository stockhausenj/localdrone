import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Pilots, { loader as pilotsLoader } from "./routes/pilots";
import Missions from "./routes/missions";
import Login from "./routes/login";
import Index from "./routes/index";
import User from "./routes/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "pilots",
            element: <Pilots />,
          },
          {
            path: "missions",
            element: <Missions />,
          },
          {
            path: "user/:userId",
            element: <User />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
