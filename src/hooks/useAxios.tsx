import axios from "axios";
import { useEffect } from "react";
import { HttpOptions } from "../lib/types";

const useAxios = () => {
    const source = axios.CancelToken.source();
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        cancelToken: source.token
    });

    const setDefaultHeaders = (option: HttpOptions) => {
        switch (option) {
            case 'json':
                axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';
                break;
            case 'form':
                axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
                break;
        }
    };

    const setHeaders = (option: HttpOptions | HttpOptions[]) => {
        if (Array.isArray(option)) option.forEach(opt => setDefaultHeaders(opt));
        else setDefaultHeaders(option);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();

        return () => source.cancel("Component unmounted: Request cancelled.");
    }, []);

    return {
        get: (url: string, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.get(url);
        },
        post: (url: string, body: any, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.post(url, body);
        },
        patch: (url: string, body?: any, options?: HttpOptions | HttpOptions[]) => {
            if (options) setHeaders(options);
            return axiosInstance.patch(url, body);
        },
        put: (url: string, body: any, options?: HttpOptions | HttpOptions[]) => {
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