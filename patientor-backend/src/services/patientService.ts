import patientData from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return patientData;
};

const getPatientsNoSsn = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id:string) : Patient | undefined => {
  const patientResponse = patientData.find(patient => patient.id === id);
  return patientResponse;
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
  addNewPatient,
  getPatientById
};
