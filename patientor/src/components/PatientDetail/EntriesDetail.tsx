import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";

interface EntriesProps {
  entries: Entry[];
}

const EntriesDetail = (props: EntriesProps) => {
  const { entries } = props;

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchedDiagnosisList = async () => {
      const fetchedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(fetchedDiagnoses);
    };

    void fetchedDiagnosisList();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6">entries</Typography>
      {entries.map((entry, index) => (
        <Box key={index} sx={{ display: "flex" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">
              {entry.date}{" "}
              <Typography sx={{ fontStyle: "italic" }} component="span">
                {entry.description}
              </Typography>
            </Typography>
            <List dense component="ul">
              {entry.diagnosisCodes ? (
                entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find(
                    (diagnosis) => diagnosis.code === code,
                  );

                  return (
                    <ListItem key={code}>
                      <ListItemText primary={code} />
                      <ListItemText
                        primary={
                          diagnosis ? diagnosis.name : "Unknown Diagnosis"
                        }
                      />
                    </ListItem>
                  );
                })
              ) : (
                <></>
              )}
            </List>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default EntriesDetail;
