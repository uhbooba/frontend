import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('ACCESS_TOKEN');

      if (config.url === '/user-service/login') {
        return config;
      }
      if (config.url === '/user-service/reissue') {
        return config;
      }

      console.log(config?.url);

      if (accessToken) {
        config.headers['access'] = `${accessToken}`;
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
      const statusCode = error.response?.status;

      if (error.config.url === '/user-service/reissue' && statusCode === 400) {
        return Promise.reject(error);
      }

      if (statusCode === 401) {
        try {
          const res = await instance.post('/user-service/reissue');
          localStorage.setItem('ACCESS_TOKEN', res.headers['access']);

          error.config.headers['access'] = res.headers['access'];
          const reResponse = await axios(error.config);
          return reResponse;
        } catch (refreshError) {
          localStorage.removeItem('ACCESS_TOKEN');

          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosInstance = createAxiosInstance();

export { axiosInstance };
