"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";

const localAPI_URL = "http://localhost:3000/api";
const realAPI_URL = "https://license-management-server-lysrkspm1.vercel.app";
const virtualAPI_URL = "https://lic-refine.vercel.app/api";

const API_URL =
  process.env.NODE_ENV === "development"
    ? realAPI_URL
    : virtualAPI_URL;

// export const dataProvider = dataProviderSimpleRest(API_URL);

const replaceUrlIfNeeded = (url: string | undefined): string | undefined => {
  if (!url) return url;
  if (url.includes('register-admin')) {
    return url;
  }
  if (url.includes('transactions') || url.includes('assets') || url.includes('products')) {
    return url.replace(realAPI_URL, virtualAPI_URL);
  }
  return url;
}

axiosInstance.interceptors.request.use(
  (config) => {
    config.url = replaceUrlIfNeeded(config.url);
    if (config.url?.includes('register-admin')) {
      return config;
    }  
    const token = localStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  }
);
export const dataProvider = nestjsxDataProvider(API_URL, axiosInstance);