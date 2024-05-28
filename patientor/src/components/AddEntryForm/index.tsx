import {
  Box,
  Button,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BaseEntryWithoutId, HealthCheckEntry } from "../../types";

interface AddEntryFormProps {
  newEntry: BaseEntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.SyntheticEvent) => void;
  resetForm: () => void;
}

const AddEntryForm = ({
  newEntry,
  handleChange,
  handleSubmit,
  resetForm,
}: AddEntryFormProps) => {
  const [formOpen, setFormOpen] = useState(false);

  const showForm = () => {
    setFormOpen(!formOpen);
  };

  const cancelForm = () => {
    setFormOpen(!formOpen);
    resetForm();
  };

  const submitForm = (event: React.SyntheticEvent) => {
    handleSubmit(event);
    setFormOpen(!formOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">AddEntryForm</Typography>
        <ToggleButton
          sx={{
            marginLeft: "10px",
            padding: "5px",
          }}
          value={formOpen ? "Close" : "Add"}
          onChange={showForm}
          color="primary"
        >
          {formOpen ? "Close" : "Add"}
        </ToggleButton>
      </Box>
      <Box
        sx={{
          display: formOpen ? "block" : "none",
          border: "1px dashed grey",
          p: 2,
          margin: 1,
        }}
      >
        <form onSubmit={submitForm}>
          <b>New HealthCheck Entry</b>
          <div>
            <TextField
              id="description"
              label="Description"
              variant="standard"
              fullWidth
              value={newEntry.description}
              name="description"
              onChange={handleChange}
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              id="date"
              name="date"
              value={newEntry.date}
              label="Date"
              variant="standard"
              fullWidth
              onChange={handleChange}
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              id="specialist"
              name="specialist"
              value={newEntry.specialist}
              onChange={handleChange}
              label="Specialist"
              variant="standard"
              fullWidth
              sx={{ margin: 1 }}
            />
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
          <div>
            <TextField
              id="diagnosis-codes"
              name="diagnosisCodes"
              value={newEntry.diagnosisCodes}
              label="Diagnosis codes"
              placeholder="Diagnosis codes(separate codes with ',' e.g. foo,bar,baz)"
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
    </Box>
  );
};

export default AddEntryForm;
