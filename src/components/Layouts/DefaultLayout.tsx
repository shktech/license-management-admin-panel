"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { IconButton } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import {
  Authenticated,
  useGetIdentity,
  useIsAuthenticated,
} from "@refinedev/core";
import { usePathname } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const pathname = usePathname();
  const pageTitle = pathname.split("/")[2];

  const { refetch } = useIsAuthenticated();
  useEffect(() => {
    console.log(pathname, pageTitle);
    if (pageTitle) {
      refetch();
    }
  }, [pageTitle]);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex flex-1 flex-col lg:ml-72 overflow-y-auto overflow-x-hidden`}
      >
        <main>
          <div className="absolute top-0.5 left-0.5">
            <IconButton sx={{ color: "#1f325c" }} onClick={handleOpenSidebar}>
              <DoubleArrowIcon />
            </IconButton>
          </div>
          <div className="mx-auto pt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
