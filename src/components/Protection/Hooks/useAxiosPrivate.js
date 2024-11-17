import { useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
const { auth } = useAuth();
const refresh = useRefreshToken();

const useAxiosPrivate = () => {
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorisation"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accesstoken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (err?.response?.status === 403 && !prevRequest.sent) {
          const newaccesstoken = refresh();
          prevRequest.headers["Authorisation"] = `Bearer ${newaccesstoken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
