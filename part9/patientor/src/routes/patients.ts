import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsForFront());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient === undefined) {
    res.sendStatus(404);
  } else {
    res.send(patient);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatients(newPatient));
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
