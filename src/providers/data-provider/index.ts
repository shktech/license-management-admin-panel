"use client";

import nestjsxDataProvider, { axiosInstance } from "@refinedev/nestjsx-crud";
import { DataProvider } from "@refinedev/core";
import { stringify } from "querystring";

// const localAPI_URL = "http://localhost:3000/api";
// const virtualAPI_URL = "https://lic-refine.vercel.app/api";
const realAPI_URL = "https://calmtpy.pfuapps.com/api";

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
  ...nestjsxDataProvider(API_URL ?? realAPI_URL, axiosInstance),
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    let params: PARAMS = {}

    if (pagination?.mode != "off") {
      const { current = 1, pageSize = 10 } = pagination ?? {};
      const offset = (current - 1) * pageSize;
      params = {
        ...params,
        limit: 10,
        page: current,
        offset: offset,
      }
    }
    if (filters && filters.length > 0) {
      params.filter = filters[0].value;
    }

    if (sorters && sorters.length > 0) {
      params.sort = sorters[0].field;
      params.order = sorters[0].order;
    }

    const response = await axiosInstance.get(`${API_URL ?? realAPI_URL}/${resource}`, {
      params: params,
    });

    if (pagination?.mode != 'off') {
      return response.data;
    }
    return {
      data: response.data,
      total: response.data.length
    }
  },
  custom: async ({ url, method, payload }) => {
    let requestUrl = (API_URL ?? realAPI_URL) + `/${url}?`;
    console.log(requestUrl);
    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await axiosInstance[method](requestUrl, payload);
        break;
      case "delete":
        axiosResponse = await axiosInstance.delete(requestUrl, {
          data: payload,
        });
        break;
      default:
        axiosResponse = await axiosInstance.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
}

export const dataProvider = customDataProvider;
