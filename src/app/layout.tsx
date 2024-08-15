import { Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react"
import { dataProvider } from "@providers/data-provider";
import { authProvider } from "@providers/auth-provider";
import { dashboardResources } from "../data/refineResources";

// Tailwind and TailAdmin Styles
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/satoshi.css";
import "@/styles/style.css";
import { StyledEngineProvider } from '@mui/material/styles';

import { useNotificationProvider, RefineSnackbarProvider } from "@refinedev/mui";

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

  return (
    <html lang="en">
      <body className={defaultMode === "dark" ? "dark" : ""} suppressHydrationWarning={true}>
        <StyledEngineProvider injectFirst>
          <Suspense>
            <RefineKbarProvider>
              <RefineSnackbarProvider>
                {/* <ColorModeContextProvider defaultMode={defaultMode}> */}
                <Refine
                  routerProvider={routerProvider}
                  dataProvider={dataProvider}
                  authProvider={authProvider}
                  resources={dashboardResources}
                  notificationProvider={useNotificationProvider}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "yQDllt-kCjnj9-HEZp4G",
                  }}
                >
                  {children}
                </Refine>
              </RefineSnackbarProvider>
            </RefineKbarProvider>
          </Suspense>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
