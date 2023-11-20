import patientData from '../../data/patients'

import { Patient, GetNonSensitivePatientEntry} from "../types"

const patients:Patient[] = patientData as Patient[];

const getEntries = (): Patient[] =>{
    return  patients;
}
const getNonSensitiveEntries = (): GetNonSensitivePatientEntry[] =>{
    return patients.map(({id, name, dateOfBirth, gender, occupation}) =>({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
}

export default {
    getEntries,
    getNonSensitiveEntries
}