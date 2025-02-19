  import React from "react";
  import "./Input.css";
  const Input = ({
    type = "text",
    name = "default",
    id,
    className,
    placeholder,
    onChangeHandle,
    required,
    value,
    checked,
    maxLength,
    minLength,
    disabled=false
  }) => {
    return (
      <input
        className={className}
        onChange={onChangeHandle}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        required={required}
        value={value}
        checked={checked}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
    );
  };

  export default Input;
