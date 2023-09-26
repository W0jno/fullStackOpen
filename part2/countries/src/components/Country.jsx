import React from "react";

function Country({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>
        <p>capital: {country.capital}</p>
        <p>area: {country.area} </p>
        <p> population: {country.population}</p>
      </div>

      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, key) => {
            return <li key={key}>{language}</li>;
          })}
        </ul>
      </div>
      <img src={country.flags.png} />
    </div>
  );
}

export default Country;
