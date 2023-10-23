export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other"
}


export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
