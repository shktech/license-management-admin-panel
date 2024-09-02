"use client";
import { Permission, User } from "@/types/types";
import ProfileForm from "@components/Forms/Profile/ProfileForm";
import PermissionsTable from "@components/Role/PermissionsTable";
import { RoleColors } from "@data/ColorData";
import { useGetIdentity, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";
import APIKeyPanel from "@components/Profile/APIKeyPanel";
import RolePanel from "@components/Organizations/RolePanel";

const Page = () => {
  const { data: identity } = useGetIdentity<User>();
  const {
    data: apiData,
    refetch,
    isLoading,
  } = useList({
    resource: "orgs/key/api-key",
    hasPagination: false,
  });
  const [page, setPage] = useState(0);

  const {
    control,
    trigger,
    reset,
    formState: { errors },
    watch,
  } = useForm<User>();

  useEffect(() => {
    reset(identity);
  }, [identity]);

  const panels = [
    {
      label: "Roles and Permissions",
      value: <RolePanel />,
    },
    {
      label: "Personal API Key",
      value: <APIKeyPanel />,
    },
    {
      label: "Notifications",
      value: <></>,
    },
    {
      label: "Memebers",
      value: <></>,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-12 py-10 !font-satoshi text-2xl font-semibold text-[#1f325c] flex items-center gap-2">
        Organization
      </div>

      <div className="flex flex-1 gap-8 px-8">
        <div className="min-w-72">
          <div className="bg-white rounded-lg px-3 gap-3 flex flex-col py-3 shadow-card">
            {panels.map((panel, i) => (
              <div
                onClick={() => setPage(i)}
                className={`px-2 py-2 border-b-2 hover:border-[#1f325c] cursor-pointer font-medium duration-500 ${page != i ? "border-transparent" : "border-[#1f325c]"}`}
              >
                {panel.label}
              </div>
            ))}
          </div>
        </div>
        <div className="py-4 flex-1 bg-white rounded-xl shadow-card">
          {panels[page].value}
        </div>
      </div>
    </div>
  );
};

export default Page;
