import diagnoseData from '../../data/diagnoses'

import { Diagnose} from "../types"

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] =>{
    return diagnoses.map(({code, name, latin}) =>({
        code,
        name,
        latin
    }));
}

export default {
    getEntries
}