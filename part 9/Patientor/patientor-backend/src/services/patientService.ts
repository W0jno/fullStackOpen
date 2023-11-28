import patientData from '../../data/patients'
import { v1 as uuid } from 'uuid'
import { Patient, GetNonSensitivePatientEntry, newPatient} from "../types"

const patients:Patient[] = patientData as Patient[];
const id = uuid()
const getEntries = (): Patient[] =>{
    return  patients;
}
const getNonSensitiveEntries = (): GetNonSensitivePatientEntry[] =>{
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
}

const getPatientUsingID = (id:string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const addPatient = (patient:newPatient) : Patient =>{
    const newPatient = {
        id: id,
        ...patient
    }

    patients.push(newPatient);
    return newPatient;

}

export default {
    getEntries,
    getNonSensitiveEntries,
     addPatient,
     getPatientUsingID

}