import { URL_BASE } from "../util/constants";
import { getRefreshToken, storeRefresh, storeSignIn } from "../util/storage";
import { useAuthStore } from "../store/authStore";

type LoginInput = {
  cpf: string,
  password: string
}

export const useAuth = () => {
  const authStore = useAuthStore();

  const loginPatient = async (form: LoginInput) => {
    const response = await fetch(URL_BASE + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cpf: form.cpf,
        password: form.password
      })
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);

    const newUser = {
      id: json.user.id,
      name: json.user.name
    };

    const token = {
      accessToken: json.accessToken,
      refreshToken: json.refreshToken
    };

    await storeSignIn(newUser, token);
    authStore.setSignIn(newUser, token.accessToken);
  }

  const refreshToken = async () => {
    const refreshToken = await getRefreshToken();
    const response = await fetch(URL_BASE + '/refresh', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + refreshToken
      }
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);

    const token = {
      accessToken: json.accessToken,
      refreshToken: json.refreshToken
    };

    await storeRefresh(token);
    authStore.setRefresh(token.accessToken);
  }

  return { loginPatient, refreshToken };
}