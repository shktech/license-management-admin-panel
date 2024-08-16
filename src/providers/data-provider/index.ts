"use client";

import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";
import { DataProvider } from "@refinedev/core";

// const localAPI_URL = "http://localhost:3000/api";
// const virtualAPI_URL = "https://lic-refine.vercel.app/api";
const realAPI_URL = "https://license-management-server.vercel.app/api";

const API_URL = process.env.API_URL;

interface PARAMS {
  limit?: number,
  page?: number,
  offset?: number,
  filter?: string,
  sort?: string,
  order?: string,
}

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

// export const dataProvider = nestjsxDataProvider(API_URL, axiosInstance);

const customDataProvider: DataProvider = {
  ...nestjsxDataProvider(API_URL as string, axiosInstance),
  getList: async ({ resource, pagination, filters, sorters, meta }) => {

    const { current = 1, pageSize = 10 } = pagination ?? {};
    const offset = (current - 1) * pageSize;

    let params: PARAMS = {
      limit: 10,
      page: current,
      offset: offset,
    }

    if (filters && filters.length > 0) {
      params.filter = filters[0].value;
    }

    if (sorters && sorters.length > 0) {
      params.sort = sorters[0].field;
      params.order = sorters[0].order;
    }

    const response = await axiosInstance.get(`${API_URL}/${resource}`, {
      params: params,
    });

    return response.data;
  },
}

export const dataProvider = customDataProvider;
