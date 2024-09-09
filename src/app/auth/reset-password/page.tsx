"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Loader from "@components/common/Loader";
import FormControlWrapper from "@components/Forms/FormControlWrapper";
import LoginInput from "@components/Input/LoginInput";
import EmailIcon from "@/assets/icons/email.svg?icon";
import PasswordIcon from "@/assets/icons/password.svg?icon";
import { Button } from "@mui/base";
import { useRegister, useUpdatePassword } from "@refinedev/core";

interface DecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  uid: string;
  scope: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate: updatePassword } = useUpdatePassword<any>();
  const [token, setToken] = useState<string>("");
  const [userData, setUserData] = useState<DecodedToken>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const validateInviteToken = async (token: string): Promise<DecodedToken> => {
    try {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      console.log(decodedToken);
      if (
        !decodedToken.token_type ||
        !decodedToken.uid ||
        !decodedToken.user_id ||
        !decodedToken.scope ||
        !decodedToken.jti ||
        !decodedToken.exp ||
        !decodedToken.iat
      ) {
        return Promise.reject(
          new Error("Invalid token: Missing required fields")
        );
      }
      const currentTime = Date.now() / 1000;
      if (decodedToken?.exp && decodedToken?.exp < currentTime) {
        return Promise.reject(new Error("Token has expired"));
      }

      return Promise.resolve(decodedToken);
    } catch (error) {
      return Promise.reject(new Error("Token validation failed"));
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const reset = queryParams.get("reset")?.split("?to=")?.[0] || "";
    validateInviteToken(reset)
      .then((data) => {
        setUserData(data);
        setToken(reset);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [router]);

  const onSubmit = (data: any) => {
    if (data.new_password !== data.password2) {
      setError("password2", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    updatePassword({
      new_password: data.new_password,
      token: token,
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="bg-[#1f325c] flex justify-center items-center min-h-screen py-10">
      <div className="min-w-[480px] border border-stroke bg-[#e8f0fe] shadow-default dark:border-strokedark dark:bg-boxdark relative">
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark">
            <div className="w-full px-10 pt-8 pb-12">
              <div className="flex justify-between items-center mb-9">
                <h2 className="text-2xl font-bold text-black">
                  Reset your password
                </h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-4">
                  <FormControlWrapper
                    name="new_password"
                    control={control}
                    rules={{ required: "Please enter your password!" }}
                    error={errors.password?.message?.toString()}
                  >
                    {(field) => (
                      <LoginInput
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
                  <FormControlWrapper
                    name="password2"
                    control={control}
                    rules={{ required: "Please enter your password!" }}
                    error={errors.password2?.message?.toString()}
                  >
                    {(field) => (
                      <LoginInput
                        {...field}
                        type={"password"}
                        label="Confirm password"
                        placeholder="Enter your password"
                        disabled={false}
                        required={true}
                        icon={<PasswordIcon className="fill-current" />}
                      />
                    )}
                  </FormControlWrapper>
                  <Button
                    type="submit"
                    className="tracking-widest absolute translate-y-1/2 bottom-0 left-10 right-10 text-center p-4 block cursor-pointer border border-primary bg-primary text-white transition"
                  >
                    RESET
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
