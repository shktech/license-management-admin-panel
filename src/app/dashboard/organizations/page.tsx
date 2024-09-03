"use client";
import { User } from "@/types/types";
import MemeberPanel from "@components/Organizations/MemeberPanel";
import OrganizationComponent from "@components/Organizations/OrganizationComponent";
import RolePanel from "@components/Organizations/RolePanel";
import APIKeyPanel from "@components/Profile/APIKeyPanel";
import { useGetIdentity, useList } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect, useState } from "react";

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
      value: <MemeberPanel />,
    },
  ];

  return (
    <div className="flex flex-col">
      <OrganizationComponent />
      <div className="flex flex-1 gap-8 px-8 py-10">
        <div className="min-w-72">
          <div className="bg-white rounded-lg px-3 gap-3 flex flex-col py-3 shadow-card">
            {panels.map((panel, i) => (
              <div
                onClick={() => setPage(i)}
                className={`px-2 py-2 cursor-pointer transition duration-500 ${
                  page === i ? "font-bold bg-slate-100 text-[#1f325c]" : "hover:bg-slate-100"
                }`}
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
