import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

type PressureInput = {
  sistolica: number;
  diastolica: number;
}

export const usePressure = () => {
  const authStore = useAuthStore();
  const axios = useAxios().instance;

  const createBloodPressure = async (form: PressureInput) => {
    await axios({
      method: 'POST',
      url: '/pressure',
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken },
      data: {
        systolic: form.sistolica,
        diastolic: form.diastolica,
        patientId: authStore.user.id
      }
    }).catch((error) => {
      if (error.response)
        throw new Error("Não foi possível salvar a pressão");

      throw error;
    })
  }

  return { createBloodPressure };
}