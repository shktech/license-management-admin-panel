"use client";

import NotificationSchedulesComponent from "@components/Forms/Notification-schedule/NotficationScheduleForm";
import { useBack, useParsed } from "@refinedev/core";
const Item = () => {
  const { params } = useParsed();

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <NotificationSchedulesComponent onSave={useBack()} />
      </div>
    </div>
  );
};

export default Item;
