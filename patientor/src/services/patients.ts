import axios from "axios";
import { Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createNewPatientEntry = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createNewEntry = async (object: EntryWithoutId, id: string) => {
  try {
    const { data } = await axios
      .post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
    return data;
  }
  catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      throw new Error(err.response.data);
    } else {
      console.error(err);
    }
  }
};

export default {
  getAll,
  getById,
  createNewPatientEntry,
  createNewEntry,
};
