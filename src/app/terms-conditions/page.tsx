"use client";

import { realAPI_URL } from "@data/UtilData";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loader from "@components/common/Loader";
import GeneralInput from "@components/Input/GeneralInput";
import FormControlWrapper from "@components/Forms/FormControlWrapper";
import { useForm } from "@refinedev/react-hook-form";
import EmailIcon from "@/assets/icons/email.svg?icon";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.split("?to=")?.[0] || "";
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agree, setAgree] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onSubmit",
  });
  // Add email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    validateToken(token);
  }, [router]);

  const validateToken = async (token: string) => {
    setIsLoading(true);
    const response = await fetch(`${API_URL ?? realAPI_URL}/validate-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
    } else {
      router.push("/link-expired");
    }
    setIsLoading(false);
  };
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_URL ?? realAPI_URL}/accept-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        }),
      });
      if (response.ok) {
        setIsSuccess(true);
      }
    } catch (error) {
      // Handle error
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (isSuccess) {
    return (
      <div className="flex justify-center h-screen items-center nobody knows">
        <div className="py-10 bg-white rounded-lg px-16 mt-10">
          <div className="flex justify-center items-center flex-col">
            <div className="text-2xl text-green-500 pb-6">
              <CheckCircleIcon sx={{ fontSize: 60 }} />
            </div>
            <div className="text-xl text-[#10132b]">
              Thank you, you will receive an email with a license key shortly.
            </div>
            <div className="text-xl text-[#10132b]">
              You can close this page now.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center h-screen items-center nobody knows">
      <div className="w-[600px] py-10 bg-white rounded-lg px-8 mt-10">
        <div className="text-4xl font-semibold text-[#10132b] pb-6">
          Terms and Conditions
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <FormControlWrapper
              name="firstName"
              control={control}
              rules={{
                required: "Please enter your first name!",
              }}
              error={errors.firstName?.message?.toString()}
            >
              {(field) => (
                <GeneralInput
                  {...field}
                  type={"text"}
                  label="First Name"
                  placeholder="Enter your first name"
                  required={true}
                  disabled={false}
                />
              )}
            </FormControlWrapper>
            <FormControlWrapper
              name="lastName"
              control={control}
              rules={{
                required: "Please enter your last name!",
              }}
              error={errors.lastName?.message?.toString()}
            >
              {(field) => (
                <GeneralInput
                  {...field}
                  type={"text"}
                  label="Last Name"
                  placeholder="Enter your last name"
                  required={true}
                  disabled={false}
                />
              )}
            </FormControlWrapper>
            <FormControlWrapper
              name="email"
              control={control}
              rules={{
                required: "Please enter your email!",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address!",
                },
              }}
              error={errors.email?.message?.toString()}
            >
              {(field) => (
                <GeneralInput
                  {...field}
                  type={"text"}
                  label="Email"
                  placeholder="Enter your email"
                  required={true}
                  disabled={false}
                />
              )}
            </FormControlWrapper>
            <FormGroup className="mt-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                }
                label={
                  <div>
                    I agree to the{" "}
                    <Link href="#" className="underline" target="_blank">
                      Terms and Conditions
                    </Link>{" "}
                    and authorize the use of the provided information as
                    outlined therein.
                  </div>
                }
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#10132b", // This matches the color you're using for other labels
                  },
                }}
              />
            </FormGroup>
            <Button
              type="submit"
              disabled={!agree}
              className={`text-center w-full block mb-5 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 ${
                !agree ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Accept
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
