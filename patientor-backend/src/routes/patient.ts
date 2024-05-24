/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsNoSsn());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const response = (patientService.getPatientById(id));
  if (!response) {
    res.status(404).send('Patient not found');
  } else {
    res.send(response);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addNewPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
