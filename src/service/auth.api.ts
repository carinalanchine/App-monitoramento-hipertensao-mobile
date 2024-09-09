import { getRefreshToken, storeRefresh, storeSignIn } from "../util/storage";
import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

type LoginInput = {
  cpf: string,
  password: string
}

export const useAuth = () => {
  const authStore = useAuthStore();

  const loginPatient = async (form: LoginInput) => {
    await useAxios({
      method: 'POST',
      url: '/login',
      data: {
        cpf: form.cpf,
        password: form.password
      }
    }).then(async (response) => {
      const newUser = {
        id: response.data.user.id,
        name: response.data.user.name
      };

      const token = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };

      await storeSignIn(newUser, token);
      authStore.setSignIn(newUser, token.accessToken);
    }).catch((error) => {
      if (error.status == 404 || error.status == 401)
        throw new Error(error.response.data.message);

      throw new Error("Não foi possível realizar o login");
    })
  }

  const refreshToken = async () => {
    const refreshToken = await getRefreshToken();

    await useAxios({
      method: 'POST',
      url: '/refreshToken',
      headers: { 'Authorization': 'Bearer ' + refreshToken }
    }).then(async (response) => {
      const token = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };

      await storeRefresh(token);
      authStore.setRefresh(token.accessToken);
    }).catch(() => {
      throw new Error("Error on refresh token");
    })
  }

  return { loginPatient, refreshToken };
}