import {
  Gender,
  NewPatientEntry,
  HealthCheckEntry,
  Entry,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckRating,
  SickLeave,
  Discharge,
  Diagnosis,
  NewEntryWithoutId,
  BaseEntryWithoutId,
} from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect of missing gender: " + gender);
  }
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};


const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing description: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const isBaseEntry = (object: unknown): object is BaseEntryWithoutId => {
  const baseEntry = object as BaseEntryWithoutId;

  return (
    typeof baseEntry.description === "string" &&
    typeof baseEntry.date === "string" &&
    typeof baseEntry.specialist === "string" &&
    (baseEntry.diagnosisCodes === undefined ||
      Array.isArray(baseEntry.diagnosisCodes))
  );
};

const toNewEntry = (object: unknown): NewEntryWithoutId => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Incorrect or missing data");
  }

  if (!isBaseEntry(object)) {
    throw new Error("Incorrect or missing base entry fields");
  }

  const baseEntry: BaseEntryWithoutId = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  switch ((object as Entry).type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(
          (object as HealthCheckEntry).healthCheckRating,
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: parseName(
          (object as OccupationalHealthcareEntry).employerName,
        ),
        sickLeave: parseSickLeave(
          (object as OccupationalHealthcareEntry).sickLeave,
        ),
      };
    case "Hospital":
      return {
        ...baseEntry,
        type: "Hospital",
        discharge: parseDischarge((object as HospitalEntry).discharge),
      };
    default:
      throw new Error("Invalid entry type");
  }
};


// const assertNever = (value: never): never => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`,
//   );
// };



const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    rating === undefined ||
    rating === null ||
    typeof rating !== 'number' ||
    !Object.values(HealthCheckRating).includes(rating)
  ) {
    throw new Error("Incorrect or missing health rating " + rating);
  }
  return rating as HealthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) { return undefined; }
  if (
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave) ||
    !isString(sickLeave.startDate) ||
    !isString(sickLeave.endDate) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error("Incorrect sick leave: " + JSON.stringify(sickLeave));
  }
  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect of missing discharge: " + discharge);
  }

  if (
    !("date" in discharge) ||
    !("criteria" in discharge) ||
    !isString(discharge.criteria) ||
    !isString(discharge.date) ||
    !isDate(discharge.date)
  ) {
    throw new Error("Incorrect discharge " + JSON.stringify(discharge));
  }
  return discharge as Discharge;
};

export { toNewPatientEntry, toNewEntry };
