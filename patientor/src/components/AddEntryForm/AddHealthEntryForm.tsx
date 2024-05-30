import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { Diagnosis, EntryWithoutId, HealthCheckEntry } from "../../types";
import BaseEntryForm from "./BaseEntryForm";

interface AddHealthEntryFormProps {
  newEntry: EntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: React.SyntheticEvent) => void;
  cancelForm: () => void;
  diagnoses: Diagnosis[];
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void;
}

const AddHealthEntryForm = ({ newEntry, submitForm, handleChange, cancelForm, diagnoses, handleSelectChange }: AddHealthEntryFormProps) => {


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
          <b>New HealthCheck Entry</b>
          <div>
            <BaseEntryForm newEntry={newEntry} handleChange={handleChange} diagnoses={diagnoses} handleSelectChange={handleSelectChange}/>
          </div>
          <div>
            <TextField
              name="healthCheckRating"
              value={(newEntry as HealthCheckEntry).healthCheckRating}
              id="healthcheck-rating"
              label="Healthcheck Rating"
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

export default AddHealthEntryForm;
