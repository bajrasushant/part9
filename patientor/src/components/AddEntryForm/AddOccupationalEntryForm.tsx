import { Box, Button, TextField } from "@mui/material";

import { EntryWithoutId, OccupationalHealthcareEntry } from "../../types";
import BaseEntryForm from "./BaseEntryForm";

interface AddOccupationalEntryFormProps {
  newEntry: EntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: React.SyntheticEvent) => void;
  cancelForm: () => void;
  setNewEntry: React.Dispatch<React.SetStateAction<EntryWithoutId>>;
}

const AddOccupationalEntryForm = ({
  newEntry,
  submitForm,
  handleChange,
  cancelForm,
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
            <BaseEntryForm newEntry={newEntry} handleChange={handleChange} />
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
          <div>
            <TextField
              name="sickLeave.startDate"
              value={(newEntry as OccupationalHealthcareEntry).sickLeave?.startDate}
              id="sickleaveStartDate"
              label="Sickleave Startdate"
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              name="sickLeave.endDate"
              value={(newEntry as OccupationalHealthcareEntry).sickLeave?.endDate}
              id="sickleaveEndDate"
              label="Sickleave Enddate"
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ margin: 1 }}
            />
          </div>
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
