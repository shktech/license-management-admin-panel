"use client";

import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useRouter } from "next/navigation";
import FormControlWrapper from "@components/Forms/FormControlWrapper";
import GeneralInput from "@components/Input/GeneralInput";
import EmailIcon from "@/assets/icons/email.svg?icon";
import PasswordIcon from "@/assets/icons/password.svg?icon";
import { Button } from "@mui/base";
import { useCreate } from "@refinedev/core";

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate } = useCreate();

  const onSubmit = (data: any) => {
    const payload = {
      username: data.username,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      organization: {
        organization_code: data.organization_code,
        organization_name: data.organization_name,
      },
    };
    mutate(
      {
        resource: "register-admin/",
        values: payload,
      },
      {
        onSuccess: () => {
          router.push("auth/signin");
        },
        onError: () => {},
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <div className="min-w-[480px] rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full p-8">
              <div className="flex justify-between items-center mb-9">
                <h2 className="text-2xl font-bold text-black">Sign Up</h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row space-x-4">
                    <FormControlWrapper
                      name="first_name"
                      control={control}
                      rules={{ required: "Please enter your first name!" }}
                      error={errors.first_name?.message?.toString()}
                    >
                      {(field) => (
                        <GeneralInput
                          {...field}
                          type={"text"}
                          label="First name"
                          placeholder={"Enter your first name"}
                        />
                      )}
                    </FormControlWrapper>
                    <FormControlWrapper
                      name="last_name"
                      control={control}
                      rules={{ required: "Please enter your last name!" }}
                      error={errors.last_name?.message?.toString()}
                    >
                      {(field) => (
                        <GeneralInput
                          {...field}
                          type={"text"}
                          label="Last name"
                          placeholder={"Enter your last name"}
                        />
                      )}
                    </FormControlWrapper>
                  </div>
                  <FormControlWrapper
                    name="username"
                    control={control}
                    rules={{ required: "Please enter your username!" }}
                    error={errors.username?.message?.toString()}
                  >
                    {(field) => (
                      <GeneralInput
                        {...field}
                        type={"text"}
                        label="Username"
                        placeholder={"Enter your username"}
                      />
                    )}
                  </FormControlWrapper>
                  <FormControlWrapper
                    name="organization_name"
                    control={control}
                    rules={{ required: "Please enter organization name!" }}
                    error={errors.organization_name?.message?.toString()}
                  >
                    {(field) => (
                      <GeneralInput
                        {...field}
                        type={"text"}
                        label="Organization name"
                        placeholder={"Enter organization name"}
                      />
                    )}
                  </FormControlWrapper>
                  <FormControlWrapper
                    name="organization_code"
                    control={control}
                    rules={{ required: "Please enter organization code!" }}
                    error={errors.organization_code?.message?.toString()}
                  >
                    {(field) => (
                      <GeneralInput
                        {...field}
                        type={"text"}
                        label="Organization code"
                        placeholder={"Enter organization code"}
                      />
                    )}
                  </FormControlWrapper>
                  <FormControlWrapper
                    name="email"
                    control={control}
                    rules={{ required: "Please enter your email!" }}
                    error={errors.email?.message?.toString()}
                  >
                    {(field) => (
                      <GeneralInput
                        {...field}
                        type={"text"}
                        label="Email address"
                        placeholder={"Enter your email address"}
                        disabled={false}
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
                        icon={<PasswordIcon className="fill-current" />}
                      />
                    )}
                  </FormControlWrapper>
                  <Button
                    type="submit"
                    className="text-center w-full block mb-5 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
