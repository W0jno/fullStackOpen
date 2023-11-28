type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export interface Diagnose {
    code: string;
    name: string;
    latin? : string;
}

export enum Gender {
    Male = 'male',
    Female = "female",
    Other = 'other'
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export interface BaseEntry{
    id: string,
    date: string,
    description: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code'] >
}
interface Discharge{
    date: string,
    criteria: string
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: Discharge;
}

interface SickLeave {
    startDate: string,
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
 type: "OccupationalHealthcare",
 employerName: string,
    sickLeave?: SickLeave,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn?: string,
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type newPatient = Omit<Patient, 'id'>
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type GetNonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>