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

export default axiosInstance;
