import React from "react";
import "./LabelData.css"

export const LabelData = ({keys,Pair}) => {
  return (
    <div className="label-DataContainer">
      <p  className="LabelData-Pair">{keys}</p>
      <p className="LabelData-Value">{Pair}</p>
    </div>
  );
};
