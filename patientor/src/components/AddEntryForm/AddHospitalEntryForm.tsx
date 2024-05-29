import { Box, Button, TextField } from "@mui/material";

import { EntryWithoutId, HospitalEntry } from "../../types";
import BaseEntryForm from "./BaseEntryForm";

interface AddHospitalEntryFormProps {
  newEntry: EntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: React.SyntheticEvent) => void;
  cancelForm: () => void;
  setNewEntry: React.Dispatch<React.SetStateAction<EntryWithoutId>>;
}

const AddHospitalEntryForm = ({
  newEntry,
  submitForm,
  handleChange,
  cancelForm,
}: AddHospitalEntryFormProps) => {
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
          <b>New Hospital Entry</b>
          <div>
            <BaseEntryForm newEntry={newEntry} handleChange={handleChange} />
          </div>
          <div>
            <TextField
              name="discharge.date"
              value={(newEntry as HospitalEntry).discharge.date}
              id="dischargeDate"
              label="Discharge Date"
              variant="standard"
              onChange={handleChange}
              fullWidth
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              name="discharge.criteria"
              value={(newEntry as HospitalEntry).discharge.criteria}
              id="dischargeCriteria"
              label="Discharge Criteria"
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

export default AddHospitalEntryForm;
