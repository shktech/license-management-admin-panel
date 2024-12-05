"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
interface EachCardProps {
  value: string;
  title: string;
  icon: React.ReactNode;
  percentage?: number;
  iconBgColor?: string;
  iconColor?: string;
}
const EachCard: React.FC<EachCardProps> = ({
  title,
  value,
  icon,
  percentage,
  iconBgColor,
  iconColor,
}) => {
  console.log(percentage);
  const percentatgeStateIcon =
    percentage !== undefined && percentage < 0 ? (
      <ArrowDownwardOutlinedIcon />
    ) : (
      <ArrowUpwardOutlinedIcon />
    );
  return (
    <div className="bg-white shadow-default rounded-lg py-4 px-6">
      <div className="flex items-center justify-between">
        <div
          className={`text-3xl rounded-lg h-10 w-10 flex items-center justify-center`}
          style={{ backgroundColor: iconBgColor, color: iconColor }}
        >
          {icon}
        </div>
        <div className="text-base text-[#1f325c] font-semibold">{title}</div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <div>
          {percentage !== undefined && (
            <div className="flex flex-col items-start">
              <div
                className={`text-sm ${percentage >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {percentage == 0 ? "No change" : `${percentage} %`}
                {percentage !== 0 && percentatgeStateIcon}
              </div>
              <div className="text-sm text-[#666666]">Last 3 month</div>
            </div>
          )}
        </div>
        <div className="text-4xl font-semibold text-[#1f325c]">
          {value}
        </div>
      </div>
    </div>
  );
};

export default EachCard;
