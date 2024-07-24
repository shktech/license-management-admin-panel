import React from 'react';
import { Drawer } from '@mui/material';

interface Group {
  title: string;
  fields: { label: string; value: string | number | boolean | undefined }[];
}

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  groups: Group[];
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({ open, onClose, groups }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="min-w-[500px] p-2 font-med">
        <div className="text-2xl text-black font-medium p-4 flex items-center gap-2">
          <svg fill="#4580ff" width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14H5v-2h6v2zm8-4H5v-2h14v2zm0-4H5V7h14v2z"></path></g></svg>
          Detail Information
        </div>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="px-4 py-2">
            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex} className="flex justify-between py-2 border-b border-slate-200 px-2">
                <div className="text-black font-medium">{field.label}</div>
                <div>{field.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default DetailDrawer;
