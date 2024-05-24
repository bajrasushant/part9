import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface DiagnosesDetailProps {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const DiagnosesDetail = (props: DiagnosesDetailProps) => {
  const { diagnoses, entry } = props;
  return (
    <>
      <Typography variant="h6">Diagnosed by: {entry.specialist}</Typography>

      <List dense component="ul">
        <Typography variant="h6">Diagnoses</Typography>
        {entry.diagnosisCodes?.map((code) => {
          const diagnosis = diagnoses.find(
            (diagnosis) => diagnosis.code === code,
          );

          return (
            <ListItem key={code}>
              <ListItemText primary={code} />
              <ListItemText
                primary={diagnosis ? diagnosis.name : "Unknown Diagnosis"}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default DiagnosesDetail;
