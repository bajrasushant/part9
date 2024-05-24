import { Diagnosis, HealthCheckEntry } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

import { Box, Typography } from "@mui/material";
import DiagnosesDetail from "./DiagnosesDetail";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  index: number;
  diagnoses: Diagnosis[];
}

const RatingHealthCheckEntry = (props: HealthCheckEntryProps) => {
  const { entry, index, diagnoses } = props;
  return (
    <Box key={index} sx={{ border: 1, display: "flex", borderRadius: '10px', borderColor: 'primary.main', paddingX: '10px', marginBottom: '10px' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1">
          {entry.date} <HealthAndSafetyIcon />
        </Typography>
        <Typography sx={{ fontStyle: "italic" }} component="span">
          {entry.description}
        </Typography>
        <Typography>
          {entry.healthCheckRating === 0 && (
            <FavoriteIcon sx={{ color: "green" }} />
          )}
          {entry.healthCheckRating === 1 && (
            <FavoriteIcon sx={{ color: "blue" }} />
          )}
          {entry.healthCheckRating === 2 && (
            <FavoriteIcon sx={{ color: "orange" }} />
          )}
          {entry.healthCheckRating === 3 && (
            <HeartBrokenIcon sx={{ color: "red" }} />
          )}
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

export default RatingHealthCheckEntry;
