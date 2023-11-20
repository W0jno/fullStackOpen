import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from "../utils"

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try{
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
    console.log("New patient added")
  } catch (err : unknown){
    let errorMessage = 'something went wrong';
    if (err instanceof Error){
      errorMessage += "Error: " + err.message;
    }
    res.status(400).send(errorMessage);
  }

});

export default router;