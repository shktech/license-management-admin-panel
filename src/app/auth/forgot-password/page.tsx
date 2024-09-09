"use client";

import React from "react";
import { useForgotPassword, useGetIdentity, useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import EmailIcon from "@/assets/icons/email.svg?icon";
import { Button } from "@mui/base";
import FormControlWrapper from "@components/Forms/FormControlWrapper";
import GeneralInput from "@components/Input/GeneralInput";
import { User } from "../../../types/types";
import { useNavigation } from "@refinedev/core";
import Loader from "@components/common/Loader";
import LoginInput from "@components/Input/LoginInput";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { push } = useNavigation();

  const { data: identity, isLoading } = useGetIdentity<User>();

  if (identity) {
    push("/dashboard");
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate: forgotPassword, isLoading: isLoadingForgotPasswordEmail } =
    useForgotPassword<any>();

  const onSubmit = (data: any) => {
    const values = {
      email: data.email,
    };

    forgotPassword(values);
  };

  return (
    <div className="bg-[#1f325c] flex justify-center items-center min-h-screen py-10">
      {isLoading || isLoadingForgotPasswordEmail ? (
        <Loader />
      ) : (
        <div className="min-w-[480px] border border-stroke bg-[#e8f0fe] shadow-default relative">
          <div className="flex flex-wrap items-center">
            <div className="w-full border-stroke dark:border-strokedark">
              <div className="w-full px-10 pt-8 pb-12">
                <div className="flex justify-between items-center mb-9">
                  <h2 className="text-2xl font-bold text-black">
                    Forgot password?
                  </h2>
                  <Link
                    href={"/auth/signin"}
                    className="text-sm text-[#416ac2] font-medium"
                  >
                    back
                  </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col space-y-4">
                    <FormControlWrapper
                      name="email"
                      control={control}
                      rules={{
                        required: "Please enter your email!",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Please enter a valid email address!",
                        },
                      }}
                      error={errors.email?.message?.toString()}
                    >
                      {(field) => (
                        <LoginInput
                          {...field}
                          type={"text"}
                          label="Email address"
                          placeholder="Enter your email"
                          required={true}
                          disabled={false}
                          icon={<EmailIcon className="fill-current" />}
                        />
                      )}
                    </FormControlWrapper>
                    <Button
                      type="submit"
                      className="tracking-widest absolute translate-y-1/2 bottom-0 left-10 right-10 text-center p-4 block cursor-pointer border border-primary bg-primary text-white transition"
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
