import { useState } from "react";
import { IMedicine } from "../interfaces/IMedicine";
import { useAuthStore } from "../store/authStore";
import { useAxios } from "../api/useAxios";

type CreateMedicineInput = {
  title: string;
  dosage: string;
  interval: string;
}

export const useMedicines = () => {
  const [listMedicines, setListMedicines] = useState<IMedicine[]>(null);
  const authStore = useAuthStore();
  const axios = useAxios().instance;

  const getMedicines = async () => {
    await axios({
      method: 'GET',
      url: '/medicine/list/' + authStore.user.id,
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken }
    }).then((response) => {
      setListMedicines(response.data.medicines);
    }).catch((error) => {
      if (error.response)
        throw new Error(error.response.data.message);

      throw error;
    })
  }

  const deleteMedicine = async (id: string) => {
    await axios({
      method: 'DELETE',
      url: '/medicine/' + id,
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken }
    }).catch((error) => {
      if (error.response)
        throw new Error(error.response.data.message);

      throw error;
    })
  }

  const createMedicine = async (form: CreateMedicineInput) => {
    await axios({
      method: 'POST',
      url: '/medicine',
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken },
      data: {
        title: form.title,
        dosage: form.dosage,
        interval: form.interval,
        patientId: authStore.user.id
      }
    }).catch((error) => {
      if (error.response)
        throw new Error(error.response.data.message);

      throw error;
    })
  }

  return { listMedicines, deleteMedicine, getMedicines, createMedicine };
}