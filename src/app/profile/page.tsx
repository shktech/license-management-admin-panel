"use client";
import { Permission, User } from "@/types/types";
import ProfileForm from "@components/Forms/Profile/ProfileForm";
import PermissionsTable from "@components/Role/PermissionsTable";
import { RoleColors } from "@data/ColorData";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Page = () => {
  const { data: identity } = useGetIdentity<User>();
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

  return (
    <div className="">
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
      <div className="flex gap-8 px-8 pb-8">
        <div className="flex-1">
          <div className="p-6 border-[#1f325c] border-t-4 shadow-lg rounded-lg bg-white">
            <div className="text-xl font-semibold pb-4">User Information</div>
            <ProfileForm
              {...{ control, errors, trigger }}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="p-6 border-[#1f325c] border-t-4 shadow-lg rounded-lg bg-white">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
