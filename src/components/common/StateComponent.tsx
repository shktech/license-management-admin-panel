import React from 'react';

interface StateComponentProps {
  active: boolean;
  withLabel?: boolean;
}


const StateComponent: React.FC<StateComponentProps> = ({ active, withLabel = false }) => {

  return (
    <div className={`rounded-full h-4 w-4 ${active ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
  );
};

export default StateComponent;
