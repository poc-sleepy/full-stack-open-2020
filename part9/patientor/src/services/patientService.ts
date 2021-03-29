import patientsEntries from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientsEntries;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsForFront = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatients = () => {
  return null;
};

export default {
  getPatients,
  getPatientsForFront,
  addPatients,
};
