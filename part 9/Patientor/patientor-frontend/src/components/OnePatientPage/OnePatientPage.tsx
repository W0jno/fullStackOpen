import axios from "axios";
import { Patient, Diagnosis } from "../../types";
import { apiBaseUrl } from "../../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
function OnePatientPage() {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  let { id } = useParams();
  const getInfo = async () => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    setPatient(data);
  };

  const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    setDiagnoses(data);
  };

  useEffect(() => {
    getInfo();
    getDiagnoses();
  }, [id]);

  return (
    <>
      {patient ? (
        <>
          <h2>
            {" "}
            {patient.name}{" "}
            {patient.gender === "male" ? (
              <MaleIcon />
            ) : patient.gender === "female" ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
          <h3>Entries </h3>
          {patient?.entries.map((e) => {
            return (
              <div key={e.id}>
                <p>
                  {e.date} {e.description}
                </p>
                {e.diagnosisCodes?.map((d, key) => {
                  return (
                    <li key={key}>
                      {d} {diagnoses?.find((c) => c.code === d)?.name}
                    </li>
                  );
                })}
              </div>
            );
          })}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default OnePatientPage;
