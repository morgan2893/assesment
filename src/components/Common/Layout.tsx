"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: any) => {
  const pathname = usePathname();

  const auth = pathname !== "/login" && pathname !== "/register";

  return (
    <div>
      {auth && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
