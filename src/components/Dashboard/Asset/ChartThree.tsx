import { predefinedRanges } from "@data/UtilData";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useList } from "@refinedev/core";
import { ApexOptions } from "apexcharts";
import { subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import { DateRangePicker, Stack } from "rsuite";
interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#28a745", "#6c757d", "#dc3545"],
  labels: ["Active", "Expired", "Revoked"],
  legend: {
    show: true,
    position: "bottom",
    formatter: function (seriesName, opts) {
      const total = opts.w.globals.series.reduce((a: any, b: any) => a + b, 0);
      const value = opts.w.globals.series[opts.seriesIndex];
      const percentage = ((value / total) * 100).toFixed(0); // Calculate the percentage
      return `${seriesName}: ${percentage}%`; // Return the label with the percentage
    },
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [dateRange, setDateRange] = React.useState<[Date, Date]>([
    subDays(new Date(), 30), // Date 30 days ago
    new Date(), // Current date
  ]);
  const handleDateRangeChange = (value: any) => {
    setDateRange(value);
  };

  const { data, isLoading, refetch } = useList({
    resource: `assets/metrics/chart?start_date=${dateRange[0].toISOString().split("T")[0]}&end_date=${dateRange[1].toISOString().split("T")[0]}`,
    hasPagination: false,
  });

  useEffect(() => {
    const tempData = data?.data as any;
    if (tempData?.data) {
      setSeries([
        tempData?.data[0].count,
        tempData?.data[1].count,
        tempData?.data[3].count,
      ]);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [dateRange]);

  return (
    <div className="flex flex-col col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Analytics
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <DateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
              ranges={predefinedRanges}
              placeholder="Select the Date Range"
              style={{ width: 300 }}
            />
          </div>
        </div>
      </div>

      <div className="mb-2 flex-1 flex items-center justify-center">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
