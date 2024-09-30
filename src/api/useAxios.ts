import axios, { CanceledError } from "axios";
import { useAuthStore } from "../store/authStore";
import { getRefreshToken, storeRefresh, storeSignOut } from "../util/storage";

export const useAxios = () => {
  const BASE_URL = process.env.BASE_URL;
  const authStore = useAuthStore();

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json"
    }
  })

  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const originalReq = error.config;

    if (error.response && error.response.status === 401 && originalReq.url !== '/login' && !originalReq._retry) {
      originalReq._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        const headers = { 'Authorization': 'Bearer ' + refreshToken };
        const response = await axios.post(BASE_URL + '/token', {}, { headers })

        const token = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken
        };

        await storeRefresh(token);
        authStore.setRefresh(token.accessToken);

        originalReq.headers["Authorization"] = 'Bearer ' + token.accessToken;
        return instance(originalReq);
      } catch (error) {
        if (error.response.status === 401) {
          await storeSignOut();
          authStore.setSignOut();
          throw new Error("Sua sessão expirou");
        }
        throw error;
      }
    }

    else if (error instanceof CanceledError || error.message === 'Network Error')
      throw new Error("Falha de conexão");

    else
      return Promise.reject(error);
  })

  return { instance };
}