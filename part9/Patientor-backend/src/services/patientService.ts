import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  {
    return patients.map((
      { id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
  }
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {

  const newPatientEntry = {
    id: Math.random().toString(36).slice(2),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};
