"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { IconButton } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Authenticated, useIsAuthenticated } from "@refinedev/core";
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
  const pageName = pathname.split("/")[2];

  const { data, isSuccess, isLoading, isError, refetch } = useIsAuthenticated();

  useEffect(() => {
    refetch();
  }, [pageName]);
  return (
    <Authenticated key="any" appendCurrentPathToQuery={false}>
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
    </Authenticated>
  );
}
