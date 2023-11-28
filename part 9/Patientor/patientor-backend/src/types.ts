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
export interface Entry {
}
export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
export type newPatient = Omit<Patient, 'id'>

export type GetNonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>