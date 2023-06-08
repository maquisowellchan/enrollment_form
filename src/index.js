import React from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Subjects from "./components/subjects/subjects";
import Students from "./components/students/students";
import Instructor from "./components/instructor/instructor";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  {
    path: "subjects",
    element: <Subjects />
  },
  {
    path: "students",
    element: <Students />
  },
  {
    path: "instructor",
    element: <Instructor />
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
