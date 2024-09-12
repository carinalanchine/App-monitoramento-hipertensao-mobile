import { storeSignIn } from "../util/storage";
import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

type LoginInput = {
  cpf: string,
  password: string
}

export const useAuth = () => {
  const authStore = useAuthStore();
  const axios = useAxios().instance;

  const loginPatient = async (form: LoginInput) => {
    await axios({
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
      if (error.response)
        throw new Error(error.response.data.message);

      throw error;
    })
  }

  return { loginPatient };
}