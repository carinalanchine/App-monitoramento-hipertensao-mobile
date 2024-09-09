import { useState } from "react";
import { IMedicine } from "../interfaces/IMedicine";
import { URL_BASE } from "../util/constants";
import { useAuthStore } from "../store/authStore";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

type CreateMedicineInput = {
  title: string;
  dosage: string;
  interval: string;
}

export const useMedicines = () => {
  const [listMedicines, setListMedicines] = useState<IMedicine[]>(null);
  const authStore = useAuthStore();

  const getMedicines = async () => {
    const response = await fetch(URL_BASE + '/medicine/list/' + authStore.user.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      }
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);

    setListMedicines(json.medicines);
  }

  const deleteMedicine = async (id: string) => {
    const filterDeleted = (medicine: IMedicine) => {
      return medicine.id !== id;
    }

    const response = await fetch(URL_BASE + '/medicine/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      }
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);

    const array = listMedicines.filter(filterDeleted);
    setListMedicines(array);
  }

  const createMedicine = async (form: CreateMedicineInput) => {
    const response = await fetch(URL_BASE + '/medicine', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + authStore.accessToken
      },
      body: JSON.stringify({
        title: form.title,
        dosage: form.dosage,
        interval: form.interval,
        patientId: authStore.user.id
      })
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);
  }

  return { listMedicines, deleteMedicine, getMedicines, createMedicine };
}