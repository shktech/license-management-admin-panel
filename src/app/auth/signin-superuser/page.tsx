"use client";

import FormControlWrapper from "@components/Forms/FormControlWrapper";
import useStore from "@hooks/globalStore";
import { Button } from "@mui/base";
import { useForm } from "@refinedev/react-hook-form";
import { useGetIdentity, useNavigation } from "@refinedev/core";
import Dropdown from "@components/Input/Dropdown";
import { Organization, User } from "@/types/types";
import { useState } from "react";
import Loader from "@components/common/Loader";
import Link from "next/link";
import EmailIcon from "@/assets/icons/email.svg?icon";
import GeneralInput from "@components/Input/GeneralInput";
import PasswordIcon from "@/assets/icons/password.svg?icon";
import { LoginResponse } from "@providers/auth-provider";

const Page: React.FC = () => {
  const { push } = useNavigation();
  const realAPI_URL = "http://localhost:8000/api";
  const API_URL = process.env.API_URL;

  const [loading, setLoading] = useState(false);
  const { data: identity, isLoading } = useGetIdentity<User>();
  if (identity) {
    push("/dashboard");
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const loginForm = data as FormData;
    const response = await fetch(`${API_URL ?? realAPI_URL}/admin-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    });
    if (response.ok) {
      const data: LoginResponse = await response.json();
      localStorage.setItem("tempToken", data.temp_access);
      useStore.getState().setOrganizations(data.organizations);
      if (data.organizations.length == 1) {
        const response = await fetch(`${API_URL ?? realAPI_URL}/authenticate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tempToken")}`,
          },
          body: JSON.stringify({
            organization: data.organizations[0].organization_code,
          }),
        });
        if (response.ok) {
          const data: any = await response.json();
          localStorage.setItem("accessToken", data.access);
          localStorage.setItem("refreshToken", data.refresh);
          push("/dashboard");
          return;
        }
      }
      push("/auth/organization");
    }
  };

  return (
    <>
      <div className="bg-[#f7f9fa] flex justify-center items-center min-h-screen py-10">
        {isLoading || loading ? (
          <Loader />
        ) : (
          <div className="min-w-[480px] rounded-xl border border-stroke bg-white shadow-default">
            <div className="flex flex-wrap items-center">
              <div className="w-full border-stroke dark:border-strokedark">
                <div className="w-full p-8">
                  <div className="flex justify-between items-center mb-9">
                    <h2 className="text-2xl font-bold text-black">Sign in as super user</h2>
                    <Link
                      href={"/auth/signin"}
                      className="text-sm text-primary font-medium"
                    >
                      back
                    </Link>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-4">
                      <FormControlWrapper
                        name="username"
                        control={control}
                        rules={{
                          required: "Please enter your username!",
                        }}
                        error={errors.username?.message?.toString()}
                      >
                        {(field) => (
                          <GeneralInput
                            {...field}
                            type={"text"}
                            label="Username"
                            placeholder="Enter your username"
                            disabled={false}
                            required={true}
                            icon={<EmailIcon className="fill-current" />}
                          />
                        )}
                      </FormControlWrapper>
                      <FormControlWrapper
                        name="password"
                        control={control}
                        rules={{ required: "Please enter your password!" }}
                        error={errors.password?.message?.toString()}
                      >
                        {(field) => (
                          <GeneralInput
                            {...field}
                            type={"password"}
                            label="Password"
                            placeholder="Enter your password"
                            disabled={false}
                            required={true}
                            icon={<PasswordIcon className="fill-current" />}
                          />
                        )}
                      </FormControlWrapper>
                      <Button
                        type="submit"
                        className="text-center w-full block mb-5 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                      >
                        Sign in
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
