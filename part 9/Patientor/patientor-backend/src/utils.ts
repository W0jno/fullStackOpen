import { newPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: string) : string =>{
    if(!name || !isString(name)){
        throw new Error("Invalid name")
    }

    return name
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseDate = (date: string) : string =>{
    if(!date || !isDate(date)){
        throw new Error("Invalid date");
    }
    return date
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender  = (gender: unknown) : Gender => {
    if(!gender || !isGender(gender) || !isString(gender)){
        throw new Error("Invalid gender")
    }
    
    return gender
}

const parseOccupation = (occupation: string) : string =>{
    if(!occupation || !isString(occupation)){
        throw new Error("Invalid occupation")
    }

    return occupation
}
const toNewPatientEntry = (object: any) : newPatient => {
    
    const newPatientEntry : newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: object.ssn,
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: [],
    }

    return newPatientEntry;
}

export default toNewPatientEntry;