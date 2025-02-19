import React from "react";
import wentWrong from "../../assets/SomethingWrong.png";
import empty from "../../assets/NotFound.png";
import Paragraph from "../../Common/Paragraph/Paragraph";
import "./SomethingWrong.css";

export const SomethingWrong = ({ responce }) => {
  const ClickRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div>
        <img
          className="WentWrong-Image"
          src={responce == "empty" ? empty : wentWrong}
          height={"150px"}
          width={"160px"}
        />
        <h2>
          {responce == "empty"
            ? "No data Found .... !"
            : "Oops... Something Went Wrong !"}
        </h2>
        {responce != "empty" && (
          <u className="Click-Refresh" onClick={ClickRefresh}>
            Click To Refresh The Page
          </u>
        )}
      </div>
    </>
  );
};
