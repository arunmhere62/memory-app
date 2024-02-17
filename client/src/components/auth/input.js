import React from "react";
import "../../style.css"
const Input = ({ type, placeholder, onChange, name, value }) => {
  return (
    <div>
      <input
        className="inputStyle"
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
