import React from "react";

import Country from "./Country";
function Content({ countries, setCountries }) {
  const setCountry = (e) => {
    const clickedCountry = [
      countries.find((country) => country.name.common === e.target.value),
    ];
    setCountries(clickedCountry);
  };

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && countries.length < 10) {
    return (
      <ul>
        {countries.map((country, key) => {
          return (
            <li key={key}>
              {country.name.common}
              <button value={country.name.common} onClick={setCountry}>
                show
              </button>
            </li>
          );
        })}
      </ul>
    );
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <p>Nothing has been found</p>;
  }
}

export default Content;
