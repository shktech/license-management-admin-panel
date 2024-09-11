"use client";

import { User } from "@/types/types";
import UserDetailPanel from "@components/Users/UserDetailPanel";
import Loader from "@components/common/Loader";
import { useParsed } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";

const Item = () => {
  const { params } = useParsed();
  const {
    refineCore: { formLoading, queryResult },
    reset,
    formState: { errors },
  } = useForm<User>({
    refineCoreProps: {
      action: "edit",
      resource: "users",
      id: params?.id,
    },
  });

  const user: User = queryResult?.data?.data as User;

  useEffect(() => {
    if (!formLoading && user) {
      reset({ ...user });
    }
  }, [formLoading, user]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-2/3">
        {formLoading ? (
          <Loader />
        ) : (
          <UserDetailPanel user={user} isShow={true} />
        )}
      </div>
    </div>
  );
};

export default Item;
