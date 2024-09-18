import React from "react";

interface StateComponentProps {
  active: boolean;
  withLabel?: boolean;
}

const StateComponent: React.FC<StateComponentProps> = ({
  active,
  withLabel = false,
}) => {
  if (withLabel) {
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${active ? "bg-[#11ba82]" : "bg-[#929ea8]"} text-white`}
      >{
        active ? "Active" : "Inactive"
      }</span>
    );
  }
  return (
    <div
      className={`rounded-full h-4 w-4 ${active ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
    ></div>
  );
};

export default StateComponent;
