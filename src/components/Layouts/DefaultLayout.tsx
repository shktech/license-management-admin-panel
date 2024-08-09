"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Breadcrumbs, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  }
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className={`flex flex-1 flex-col lg:ml-64 overflow-y-auto overflow-x-hidden`}>
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <main>
            {/* <div className="mx-auto max-w-screen-2xl px-10 py-10"> */}
            <div className="absolute top-0.5 left-0.5">
              <IconButton sx={{ color: '#1f325c'}} onClick={handleOpenSidebar}>
                <DoubleArrowIcon />
              </IconButton>
            </div>

            <div className="mx-auto">
              {children}
            </div>
          </main>
        </div >
      </div >
    </>
  );
}
