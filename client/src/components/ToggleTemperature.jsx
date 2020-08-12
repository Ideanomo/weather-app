import React from "react";

const ToggleTemperature = ({ degreeType, handleRadioChange }) => {
  return (
    <React.Fragment>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          value="celsius"
          checked={degreeType === "celsius"}
          onChange={handleRadioChange}
          id="customRadio1"
          className="custom-control-input"
        />
        <label className="custom-control-label" htmlFor="customRadio1">
          Celsius
        </label>
      </div>
      <div className="custom-control custom-radio">
        <input
          type="radio"
          value="fahrenheit"
          checked={degreeType === "fahrenheit"}
          onChange={handleRadioChange}
          id="customRadio2"
          className="custom-control-input"
        />
        <label className="custom-control-label" htmlFor="customRadio2">
          Fahrenheit
        </label>
      </div>
    </React.Fragment>
  );
};
export default ToggleTemperature;
