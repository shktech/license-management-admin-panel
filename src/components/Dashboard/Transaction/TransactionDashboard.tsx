"use client";
import React, { useMemo } from "react";
import ChartOne from "./ChartOne";
import dynamic from "next/dynamic";
const ChartThree = dynamic(() => import("./ChartThree"), {
  ssr: false,
});

const TransactionDashboard: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 px-8 py-8">
      <ChartOne />
      <ChartThree />
    </div>
  );
};

export default TransactionDashboard;