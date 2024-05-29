import {
  EntryWithoutId,
  Patient,
} from "../../types";
import { Alert, Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import EntriesDetail from "./EntriesDetail";
import AddEntryForm from "../AddEntryForm";
import BaseDetail from "./BaseDetail";

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

  const newEntryCreate = async (newEntry: EntryWithoutId) => {
    console.log(newEntry);
    try {
      const data = await patientService.createNewEntry(newEntry, id!);
      if (data) {
        setPatient((prev) => ({
          ...prev!,
          entries: prev!.entries.concat(data),
        }));
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
          <BaseDetail patient={patient} />
          <Divider sx={{ marginY: "10px" }} />
          <AddEntryForm handleSubmit={newEntryCreate} />
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
