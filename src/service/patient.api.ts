import { useAxios } from "../api/useAxios";

type RegisterPatientInput = {
  nome: string;
  cpf: string;
  password: string;
}

export const usePatient = () => {
  const HOSPITAL_ID = process.env.HOSPITAL_ID;
  const axios = useAxios().instance;

  const createPatient = async (form: RegisterPatientInput) => {
    await axios({
      method: 'POST',
      url: '/patient',
      data: {
        cpf: form.cpf,
        name: form.nome,
        password: form.password,
        hospitalId: HOSPITAL_ID
      }
    }).catch((error) => {
      if (error.response)
        throw new Error(error.response.data.message);

      throw error;
    })
  }

  return { createPatient };
}