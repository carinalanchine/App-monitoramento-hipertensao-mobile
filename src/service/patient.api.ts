import { HOSPITAL_ID, URL_BASE } from "../util/constants";

type RegisterPatientInput = {
  nome: string;
  cpf: string;
  password: string;
}

export const usePatient = () => {
  const createPatient = async (form: RegisterPatientInput) => {
    const response = await fetch(URL_BASE + '/patient', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cpf: form.cpf,
        name: form.nome,
        password: form.password,
        hospitalId: HOSPITAL_ID
      })
    });

    const json = await response.json();

    if (json.status !== "success")
      throw new Error(json.message);
  }

  return { createPatient };
}