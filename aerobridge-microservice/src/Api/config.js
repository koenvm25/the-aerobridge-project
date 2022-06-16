import axios from "axios";

export const baseURL = "https://aerobridge-database.herokuapp.com";
export const header = "Aerobridge MS";
const apiClient = axios.create({
  baseURL: baseURL,
});

apiClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        header,
      },
    };
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };
