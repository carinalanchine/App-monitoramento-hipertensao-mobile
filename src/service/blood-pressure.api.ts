import { useAuthStore } from "../store/authStore";
import { URL_BASE } from "../util/constants";

type PressureInput = {
  sistolica: number;
  diastolica: number;
}

export const usePressure = () => {
  const authStore = useAuthStore();

  const createBloodPressure = async (form: PressureInput) => {
    const response = await fetch(URL_BASE + '/pressure', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      },
      body: JSON.stringify({
        systolic: form.sistolica,
        diastolic: form.diastolica,
        patientId: authStore.user.id
      })
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);
  }

  return { createBloodPressure };
}