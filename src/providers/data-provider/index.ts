"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";
import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";
import jwt_decode from 'jwt-decode';

const API_URL =
  process.env.NODE_ENV === "development"
    // ? "http://localhost:3000/api"
    ? "https://license-management-server-lysrkspm1.vercel.app"
    : "https://lic-refine.vercel.app/api";

// export const dataProvider = dataProviderSimpleRest(API_URL);

const replaceUrlIfNeeded = (url: string | undefined): string | undefined => {
  if (!url) return url;
  if (url.includes('register-admin')) {
    return url;
  }
  if (url.includes('transactions') || url.includes('assets') || url.includes('products')) {
    return url.replace('license-management-server-lysrkspm1.vercel.app', 'localhost:3000/api');
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