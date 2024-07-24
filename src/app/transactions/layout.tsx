import React from "react";
import DefaultLayout from "@components/Layouts/DefaultLayout";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <DefaultLayout>
      {children}
    </DefaultLayout>
  );
}
