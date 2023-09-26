import React from "react";

function Filter({ setNewFilter, allCountries, setCountries }) {
  const filterCountries = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setNewFilter(filterValue);
    const filteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().includes(filterValue);
    });
    setCountries(filteredCountries);
  };
  return (
    <div>
      find countries
      <form>
        <input onChange={filterCountries} />
      </form>
    </div>
  );
}

export default Filter;
