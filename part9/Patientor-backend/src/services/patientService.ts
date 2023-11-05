import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

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
    ...entry,
    entries: []
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  if (!entry) return undefined;
  return {
    ...entry,
    entries: []
  };
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};
