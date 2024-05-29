import { TextField } from "@mui/material";
import { BaseEntryWithoutId } from "../../types";

interface BaseEntryFormProps {
  newEntry: BaseEntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseEntryForm = ({newEntry, handleChange}: BaseEntryFormProps) => {
  return (
    <>
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
    </>
  );
};

export default BaseEntryForm;
