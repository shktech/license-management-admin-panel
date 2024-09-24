import React from "react";
import { Divider } from "@mui/material";

interface GeneralInformationCardProps {
  header?: string;
  headerIcon?: React.ReactNode;
  singleColumn?: boolean;
  className?: string;
  items: {
    label: string;
    value: React.ReactNode | string | number | boolean | undefined;
  }[];
}

const GeneralInformation: React.FC<GeneralInformationCardProps> = ({
  header,
  headerIcon,
  items,
}) => {
  const halfItems = Math.ceil(items.length / 2);
  const firstHalfItems = items.slice(0, halfItems);
  return (
    <div className="bg-white shadow-sm flex-1">
      {header ? (
        <Divider
          sx={{
            fontSize: "1.25rem",
            pb: "1.5rem",
            fontWeight: "bold",
            color: "#65758c",
          }}
        >
          <div className="flex items-center gap-2">
            {headerIcon} {header}
          </div>
        </Divider>
      ) : null}
      <div>
        {firstHalfItems.map((item, index) => (
          <div className="grid grid-cols-2" key={index}>
            <div
              className={`grid grid-cols-5 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}
            >
              <div className="col-span-2 text-base font-semibold text-[#666f75]">
                {item.label}
              </div>
              <div className="col-span-3 text-base  text-[#666f75]">
                {item.value || ""}
              </div>
            </div>
            <div
              className={`grid grid-cols-5 gap-2 px-12 py-3 items-center border-b border-[#d5dce3]`}
            >
              <div className="col-span-2 text-base font-semibold text-[#666f75] col-span-1">
                {items[index + halfItems]?.label}
              </div>
              <div className="col-span-3 text-base text-[#666f75]">
                {items[index + halfItems]?.value || ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInformation;
