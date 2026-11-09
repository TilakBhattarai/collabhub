
import axios from "axios";

export const API_BASE_URL =
    (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000")
        .replace(/\/+$/, "") + "/";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// ================================
// REQUEST INTERCEPTOR
// ================================

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ================================
// RESPONSE INTERCEPTOR
// ================================

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(`${API_BASE_URL}accounts/api/token/refresh/`, { refresh: refreshToken })

                const newAccessToken = response.data.access;

                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
