import patientData from "../../data/patients";
import {
  Entry,
  NewEntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types";
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

const getPatientById = (id: string): Patient | undefined => {
  const patientResponse = patientData.find((patient) => patient.id === id);
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

const addNewEntry = (id: string, entry: NewEntryWithoutId): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patientData.find((patient) => patient.id === id);
  if (!patient) throw new Error(`Patient with id ${id} not found`);
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatientsNoSsn,
  addNewPatient,
  getPatientById,
  addNewEntry,
};
