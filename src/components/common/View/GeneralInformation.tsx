import React from "react";
import { Box, Divider, Grid } from "@mui/material";

interface GeneralInformationCardProps {
  header?: string;
  headerIcon?: React.ReactNode;
  singleColumn?: boolean;
  className?: string;
  items: { label: string; value: React.ReactNode | string | number | boolean | undefined }[];
}

const GeneralInformation: React.FC<GeneralInformationCardProps> = ({
  header,
  headerIcon,
  items,
}) => {
  const halfItems = Math.ceil(items.length / 2);
  const firstHalfItems = items.slice(0, halfItems);
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
      <div className="grid grid-cols-2">
        {firstHalfItems.map((item, index) => (
          <>
            <div key={index} className={`grid grid-cols-2 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}>
              <div className="text-base font-medium text-[#666f75] col-span-1">{item.label}</div>
              <div className="text-base">{item.value || ""}</div>
            </div>
            <div key={index + halfItems} className={`grid grid-cols-2 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}>
              <div className="text-base font-medium text-[#666f75] col-span-1">{items[index + halfItems]?.label}</div>
              <div className="text-base">{items[index + halfItems]?.value || ""}</div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default GeneralInformation;