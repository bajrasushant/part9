import { Diagnosis, Entry } from "../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import { Box, Typography } from "@mui/material";
import DiagnosesDetail from "./DiagnosesDetail";


interface OccupationalEntryProps {
  entry: Entry;
  index: number;
  diagnoses: Diagnosis[];
}

const OccupationalEntry = (props: OccupationalEntryProps) => {
  const { entry, index, diagnoses } = props;
  return (
    <Box key={index} sx={{ border: 1, display: "flex", borderRadius: '10px', borderColor: 'primary.main', paddingX: '10px', marginBottom: '10px'}}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">
          {entry.date} <MedicalInformationIcon />
        </Typography>
        <Typography sx={{ fontStyle: "italic" }} component="span">
          {entry.description}
        </Typography>
        <Typography>
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

export default OccupationalEntry;
