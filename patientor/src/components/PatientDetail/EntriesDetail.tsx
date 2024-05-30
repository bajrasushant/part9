import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from "./OccupationalEntry";
import RatingHealthCheckEntry from "./RatingHealthCheckEntry";

interface EntriesProps {
  entries: Entry[];
  diagnoses: Diagnosis[];
}

const EntriesDetail = (props: EntriesProps) => {
  const { entries, diagnoses } = props;


  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {entries.length ? <Typography variant="h6">entries</Typography> : <></>}
      {entries.map((entry, index) => {
        switch (entry.type) {
          case "Hospital":
            return (
              <HospitalEntry
                entry={entry}
                key={entry.id}
                index={index}
                diagnoses={diagnoses}
              />
            );
          case "HealthCheck":
            return (
              <RatingHealthCheckEntry
                entry={entry}
                key={entry.id}
                index={index}
                diagnoses={diagnoses}
              />
            );
          case "OccupationalHealthcare":
            return (
              <OccupationalEntry
                entry={entry}
                key={entry.id}
                index={index}
                diagnoses={diagnoses}
              />
            );
          default:
            return assertNever(entry);
        }
      })}
    </Box>
  );
};

export default EntriesDetail;
