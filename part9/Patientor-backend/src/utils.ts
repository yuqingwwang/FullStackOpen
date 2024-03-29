import { NewPatientEntry, Gender, NewDiagnosisEntry} from "./types";
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);

  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};


export const toNewPatientEntry = (object: unknown) : NewPatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing object: ' + object);
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
  const newPatientEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newPatientEntry;
  }
  throw new Error('Incorrect or missing object: ' + object);
};

export const toNewDiagnosisEntry = (object: unknown): NewDiagnosisEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing object: ' + object);
  }

  if('name' in object && 'latin' in object){
    const newDiagnosisEntry: NewDiagnosisEntry = {
      name: parseName(object.name),
      latin: parseName(object.latin)
    };

    return newDiagnosisEntry;
  }
  throw new Error('Incorrect or missing object: ' + object);
};
