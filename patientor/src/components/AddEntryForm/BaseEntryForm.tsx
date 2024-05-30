import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { BaseEntryWithoutId, Diagnosis } from "../../types";

interface BaseEntryFormProps {
  newEntry: BaseEntryWithoutId;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diagnoses: Diagnosis[];
  handleSelectChange: (event: SelectChangeEvent<string[]>) => void;
}

const BaseEntryForm = ({
  newEntry,
  handleChange,
  diagnoses,
  handleSelectChange,
}: BaseEntryFormProps) => {
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
          type="date"
          name="date"
          label="Date"
          value={newEntry.date}
          variant="standard"
          fullWidth
          onChange={handleChange}
          sx={{ margin: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
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
        />{" "}
      </div>
      <div>
        {/* <TextField
          id="diagnosis-codes"
          name="diagnosisCodes"
          value={newEntry.diagnosisCodes}
          label="Diagnosis codes"
          placeholder="Diagnosis codes(separate codes with ',' e.g. foo,bar,baz)"
          variant="standard"
          onChange={handleChange}
          fullWidth
          sx={{ margin: 1 }}
        /> */}

        <FormControl sx={{ m: 1, minWidth: "300px" }}>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            value={newEntry.diagnosisCodes}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Diagnosis Codes:" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox
                  checked={newEntry.diagnosisCodes?.includes(diagnosis.code)}
                />
                <ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default BaseEntryForm;
