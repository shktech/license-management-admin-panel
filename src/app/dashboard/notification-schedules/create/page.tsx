"use client";

import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import { Email_Schedule } from "@/types/types";
import NotificationSchedulesComponent from "@components/Forms/Notification-schedule/NotficationScheduleForm";
import Loader from "@components/common/Loader";
import { sendEmailBtnStyle } from "@data/MuiStyles";
import { useBack, useParsed } from "@refinedev/core";
import { Create, SaveButton } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

const Item = () => {
  const { params } = useParsed();

  const {
    saveButtonProps,
    refineCore: { formLoading, queryResult },
    control,
    trigger,
    formState: { errors },
  } = useForm<Email_Schedule>({
    refineCoreProps: {
      action: "create",
      id: params?.id,
    },
  });

  return (
    <div className="flex justify-center py-6">
      <div className="w-2/3">
        <NotificationSchedulesComponent onSave={useBack()} />
      </div>
    </div>
  );
};

export default Item;
