"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { IconButton } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Authenticated, useIsAuthenticated } from "@refinedev/core";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const pageName = pathname.split("/")[2];

  const { refetch } = useIsAuthenticated();

  useEffect(() => {
    console.log(pageName);
    refetch();
  }, [pageName]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex flex-1 flex-col lg:ml-64 overflow-y-auto overflow-x-hidden`}
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
