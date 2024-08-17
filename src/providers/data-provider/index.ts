"use client";

import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";

// const localAPI_URL = "http://localhost:3000/api";
// const virtualAPI_URL = "https://lic-refine.vercel.app/api";
const realAPI_URL = "https://license-management-server.vercel.app/api";

const API_URL = process.env.API_URL;

const replaceUrlIfNeeded = (url: string | undefined): string | undefined => {
  if (!url) return url;
  if (url.includes('register-admin')) {
    return url;
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
export const dataProvider = nestjsxDataProvider(API_URL ?? realAPI_URL, axiosInstance);