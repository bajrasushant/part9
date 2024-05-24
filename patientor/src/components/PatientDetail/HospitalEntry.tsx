import { Diagnosis, Entry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { Box, Typography } from "@mui/material";
import DiagnosesDetail from "./DiagnosesDetail";

interface HospitalEntryProps {
  entry: Entry;
  index: number;
  diagnoses: Diagnosis[];
}

const HospitalEntry = (props: HospitalEntryProps) => {
  const { entry, index, diagnoses } = props;
  return (
    <Box key={index} sx={{ border: 1, display: "flex", borderRadius: '10px', borderColor: 'primary.main', paddingX: '10px', marginBottom: '10px'}}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography sx={{ fontStyle: "italic" }} component="span">
          {entry.description}
        </Typography>
        {entry.diagnosisCodes ? (
          <DiagnosesDetail diagnoses={diagnoses} entry={entry} />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default HospitalEntry;
