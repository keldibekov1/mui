import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Contact = lazy(() => import("./contact/Contact"));
const Signin = lazy(() => import("./signin/Signin"));


const MainRouters = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
         { path: "/signin", element: <Signin /> },
      ],
    },
  ]);
};

export default MainRouters;