import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface DiagnosesDetailProps {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const DiagnosesDetail = (props: DiagnosesDetailProps) => {
  const { diagnoses, entry } = props;
  return (
    <div>
      <Typography variant="h6">Diagnosed by: {entry.specialist}</Typography>
      <Typography variant="h6">Diagnoses</Typography>
      <List dense component="ul">
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
          entry.diagnosisCodes?.map((code) => {
            const diagnosis = diagnoses.find(
              (d) => d.code === code,
            );

            return (
              <ListItem key={code}>
                <ListItemText primary={code} />
                <ListItemText
                  primary={diagnosis ? diagnosis.name : "Unknown Diagnosis"}
                />
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="No diagnoses available" />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default DiagnosesDetail;
