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
            resource: "notification-schedules",
            id: params?.id,
        },
    });
   

    return (
        <div className="flex justify-center py-6">
            <div className='w-2/3'>
                <Create
                    goBack={<button onClick={useBack()} className="inline-block p-2 rounded-xl border duration-500 border-transparent hover:border-black"> <ArrowIcon /></button>}
                    breadcrumb={false}
                    headerButtons={<></>}
                    title={
                        <div className="!font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center">
                            Create Notification Schedule
                        </div>
                    }
                    saveButtonProps={{ ...saveButtonProps, hidden: true }}
                    footerButtons={({ saveButtonProps }) => (
                        <SaveButton {...saveButtonProps} sx={sendEmailBtnStyle} />
                    )}
                    wrapperProps={{
                        className: "rounded-none bg-[#f2f6fa] shadow-none",
                    }}
                >
                    {formLoading ? (
                        <Loader />
                    ) : (
                        <NotificationSchedulesComponent expanded={true}      onSave={useBack()}/>
                    )}
                </Create>
            </div>
        </div>
    );
};

export default Item;