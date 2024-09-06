"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Email_Schedule } from "@/types/types";
import NotificationSchedulesComponent from "@components/Forms/Notification-schedule/NotficationScheduleForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useOne, useParsed } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const Item = () => {
  const { params } = useParsed();

  const { data, isLoading, error } = useOne({
    resource: `schedule`,
    id: params?.id as string,
  });

  const notificationSchedule: Email_Schedule = data?.data as Email_Schedule;

  if (isLoading) return <Loader />;
  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <NotificationSchedulesComponent
          emailSchedule={notificationSchedule}
          onSave={useBack()}
        />
      </div>
    </div>
  );
};

export default Item;
