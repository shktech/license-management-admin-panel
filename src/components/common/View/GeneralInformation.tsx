import React from "react";
import { Grid } from "@mui/material";

interface GeneralInformationCardProps {
  header: string;
  headerIcon: React.ReactNode;
  singleColumn?: boolean;
  className?: string;
  items: { label: string; value: string | number | boolean | undefined }[];
}

const GeneralInformationCard: React.FC<GeneralInformationCardProps> = ({
  header,
  headerIcon,
  items,
  singleColumn,
  className,
}) => {
  return (
    <div className={`${className ? className : 'bg-white px-8 py-4'} rounded-xl shadow-sm`}>
      <div className="text-base font-bold text-black mt-1 mb-2 flex gap-2">
        <div className="bg-[#f5f8ff]">{headerIcon}</div>
        <div className="text-sm">{header}</div>
      </div>
      <Grid container spacing={1}>
        {items.map((item, index) => (
          <Grid item xs={singleColumn ? 12 : 6} key={index}>
            <div className="flex justify-between px-8 py-1">
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-sm">{item.value?.toString() || ""}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GeneralInformationCard;
