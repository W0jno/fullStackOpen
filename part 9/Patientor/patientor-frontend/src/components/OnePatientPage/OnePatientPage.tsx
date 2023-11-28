import axios from "axios";
import { Patient } from "../../types";
import { apiBaseUrl } from "../../constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
function OnePatientPage() {
  const [patient, setPatient] = useState<Patient>();
  let { id } = useParams();
  const getInfo = async () => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    setPatient(data);
  };

  useEffect(() => {
    getInfo();
  }, [id]);

  return (
    <>
      {" "}
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default OnePatientPage;
