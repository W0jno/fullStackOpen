import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Content from "./components/Content";
import axios from "axios";
import "./styles/app.css";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (allCountries) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((res) => {
          setAllCountries(res.data);
        });
    }
  }, []);

  return (
    <>
      <Filter
        setNewFilter={setNewFilter}
        allCountries={allCountries}
        setCountries={setCountries}
        newFilter={newFilter}
      />
      <Content countries={countries} setCountries={setCountries} />
    </>
  );
};

export default App;
