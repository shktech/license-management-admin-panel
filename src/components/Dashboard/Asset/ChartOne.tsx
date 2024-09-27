"use client";
import { ApexOptions } from "apexcharts";
import "./style.css";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DateRangePicker, Stack } from "rsuite";
import { predefinedStyle, predefinedRanges } from "@data/UtilData";
import { subDays } from "date-fns";
import { useList } from "@refinedev/core";
import Loader from "@components/common/Loader";
import {
  getDayStrings,
  getMonthStrings,
  getWeekStrings,
} from "@utils/utilFunctions";
// import DateRangePicker from "./DateRangePicker";

interface ChatOneProps {
  categories: string;
  dateRange: [Date, Date];
  setCategories: React.Dispatch<React.SetStateAction<string>>;
  setDateRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3c50e0", "#6c757d", "#e5537b"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3c50e0", "#6c757d", "#dc3545"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}
const ChartOne: React.FC<ChatOneProps> = ({
  categories,
  dateRange,
  setCategories,
  setDateRange,
}) => {
  const [series, setSeries] = useState<any[]>([]);
  const [maxNumber, setMaxNumber] = React.useState<number>(200);

  const [yAxis, setYAxis] = useState<string[]>();
  const handleDateRangeChange = (value: any) => {
    setDateRange(value);
  };

  useEffect(() => {
    switch (categories) {
      case "week":
        setYAxis(getWeekStrings(dateRange[0], dateRange[1]));
        break;
      case "month":
        setYAxis(getMonthStrings(dateRange[0], dateRange[1]));
        break;
      case "day":
        setYAxis(getDayStrings(dateRange[0], dateRange[1]));
        break;
    }
  }, [dateRange, categories]);

  const { data, isLoading, refetch } = useList<any>({
    resource: `assets/metrics/timegraph?start_date=${dateRange[0].toISOString().split("T")[0]}&end_date=${dateRange[1].toISOString().split("T")[0]}&category=${categories}`,
    hasPagination: false,
  });

  useEffect(() => {
    if (data) {
      const dateArray = data.data
        .filter(
          (item: any) =>
            item.status == "Active" ||
            item.status == "Expired" ||
            item.status == "Revoked"
        )
        .map((item: any) => ({ name: item.status, data: item.data }));
      setSeries(dateArray);
      setMaxNumber(
        Math.ceil(
          Math.max(...dateArray.map((item: any) => item.data).flat()) / 10
        ) * 10
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch();
  }, [dateRange, categories]);

  const categoryOptions = [
    {
      label: "Day",
      value: "day",
    },
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Month",
      value: "month",
    },
  ];
  return (
    <div className="col-span-12 rounded-sm bg-white px-5 pb-5 pt-7.5 sm:px-7.5 xl:col-span-8">
      <div id="chartOne" className="-ml-5">
        <ReactApexChart
          options={{
            ...options,
            xaxis: {
              type: "category",
              categories: yAxis,
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              title: {
                style: {
                  fontSize: "0px",
                },
              },
              min: 0,
              max: maxNumber,
            },
          }}
          series={series}
          type="area"
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ChartOne;
