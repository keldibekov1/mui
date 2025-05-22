import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();

  const hideFooter = pathname === "/search";

  return (
    <>
      <Navbar />
      <main className="min-h-[65vh]">
        <Outlet />
      </main>
     <Footer />
    </>
  );
};

export default Layout;