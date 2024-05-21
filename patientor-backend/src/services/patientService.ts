import patientData from "../../data/patients";
import { Patient, ssnExcludedPatient } from "../types";

const getPatients = ():Patient[] => {
  return patientData;
};

const getPatientsNoSsn = (): ssnExcludedPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatients,
  getPatientsNoSsn,
};
