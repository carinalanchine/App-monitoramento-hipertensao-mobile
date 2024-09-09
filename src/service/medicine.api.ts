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

  const getMedicines = async () => {
    await useAxios({
      method: 'GET',
      url: '/medicine/list/' + authStore.user.id,
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken }
    }).then((response) => {
      setListMedicines(response.data.medicines);
    }).catch(() => {
      throw new Error("Não foi possível recuperar os remédios");
    })
  }

  const deleteMedicine = async (id: string) => {
    await useAxios({
      method: 'DELETE',
      url: '/medicine/' + id,
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken }
    }).catch(() => {
      throw new Error("Não foi possível excluir o remédio");
    })
  }

  const createMedicine = async (form: CreateMedicineInput) => {
    await useAxios({
      method: 'POST',
      url: '/medicine',
      headers: { 'Authorization': 'Bearer ' + authStore.accessToken },
      data: {
        title: form.title,
        dosage: form.dosage,
        interval: form.interval,
        patientId: authStore.user.id
      }
    }).catch(() => {
      throw new Error("Não foi possível cadastrar o remédio");
    })
  }

  return { listMedicines, deleteMedicine, getMedicines, createMedicine };
}