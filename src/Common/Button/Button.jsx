import React from "react";
import "./Button.css";
import Loder from "../../Components/Loder/Loder";

const Button = ({
  Label,
  className,
  onClick,
  style,
  icon,
  type,
  disabled = false,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={className}
        style={
          disabled
            ? {
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                opacity: 0.7,
              }
            : style
        }
        disabled={disabled}
      >   
        {disabled ? (
          <div style={{ transform: "scale(0.5)" }}>
            <Loder color={true} />
          </div>
        ) : (
          <>
            {Label}
            {icon}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
