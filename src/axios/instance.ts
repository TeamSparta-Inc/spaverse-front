import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

import { AxiosError } from "axios";

export interface AxiosOptions {
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export interface ErrorResponse {
  apiMessage?: string;
  id: string;
  timestamp: string;
}

export type CustomError = AxiosError<ErrorResponse>;

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

const instance = axios.create({
  baseURL: "http://api-spaverse.spartacodingclub.kr/api/v1",
});

const request = async (
  method: HttpMethod,
  endpoint: string,
  options: AxiosOptions = {}
) => {
  const { params, data, headers = {}, timeout, ...rest } = options;
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    params,
    timeout,
    data,
    ...rest,
  };

  const response = await instance.request(config);
  return response.data;
};

const Axios = (method: HttpMethod, endpoint: string, options?: AxiosOptions) =>
  request(method, endpoint, options);

export default Axios;
