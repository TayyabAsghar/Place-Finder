import { useEffect } from "react";
import ReactError from "../lib/reactError";
import axios, { type AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../lib/redux/state";
import useRefreshToken from "./useRefreshToken";
import useNotification from "./useNotification";
import { useDispatch, useSelector } from "react-redux";
import type { AxiosProps, ErrorData, HttpOptions, UserState } from "../lib/types";

const useAxios = (props?: AxiosProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refresh = useRefreshToken();
    const source = axios.CancelToken.source();
    const { setNotification } = useNotification();
    const token = useSelector((state: UserState) => state.token);
    const axiosInstance = axios.create({
        cancelToken: source.token,
        baseURL: process.env.REACT_APP_API_URL,
        headers: { Authorization: `Bearer ${token}` }
    });

    const setDefaultHeaders = (option: HttpOptions) => {
        switch (option) {
            case 'json':
                axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
                break;
            case 'form':
                axiosInstance.defaults.headers.common["Content-Type"] = "multipart/form-data";
                break;
            case 'skip-authorization':
                delete axios.defaults.headers.common["Authorization"];
                break;
        }
    };

    const setHeaders = (option: HttpOptions | HttpOptions[]) => {
        if (Array.isArray(option)) option.forEach(opt => setDefaultHeaders(opt));
        else setDefaultHeaders(option);
    };

    axiosInstance.interceptors.response.use(
        response => response,
        async (err: AxiosError) => {
            const originalRequest = err.config;

            if (err.code === "ERR_CANCELED") return Promise.reject();
            if (err.code === "ERR_NETWORK" || err.code === "ERR_CONNECTION_REFUSED") {
                setNotification({
                    severity: "error",
                    message: "Please check your internet connection."
                });
                return Promise.reject();
            }

            if (err.response?.status === 500) {
                setNotification({
                    severity: "error",
                    message: "Something went wrong, Please refresh the page."
                });
                return Promise.reject();
            }

            if (err.response?.status === 401 && originalRequest && !originalRequest.headers['Retry']) {
                try {
                    originalRequest.headers['Retry'] = true;
                    await refresh();
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                } catch (err) {
                    setNotification({
                        severity: "error",
                        message: "Your session has expired. Please login to continue."
                    });
                    dispatch(setLogout());
                    navigate("/login");
                    return Promise.reject();
                }
            }

            return Promise.reject(new ReactError(err.response?.status || 500, (err.response?.data as ErrorData).message));
        });

    useEffect(() => {
        if (!props?.continueCallOnUnmount && process.env.NODE_ENV === "production")
            return () => source.cancel();
    }, []);

    return {
        get: (url: string, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.get(url);
        },
        post: (url: string, body?: any, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.post(url, body);
        },
        patch: (url: string, body?: any, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.patch(url, body);
        },
        put: (url: string, body?: any, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.put(url, body);
        },
        delete: (url: string, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.delete(url);
        }
    };
};

export default useAxios;