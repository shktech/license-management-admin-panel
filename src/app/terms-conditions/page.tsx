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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.split("?to=")?.[0] || "";
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    agree: false,
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
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL ?? realAPI_URL}/accept-license`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: inputValues.firstName,
          last_name: inputValues.lastName,
          email: inputValues.email,
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
            <div className="text-2xl text-[#10132b]">
              You successfuly accepted the terms and conditions
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center h-screen items-center nobody knows">
      <div className="w-[900px] py-10 bg-white rounded-lg px-8 mt-10">
        <div className="text-4xl font-semibold text-[#10132b] pb-6">
          Terms and Conditions
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-base text-[#10132b] pb-1">First Name</div>
            <TextField
              hiddenLabel
              variant="outlined"
              fullWidth
              size="small"
              value={inputValues.firstName}
              onChange={(e) =>
                setInputValues({ ...inputValues, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <div className="text-base text-[#10132b] pb-1">Last Name</div>
            <TextField
              hiddenLabel
              variant="outlined"
              fullWidth
              size="small"
              value={inputValues.lastName}
              onChange={(e) =>
                setInputValues({ ...inputValues, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <div className="text-base text-[#10132b] pb-1">Email</div>
            <TextField
              hiddenLabel
              variant="outlined"
              fullWidth
              size="small"
              value={inputValues.email}
              onChange={(e) =>
                setInputValues({ ...inputValues, email: e.target.value })
              }
              error={
                inputValues.email !== "" && !isValidEmail(inputValues.email)
              }
              helperText={
                inputValues.email !== "" && !isValidEmail(inputValues.email)
                  ? "Please enter a valid email address"
                  : ""
              }
            />
          </div>
        </div>
        <FormGroup className="mt-4">
          <FormControlLabel
            control={
              <Checkbox
                checked={inputValues.agree}
                onChange={(e) =>
                  setInputValues({ ...inputValues, agree: e.target.checked })
                }
              />
            }
            label="I agree to the Terms and Conditions and authorize the use of the provided information as outlined therein."
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#10132b", // This matches the color you're using for other labels
              },
            }}
          />
        </FormGroup>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#10132b",
            }}
            disabled={
              !inputValues.firstName ||
              !inputValues.lastName ||
              !inputValues.email ||
              !isValidEmail(inputValues.email) ||
              !inputValues.agree
            }
          >
            Accept
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#f1f1f1", color: "#10132b" }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Page;
