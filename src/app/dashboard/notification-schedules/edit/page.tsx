"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Email_Schedule } from "@/types/types";
import NotificationSchedulesComponent from "@components/Forms/Notification-schedule/NotficationScheduleForm";

import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useNavigation, useParsed } from "@refinedev/core";
import { Edit, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
  const { params } = useParsed();
  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Email_Schedule>({
    refineCoreProps: {
      action: "edit",
      resource: "notification-schedules",
      id: params?.id,
    },
  });
  const { push } = useNavigation();
  const schedule: Email_Schedule = queryResult?.data?.data as Email_Schedule;

  useEffect(() => {
    if (!formLoading && schedule) {
      // reset({ email_id: schedule?.email_template?.email_id, ...schedule });
    }
  }, [formLoading, schedule]);

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <Edit
          goBack={
            <button
              onClick={useBack()}
              className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"
            >
              {" "}
              <ArrowIcon />
            </button>
          }
          canDelete={false}
          title={
            <div className="!font-satoshi text-2xl font-semibold text-[#1f325c]">
              Edit Notification Schedule
              <div className="text-sm text-[#818f99]">
                {schedule?.email}
              </div>
            </div>
          }
          breadcrumb={false}
          headerButtons={<></>}
          wrapperProps={{
            className: "rounded-none bg-[#f2f6fa] shadow-none",
          }}
          saveButtonProps={{ ...saveButtonProps, hidden: true }}
          footerButtons={({ saveButtonProps }) => (
            <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
          )}
        >
          {formLoading ? (
            <Loader />
          ) : (
            <NotificationSchedulesComponent  {...{ control, errors, trigger }} template={schedule}  onSave={()=>{
              push('/dashboard/notification-schedules/')
            }} />
          )}
        </Edit>
      </div>
    </div>
  );
};

export default Item;
