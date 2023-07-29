import axios from "axios";
const BASE_URL = "https://mernyblog-api.onrender.com";

export default axios.create({
  baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("token");
    if (accessToken) {
      // If the access token exists, include it in the request headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosPrivate.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      // const dispatch = useDispatch()
      prevRequest.sent = true
      const response = await axiosPrivate.get('/refresh', {
        withCredentials: true
      });
      prevRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`
      window.localStorage.setItem("token", response.data.accessToken);
      return axiosPrivate(prevRequest)
    }
    return Promise.reject(error)
  }
)