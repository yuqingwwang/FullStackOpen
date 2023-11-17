import diagnoses from '../../data/diagnoses';
import { DiagnosisEntry, NewDiagnosisEntry } from '../types';

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

const findById = (id: string): DiagnosisEntry | undefined => {
  const entry = diagnoses.find(p => p.code === id);
  if (!entry) return undefined;
  return {
    ...entry
  };
};

const addEntry = (entry: NewDiagnosisEntry): DiagnosisEntry => {
  const newDiaryEntry = {
    code: Math.random().toString(36).slice(2),
    ...entry
  };
  diagnoses.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  findById,
  addEntry
};
