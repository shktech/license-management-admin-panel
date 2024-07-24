"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import HomeTransaction from "./HomeTransaction";


const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const HomePage: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <HomeTransaction />
      </div>
    </>
  );
};

export default HomePage;
