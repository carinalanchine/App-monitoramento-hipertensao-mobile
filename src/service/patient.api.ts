import { HOSPITAL_ID } from "../util/constants";
import { useAxios } from "../api/useAxios";

type RegisterPatientInput = {
  nome: string;
  cpf: string;
  password: string;
}

export const usePatient = () => {
  const createPatient = async (form: RegisterPatientInput) => {
    await useAxios({
      method: 'POST',
      url: '/patient',
      data: {
        cpf: form.cpf,
        name: form.nome,
        password: form.password,
        hospitalId: HOSPITAL_ID
      }
    }).catch(() => {
      throw new Error("Não foi possível realizar o cadastro");
    })
  }

  return { createPatient };
}