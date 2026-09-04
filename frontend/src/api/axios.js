import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
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

    (error) => {
        return Promise.reject(error);
    }
);


// ================================
// RESPONSE INTERCEPTOR
// ================================

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {

        const originalRequest = error.config;

        // Access token expired / unauthorized
        if (error.response?.status === 401) {

            const refreshToken = localStorage.getItem("refreshToken");

            // No refresh token
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {

                // Request new access token
                const response = await axios.post(
                    "http://127.0.0.1:8000/accounts/api/token/refresh/",
                    {
                        refresh: refreshToken
                    }
                );

                console.log("REFRESH SUCCESS:", response.data);

                // Get new access token
                const newAccessToken = response.data.access;

                // Save new access token
                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                // Add new token to original request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // Retry original request
                return api(originalRequest);

            } catch (refreshError) {

                // Debugging
                console.log("REFRESH FAILED");
                console.log(
                    "STATUS:",
                    refreshError.response?.status
                );
                console.log(
                    "DATA:",
                    refreshError.response?.data
                );

                // Refresh token itself is invalid/expired
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default api;