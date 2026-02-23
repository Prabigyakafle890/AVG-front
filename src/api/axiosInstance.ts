import axios from 'axios';

const getBaseURL = () => {
  const url = import.meta.env.VITE_API_BASE_URL;
  if (!url) {
    console.warn(
      'VITE_API_BASE_URL is not defined! API calls will fallback to the frontend domain.'
    );
    return '';
  }
  return url.endsWith('/') ? url : `${url}/`;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (
        !window.location.pathname.includes('/login') &&
        window.location.pathname !== '/'
      ) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
