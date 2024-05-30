import { Box, Button, SelectChangeEvent, TextField, Typography } from "@mui/material";

import { Diagnosis, EntryWithoutId, OccupationalHealthcareEntry } from "../../types";
import BaseEntryForm from "./BaseEntryForm";

interface AddOccupationalEntryFormProps {
  newEntry: EntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: React.SyntheticEvent) => void;
  cancelForm: () => void;
  setNewEntry: React.Dispatch<React.SetStateAction<EntryWithoutId>>;
  diagnoses: Diagnosis[];
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void;
}

const AddOccupationalEntryForm = ({
  newEntry,
  submitForm,
  handleChange,
  cancelForm,
  diagnoses,
  handleSelectChange,
}: AddOccupationalEntryFormProps) => {
  return (
    <div>
      <Box
        sx={{
          border: "1px dashed grey",
          p: 2,
          margin: 1,
        }}
      >
        <form onSubmit={submitForm}>
          <b>New Occupational Entry</b>
          <div>
            <BaseEntryForm newEntry={newEntry} handleChange={handleChange} diagnoses={diagnoses} handleSelectChange={handleSelectChange} />
          </div>
          <div>
            <TextField
              name="employerName"
              value={(newEntry as OccupationalHealthcareEntry).employerName}
              id="employerName"
              label="Employer Name"
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ margin: 1 }}
            />
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1 }}>
            <Typography variant="subtitle1" sx={{ color: 'grey' }}>Sickleave</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                type="date"
                name="sickLeave.startDate"
                value={(newEntry as OccupationalHealthcareEntry).sickLeave?.startDate}
                id="sickleaveStartDate"
                label="Start date"
                variant="standard"
                onChange={handleChange}
                fullWidth
                sx={{ margin: 1 }}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                type="date"
                name="sickLeave.endDate"
                value={(newEntry as OccupationalHealthcareEntry).sickLeave?.endDate}
                id="sickleaveEndDate"
                label="End date"
                variant="standard"
                onChange={handleChange}
                fullWidth
                sx={{ margin: 1 }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
            }}
          >
            <Button type="submit" variant="outlined" color="success">
              Add
            </Button>
            <Button onClick={cancelForm} variant="outlined" color="error">
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default AddOccupationalEntryForm;
