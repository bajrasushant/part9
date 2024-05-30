import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  BaseEntryWithoutId,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import AddHealthEntryForm from "./AddHealthEntryForm";
import AddHospitalEntryForm from "./AddHospitalEntryForm";
import AddOccupationalEntryForm from "./AddOccupationalEntryForm";

interface AddEntryFormProps {
  handleSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}
const AddEntryForm = ({ handleSubmit, diagnoses }: AddEntryFormProps) => {
  const [formOpen, setFormOpen] = useState(false);
  const formType = ["HealthCheck", "Occupational", "Hospital"];
  const [selectedForm, setSelectedForm] = useState("");

  const showOrUnshowForm = () => {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };

  const baseEntryState: BaseEntryWithoutId = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  };

  const initialHealthEntryState: EntryWithoutId = {
    ...baseEntryState,
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating.Healthy,
  };

  const initialHospitalEntryState: EntryWithoutId = {
    ...baseEntryState,
    type: "Hospital",
    discharge: {
      criteria: "",
      date: "",
    },
  };

  const initialOccupationalEntryState: EntryWithoutId = {
    ...baseEntryState,
    type: "OccupationalHealthcare",
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
  };

  const [newEntry, setNewEntry] = useState<EntryWithoutId>(
    initialHealthEntryState,
  );

  const getInitialState = (formType: string): EntryWithoutId => {
    switch (formType) {
      case "Hospital":
        return initialHospitalEntryState;
      case "Occupational":
        return initialOccupationalEntryState;
      default:
        return initialHealthEntryState;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Split the name by '.' to handle nested values
    const nameParts = name.split(".");

    // Check if the name is nested
    if (nameParts.length > 1) {
      const [parentName, childName] = nameParts;

      if (parentName === "discharge" && (newEntry as HospitalEntry).discharge) {
        setNewEntry((prev) => ({
          ...prev,
          discharge: {
            ...(prev as HospitalEntry).discharge,
            [childName]: value,
          },
        }));
      } else if (
        parentName === "sickLeave" &&
        (newEntry as OccupationalHealthcareEntry).sickLeave
      ) {
        setNewEntry((prev) => ({
          ...prev,
          sickLeave: {
            ...(prev as OccupationalHealthcareEntry).sickLeave,
            [childName]: value,
          },
        }));
      }
    } else {
      setNewEntry((prev) => ({
        ...prev,
        [name]: name === "healthCheckRating" ? Number(value) : value,
      }));
    }
  };

  const resetForm = () => {
    setNewEntry(getInitialState(selectedForm));
  };

  const cancelForm = () => {
    resetForm();
    setFormOpen(false);
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleSubmit(newEntry);
    setFormOpen(false);
    resetForm();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const formType = event.target.value as string;
    setSelectedForm(formType);
    setNewEntry(getInitialState(formType));
  };

  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedCodes = event.target.value;
    const codes =
      typeof selectedCodes === "string"
        ? selectedCodes.split(",")
        : selectedCodes;
    console.log(selectedCodes);
    setNewEntry((prev) => ({
      ...prev,
      diagnosisCodes: codes,
    }));
  };

  const renderForm = () => {
    switch (selectedForm) {
      case "HealthCheck":
        return (
          <AddHealthEntryForm
            diagnoses={diagnoses}
            newEntry={newEntry}
            submitForm={submitForm}
            cancelForm={cancelForm}
            handleSelectChange={handleMultiSelectChange}
            handleChange={handleChange}
          />
        );
      case "Hospital":
        return (
          <AddHospitalEntryForm
            diagnoses={diagnoses}
            newEntry={newEntry}
            submitForm={submitForm}
            cancelForm={cancelForm}
            handleChange={handleChange}
            handleSelectChange={handleMultiSelectChange}
            setNewEntry={setNewEntry}
          />
        );
      case "Occupational":
        return (
          <AddOccupationalEntryForm
            diagnoses={diagnoses}
            newEntry={newEntry}
            submitForm={submitForm}
            cancelForm={cancelForm}
            handleSelectChange={handleMultiSelectChange}
            handleChange={handleChange}
            setNewEntry={setNewEntry}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">New Entry</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FormControl>
            <InputLabel>Entry Type:</InputLabel>
            <Select
              value={selectedForm}
              label="Form Type"
              onChange={handleSelectChange}
              sx={{ minWidth: 200 }}
            >
              {formType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButton
            sx={{
              marginLeft: "10px",
              padding: "10px",
            }}
            value={formOpen ? "Close" : "Show"}
            onChange={showOrUnshowForm}
            color="primary"
            disabled={!selectedForm}
          >
            {formOpen ? "Close" : "Show"}
          </ToggleButton>
        </Box>
        {formOpen && renderForm()}
      </Box>
    </>
  );
};

export default AddEntryForm;
