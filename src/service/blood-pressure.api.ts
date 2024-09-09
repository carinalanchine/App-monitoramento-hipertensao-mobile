import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

type PressureInput = {
  sistolica: number;
  diastolica: number;
}

export const usePressure = () => {
  const authStore = useAuthStore();

  const createBloodPressure = async (form: PressureInput) => {
    await useAxios({
      method: 'POST',
      url: '/pressure',
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken },
      data: {
        systolic: form.sistolica,
        diastolic: form.diastolica,
        patientId: authStore.user.id
      }
    }).catch(() => {
      throw new Error("Não foi possível salvar a pressão");
    })
  }

  return { createBloodPressure };
}