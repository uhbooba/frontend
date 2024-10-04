import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

const createAxiosInstance = () => {
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
      const accessToken = localStorage.getItem('ACCESS_TOKEN');

      if (accessToken) {
        config.headers.access = `${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.defaults.withCredentials = true;

  return instance;
};

const axiosInstance = createAxiosInstance();

export { axiosInstance };
