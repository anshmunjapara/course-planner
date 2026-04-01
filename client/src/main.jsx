import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { CoursePlannerPage } from "./pages/CoursePlannerPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "/planner",
    element: <CoursePlannerPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </StrictMode>,
);
