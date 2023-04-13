import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
