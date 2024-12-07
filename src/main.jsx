import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Layout from "./layout.jsx";
import Home from "../src/Home/Home.jsx";
// import UserBlog from "./Pages/UserBlog.jsx";
import Signup from "./Home/Signup/Signup.jsx";
import Login from "./Home/Login/Login.jsx";
// import AddBlog from "./Pages/AddBlog.jsx";

// import Profile from "./Pages/Profile.jsx";
// import Input from "./Pages/input.jsx";
import "./index.css";
// import SingleBlog from "./Pages/singleBlog.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "addblog",
      //   element: <AddBlog />,
      // },
      // {
      //   path: "userblog",
      //   element: <UserBlog />,
      // },
      // {
      //   path: "profile",
      //   element: <Profile />,
      // },
    ],
  },
  // {
  //   path: "singleblog/:id",
  //   element: <SingleBlog />,
  // },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  // {
  //   path: "input",
  //   element: <Input />,
  // },

  {
    path: "*",
    element: "NOT FOUND!",
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <Outlet />
  </RouterProvider>
);
