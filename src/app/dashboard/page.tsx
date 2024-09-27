"use client";
import AssetDashboard from "@components/Dashboard/Asset/AssetDashboard";
import TransactionDashboard from "@components/Dashboard/Transaction/TransactionDashboard";
import React, { useMemo } from "react";
const HomePage: React.FC = () => {
  return (
    <div className="">
      <AssetDashboard />
      <TransactionDashboard />
    </div>
  );
};

export default HomePage;