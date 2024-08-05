"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";
import jwt_decode from 'jwt-decode';

const API_URL =
  process.env.NODE_ENV === "development"
    // ? "http://localhost:3000/api"
    ? "http://localhost:8000"
    : "https://lic-refine.vercel.app/api";

// export const dataProvider = dataProviderSimpleRest(API_URL);

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.includes("register-admin")) {
      return config;
    }
    const token = localStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  }
);
export const dataProvider = nestjsxDataProvider(API_URL, axiosInstance);