import React from "react";

interface StateComponentProps {
  active: boolean;
  withLabel?: boolean;
  type?: string;
}

const StateComponent: React.FC<StateComponentProps> = ({
  active,
  withLabel = false,
  type,
}) => {
  // if (withLabel) {
  //   return (
  //     <span
  //       className={`px-2 py-1 text-xs font-semibold rounded-full ${active ? "bg-[#11ba82]" : "bg-[#929ea8]"} text-white`}
  //     >
  //       {active ? "Active" : "Inactive"}
  //     </span>
  //   );
  // }
  const yesLabel = type == "YES" ? "Yes" : "Active";
  const noLabel = type == "YES" ? "No" : "Inactive";
  return (
    <span
      className={`rounded-full px-3 text-white py-1 text-xs font-semibold ${active ? "bg-[#11ba82]" : "bg-[#929ea8]"}`}
    >
      {active ? yesLabel : noLabel}
    </span>
  );
};

export default StateComponent;
