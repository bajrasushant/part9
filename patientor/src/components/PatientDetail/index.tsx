import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";

import { EntryWithoutId, HealthCheckRating, Patient } from "../../types";
import { Alert, Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import EntriesDetail from "./EntriesDetail";
import AddEntryForm from "../AddEntryForm";

const PatientDetail = () => {
  const match = useMatch("/patients/:id");
  const id = match?.params.id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const fetchedPatient = await patientService.getById(patientId);
      setPatient(fetchedPatient);
    };
    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  const [newHealthEntry, setNewHealthEntry] = useState<EntryWithoutId>({
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: HealthCheckRating.Healthy,
    diagnosisCodes: [],
    type: "HealthCheck",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewHealthEntry((prev) => ({
      ...prev,
      [name]:
        name === "healthCheckRating"
          ? Number(value)
          : name === "diagnosisCodes"
            ? value.split(",").map((code) => code.trim())
            : value,
    }));
  };

  const resetForm = () => {
    setNewHealthEntry({
      description: "",
      date: "",
      specialist: "",
      healthCheckRating: HealthCheckRating.Healthy,
      diagnosisCodes: [],
      type: "HealthCheck",
    });
  };

  const newEntryCreate = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(newHealthEntry);
    try {
      const data = await patientService.createNewEntry(newHealthEntry, id!);
      if (data) {
        setPatient((prev) => ({
          ...prev!,
          entries: prev!.entries.concat(data),
        }));
        resetForm();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "20px",
        flexDirection: "column",
        gap: "2",
        padding: "2",
      }}
    >
      {error && <Alert severity="error">{error}</Alert>}
      {patient ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">{patient.name}</Typography>
            <Box sx={{ marginLeft: "20px" }}>
              {patient.gender.toLowerCase() === "male" && <MaleIcon />}
              {patient.gender.toLowerCase() === "female" && <FemaleIcon />}{" "}
              {patient.gender.toLowerCase() !== "male" &&
                patient.gender.toLowerCase() !== "female" && (
                  <TransgenderIcon />
                )}
            </Box>
          </Box>
          <Divider sx={{ marginY: "10px" }} />
          <Typography variant="body1">ssn: {patient.ssn}</Typography>
          <Typography variant="body1">
            occupation: {patient.occupation}
          </Typography>
          <Divider sx={{ marginY: "10px" }} />
          <AddEntryForm
            resetForm={resetForm}
            newEntry={newHealthEntry}
            handleChange={handleChange}
            handleSubmit={newEntryCreate}
          />
          <Divider sx={{ marginY: "10px" }} />
          <EntriesDetail entries={patient.entries} />
        </>
      ) : (
        <Typography>No patient data</Typography>
      )}
    </Box>
  );
};

export default PatientDetail;
