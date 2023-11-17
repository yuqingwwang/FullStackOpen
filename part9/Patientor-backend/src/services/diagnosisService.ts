import diagnoses from '../../data/diagnoses';
import { DiagnosisEntry } from '../types';

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

export default {
  getEntries,
  addDiary,
  findById
};
