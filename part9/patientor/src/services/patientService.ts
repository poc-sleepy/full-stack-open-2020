import { v1 as uuid } from 'uuid';

import { initPatients } from '../../data/patients';
import { Patient, NewPatient } from '../types';

const patients: Array<Patient> = initPatients;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsForFront = (): Omit<Patient, 'ssn' | 'entries'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatients = (newPatient: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

export default {
  getPatients,
  getPatientsForFront,
  findById,
  addPatients,
};
