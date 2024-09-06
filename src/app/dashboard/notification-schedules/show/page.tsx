"use client";

import { Email_Schedule, Permission, schedule } from "@/types/types";
import ShowTransaction from "@components/Transactions/Show/ShowTransaction";
import Loader from "@components/common/Loader";
import { TxtActionColor, TxtStatusColor, TxtTypeColor } from "@data/ColorData";
import ArrowIcon from "@/assets/icons/arrow.svg?icon";
import {
  editRefineBtnStyle,
  refreshRefineBtnStyle,
  tagStyle,
} from "@data/MuiStyles";
import { Box } from "@mui/material";
import { useBack, useNavigation, usePermissions, useShow } from "@refinedev/core";
import { EditButton, RefreshButton, Show } from "@refinedev/mui";
import { useParsed } from "@refinedev/core";
import { CustomTabPanel, StyledTab, StyledTabs } from "@components/Tab/CustomizedTab";
import { useState } from "react";
import GeneralInformation from "@components/common/View/GeneralInformation";
import { getNestedValue } from "@utils/utilFunctions";

const Item = () => {
  const { params } = useParsed();
  const { queryResult } = useShow<Email_Schedule>({
    resource: "notification-schedules",
    id: params?.id,
  });
  const { data, isLoading } = queryResult;
  const { data: permissionsData } = usePermissions<Permission>({
    params: { codename: "notification-schedules" },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { push } = useNavigation();

  const schedule = data?.data;

  const getButtonProps = (editButtonProps: any, refreshButtonProps: any) => {
    return (
      <div className="flex gap-2 px-12">
        <EditButton {...editButtonProps} onClick={() => push(`/dashboard/notification-schedules/edit?id=${params?.id}`)} sx={editRefineBtnStyle} />
        <RefreshButton {...refreshButtonProps} sx={refreshRefineBtnStyle} />
      </div>
    );
  };


  const formatTime=(_date:any)=>{
    var date =  new Date(_date);
    return  date.getDate() + "-" +  (date.getMonth()+1) + "-" + date.getFullYear() + " " +date.getHours() + ":" +  date.getMinutes();
  } 
  return (
    <div className="no-padding-card">
      <Show
        goBack={null}
        isLoading={isLoading}
        breadcrumb={false}
        wrapperProps={{
          className: "rounded-none bg-[#f2f6fa] shadow-none pt-10 pb-2.5",
        }}
        title={
          <div className="!font-satoshi px-12">
            <div className="flex gap-4 items-center">
              <div className="text-2xl font-semibold text-[#1f325c] flex items-end gap-2">
              Notification Schedule
                {/* <div className="text-lg font-normal">{schedule?.email}</div> */}
              </div>
            </div>
          </div>
        }
        headerButtons={({ editButtonProps, refreshButtonProps }) =>
          getButtonProps(editButtonProps, refreshButtonProps)
        }
      >
        {isLoading ? <Loader /> :
          <>
            <div className="">
             
              <div className="px-12 pt-4">
        
                <GeneralInformation
                  singleColumn={true}
                  items={[
                    {
                      label: "Email Address",
                      value: schedule?.email,
                    },
                    {
                      label: "Subject",
                      value: schedule?.subject,
                    },
                    {
                      label: "Scheduled Time",
                      value: formatTime(schedule?.scheduled_time),
                    },
                    {
                      label: "Recurring ",
                      value: schedule?.recurring_task,
                    },
                    {
                      label: "Template",
                      value: schedule?.body,
                    },
                    
                    {
                      label: "Active",
                      value: <div className={`rounded-full h-4 w-4 ${schedule?.is_active ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
                    },
                    // {
                    //   label: "Eval Set Name",
                    //   value: schedule?.eval_set_name,
                    // },
                    // {
                    //   label: "License Source Set",
                    //   value: schedule?.license_source_set,
                    // },
                    // {
                    //   label: "New Set Name",
                    //   value: schedule?.new_set_name,
                    // },
                    // {
                    //   label: "Renewal Set Name",
                    //   value: schedule?.renewal_set_name,
                    // },
                    // {
                    //   label: "Source Name",
                    //   value: schedule?.source_name,
                    // },
                  ]}
                />
          
           </div>
            </div>
          </>
        }
      </Show>
    </div>
  );
};

export default Item;
