import React, { useState } from "react";
import './SortingOptions.css';

const SortingOptions = (props) => {
  const [stateValue, setValue] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const { onChange } = props;
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select className="select-css" value={stateValue} onChange={handleChange}>
      <option value=""></option>
      <option value="name_asc">A -> Z</option>
      <option value="name_desc">Z -> A</option>
      <option value="rating">Rating</option>
    </select>
  );
};

export default SortingOptions;
