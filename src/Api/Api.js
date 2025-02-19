import { endPointUrl } from "./EndPoint";
import axios from "axios";

const defaultUrl = axios.create({
  baseURL: endPointUrl,
});

defaultUrl.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    config.headers["user"] = userId ? userId : "";
    // config.withCredentials = true;   // access cookie
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = async (Method, Url, payload, headers) => {
  try {
    const Config = {
      method: Method,
      url: Url,
      ...(payload && { data: payload }),
      ...(headers && { headers: headers }),
    };
    const res = await defaultUrl(Config);
    return res.data;
  } catch (error) {
    console.error("Error in Api Call".error);
    return error;
  }
};
