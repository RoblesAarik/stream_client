import React from "react";

const Input = (props) => {
  const { handleChange, name, placeholder, title, type, value } = props;
  return (
    <>
      <label htmlFor={name}>{title}</label>
      <input
        style={{ width: "60%", marginBottom: "15px" }}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
