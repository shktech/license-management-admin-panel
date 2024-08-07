import React from "react";
import { Box, Divider, Grid } from "@mui/material";

interface GeneralInformationCardProps {
  header?: string;
  headerIcon?: React.ReactNode;
  singleColumn?: boolean;
  className?: string;
  items: { label: string; value: React.ReactNode | string | number | boolean | undefined }[];
}

const GeneralInformationCard: React.FC<GeneralInformationCardProps> = ({
  header,
  headerIcon,
  items,
}) => {
  return (
    <div className='bg-white shadow-sm flex-1'>
      {
        header ?
          <Divider sx={{ fontSize: '1.25rem', pb: '1.5rem', fontWeight: 'bold', color: '#65758c' }}>
            <div className="flex items-center gap-2">
              {headerIcon} {header}
            </div>
          </Divider> : null
      }
      <div className="">
        {items.map((item, index) => (
          <div className={`flex gap-2 px-12 py-3 items-center ${items.length != index + 1 ? 'border-b border-[#d5dce3]' : ''}`}>
            <div className="text-base font-medium text-[#666f75] min-w-96">{item.label}</div>
            <div className="text-base">{item.value || ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInformationCard;