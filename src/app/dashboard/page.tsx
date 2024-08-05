"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "@components/Charts/ChartOne";
import ChartTwo from "@components/Charts/ChartTwo";
import HomeTransaction from "@components/Dashboard/HomeTransaction";
import { Authenticated } from "@refinedev/core";

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <Authenticated key="dashboard" appendCurrentPathToQuery={false}>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <HomeTransaction />
      </div>
    </Authenticated>
  );
};

export default HomePage;
