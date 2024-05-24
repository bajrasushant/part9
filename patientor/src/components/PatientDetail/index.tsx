import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import FemaleIcon from "@mui/icons-material/Female";

import { Patient } from "../../types";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import EntriesDetail from "./EntriesDetail";

const PatientDetail = () => {
  const match = useMatch("/patients/:id");
  const id = match?.params.id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      const fetchedPatient = await patientService.getById(patientId);
      setPatient(fetchedPatient);
    };
    if (id) {
      void fetchPatient(id);
    }
  }, [id]);

  return (
    <Box
      sx={{
        marginTop: "20px",
        flexDirection: "column",
        gap: "2",
        padding: "2",
      }}
    >
      {patient ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">{patient.name}</Typography>
            <Box sx={{ marginLeft: "20px" }}>
              {patient.gender.toLowerCase() === "male" && <MaleIcon />}
              {patient.gender.toLowerCase() === "female" && <FemaleIcon />}{" "}
              {/* Use the same icon for simplicity */}
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
          <EntriesDetail entries={patient.entries} />
        </>
      ) : (
        <Typography>No patient data</Typography>
      )}
    </Box>
  );
};

export default PatientDetail;
