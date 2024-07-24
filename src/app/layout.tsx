import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
// import React, { Suspense, useEffect, useState } from "react";
import { Suspense } from "react"
// import "./global.css";

// import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";
import { authProvider } from "@providers/auth-provider";
import { dashboardResources } from "../data/refineResources";

// Tailwind and TailAdmin Styles
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/satoshi.css";
import "@/styles/style.css";
// import "../styles/globals.css"; // Tailwind CSS
import { StyledEngineProvider } from '@mui/material/styles';

import Loader from "@/components/common/Loader";

export const metadata: Metadata = {
  title: "License Manager",
  description: "Admin Dashboard to manage your license keys",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en">
      <body className={defaultMode === "dark" ? "dark" : ""} suppressHydrationWarning={true}>
        <StyledEngineProvider injectFirst>
          <Suspense>
            <RefineKbarProvider>
              {/* <ColorModeContextProvider defaultMode={defaultMode}> */}
              <Refine
                routerProvider={routerProvider}
                dataProvider={dataProvider}
                authProvider={authProvider}
                resources={dashboardResources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "yQDllt-kCjnj9-HEZp4G",
                }}
              >
                {children}
                {/* <div className="dark:bg-boxdark-2 dark:text-bodydark">
                  {loading ? <Loader /> : children}
                </div> */}
              </Refine>
              {/* </ColorModeContextProvider> */}
            </RefineKbarProvider>
          </Suspense>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
