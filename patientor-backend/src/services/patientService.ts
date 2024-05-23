import patientData from "../../data/patients";
import { NewPatientEntry, Patient, ssnExcludedPatient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
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

const addNewPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addNewPatient
};
