"use client";
import { APIKey, Permission, User } from "@/types/types";
import GeneralInformation from "@components/common/View/GeneralInformation";
import ProfileForm from "@components/Forms/Profile/ProfileForm";
import PermissionsTable from "@components/Role/PermissionsTable";
import { RoleColors } from "@data/ColorData";
import { useCreate, useCustom, useCustomMutation, useDelete, useGetIdentity, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { getReadableDate, truncateString } from "@utils/utilFunctions";
import { useEffect, useState } from "react";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { modalOkBtnStyle } from "@data/MuiStyles";

const Page = () => {
  const { data: identity } = useGetIdentity<User>();
  const { data: apiData, refetch, isLoading } = useList({
    resource: "orgs/key/api-key",
    hasPagination: false
  });
  const [page, setPage] = useState(0);

  const handleChangePage = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
  };

  const apiKey = apiData?.data as APIKey;

  const { mutate: createAPIKey } = useCreate();
  const { mutate: deleteAPIKey } = useCustomMutation();

  const handleGenerateBtn = () => {
    const handleError = (error: any) => {

    };
    createAPIKey(
      {
        resource: "orgs/key/api-key",
        values: {}
      },
      {
        onError: () => refetch(),
        onSuccess: () => refetch()
      }
    )
  }

  const handleDeleteKeyBtn = () => {
    const handleError = (error: any) => {

    };
    deleteAPIKey(
      {
        url: 'orgs/key/api-key',
        method: 'delete',
        values: {
          id: apiKey.id
        }
      },
      {
        onError: handleError,
        onSuccess: () => refetch(),
      }
    )
  }

  const handleCopyAPIKey = () => {
    navigator.clipboard.writeText(apiKey?.id as string);
  }
  const apiDataKeys = [
    {
      key: "id",
      label: "API Key ID",
      value: (
        <div className="flex items-center justify-center gap-4">
          <div className="truncated">{apiKey?.id}</div>
          <IconButton aria-label="copy" onClick={handleCopyAPIKey}>
            <ContentCopyOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      )
    },
    {
      key: "name",
      label: "Name",
      value: apiKey?.name
    },
    {
      key: "created",
      label: "Created at",
      value: getReadableDate(apiKey?.created)
    },
    {
      key: "revoked",
      label: "Revoked",
      value: <div className={`rounded-full h-4 w-4 ${apiKey?.revoked ? 'bg-[#11ba82]' : 'bg-[#929ea8]'}`}></div>
    }
  ]

  const {
    control,
    trigger,
    reset,
    formState: { errors },
    watch
  } = useForm<User>();

  useEffect(() => {
    reset(identity);
  }, [identity]);

  const panels = [
    {
      label: "General Information",
      value: (
        <>
          <div className="text-xl font-semibold pb-4">User Information</div>
          <ProfileForm
            {...{ control, errors, trigger }}
          />
        </>
      )
    },
    {
      label: "User Role",
      value: (
        <>
          <div className="text-xl font-semibold pb-8">
            User Role
            <span
              className={`${RoleColors[identity?.roles?.[0].name as string] || RoleColors["default"]} text-white mx-4 px-4 py-1 text-xs font-bold rounded-full`}
            >
              {identity?.roles?.[0].name}
            </span>
          </div>
          <PermissionsTable
            permissions={identity?.roles?.[0].permissions as Permission[]}
            readonly
          />
        </>
      )
    },
    {
      label: 'Personal API Key',
      value: (
        <>
          <div className="text-xl font-semibold pb-8 flex justify-between">
            Personal API Keys
            {
              apiData?.data ?
                <Button
                  variant="contained"
                  sx={modalOkBtnStyle}
                  onClick={handleDeleteKeyBtn}
                >
                  Delete
                </Button> :
                <Button
                  variant="contained"
                  sx={modalOkBtnStyle}
                  onClick={handleGenerateBtn}
                >
                  Generate Key
                </Button>
            }
          </div>
          <div className="pb-6">
            {
              apiData?.data ?
                apiDataKeys.map(adk => (
                  <div className="grid grid-cols-3 border-b border-[#d5dce3] py-1.5 px-8 items-center justify-center">
                    <div className="font-medium">{adk.label}</div>
                    <div className="col-span-2">{adk.value}</div>
                  </div>
                )) :
                <div className="flex items-center justify-center text-[#848fa7] text-lg font-medium">There is no API Key</div>
            }
          </div>
        </>
      )
    }
  ]

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 items-center px-12 py-8">
        <div className="text-white bg-[#1f325c] font-bold text-4xl w-20 h-20 flex items-center justify-center rounded-full">{`${identity?.first_name?.[0]} ${identity?.last_name?.[0]}`}</div>
        <div className="">
          <div className="text-2xl font-semibold">
            {`${identity?.first_name} ${identity?.last_name}`}
            <span className={`mx-2 px-4 py-1 rounded-full text-xs ${identity?.is_active ? "bg-[#11ba82] text-white" : "bg-[#c2c2c2] text-black"}`}>
              {identity?.is_active ? "Active" : "Deactive"}
            </span>
          </div>
          <div className="">{`Organization: ${identity?.organization}`}</div>
        </div>

      </div>

      <div className="flex flex-1 gap-8 px-8">
        <div className="min-w-72">
          <div className="bg-white rounded-lg px-3 gap-3 flex flex-col py-3">
            {
              panels.map((panel, i) => (
                <div onClick={() => setPage(i)} className={`px-2 py-2 border-b-2 hover:border-[#1f325c] cursor-pointer font-medium duration-500 ${page != i ? 'border-transparent' : 'border-[#1f325c]'}`}>{panel.label}</div>
              ))
            }
          </div>
        </div>
        <div className="px-8 py-4 flex-1 bg-white rounded-xl">
          {panels[page].value}
        </div>
      </div>

    </div>
  );
};

export default Page;