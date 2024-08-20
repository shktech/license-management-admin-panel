"use client";
import { Permission, User } from "@/types/types";
import ProfileForm from "@components/Forms/Profile/ProfileForm";
import PermissionsTable from "@components/Role/PermissionsTable";
import { RoleColors } from "@data/ColorData";
import { useGetIdentity, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import APIKeyPanel from "@components/Profile/APIKeyPanel";

const Page = () => {
  const { data: identity } = useGetIdentity<User>();
  const { data: apiData, refetch, isLoading } = useList({
    resource: "orgs/key/api-key",
    hasPagination: false
  });
  const [page, setPage] = useState(0);


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
        <APIKeyPanel />
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
