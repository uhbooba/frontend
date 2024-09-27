import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

const createAxiosInstance = (useAuth = false) => {
  const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      if (useAuth) {
        const accessToken = localStorage.getItem('ACCESS_TOKEN');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (useAuth && error.response && error.response?.status === 401) {
        try {
          const { accessToken: newAccessToken } = error.response.data.data;

          localStorage.setItem('ACCESS_TOKEN', newAccessToken);

          // 원래 요청을 재시도
          const retryConfig = {
            ...error.config,
            headers: {
              ...error.config.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };

          return instance(retryConfig);
        } catch (refreshError) {
          localStorage.removeItem('ACCESS_TOKEN');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    },
  );

  instance.defaults.withCredentials = true;

  return instance;
};

const axiosInstance = createAxiosInstance(false);
const authAxiosInstance = createAxiosInstance(true);

export { axiosInstance, authAxiosInstance };
