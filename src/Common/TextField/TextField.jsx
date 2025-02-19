import React, { useState } from "react";
import "./TextField.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useMediaQuery } from "@mui/material";
import Paragraph from "../Paragraph/Paragraph";
const TextField = ({
  inputData,
  bigData,
  BigClassName,
  HandleForm_Submit,
  onChangeHandle,
  inputValue,
  HandleForm_ClearAll,
  onClickFun,
  NotificationBar,
  Notify,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const [IsDisable , SetDisable] = useState(false)

  const handleMouseEnter = (e) => {
    e.target.classList.add("hovered");
  };

  const handleMouseLeave = (e) => {
    e.target.classList.remove("hovered");
  };

  return (
    // <div className="TextField-Parent">
    <div className="TextField-container">
      <form onSubmit={(e)=>HandleForm_Submit(e,SetDisable)}>
        <>
          <div
            className={
              bigData && !isSmallScreen
                ? BigClassName
                : "Mapping-InputContainer"
            }
          >
            {inputData.map(
              (data, i) =>
                !data.NotShow &&
                (data.type == "Select" ? (
                  <div key={i}>
                    <div className="LabelInput-container">
                      <div className="TextField-Child-One">
                        <label className="TextField-label">
                          {data.label} :
                        </label>
                      </div>
                      <div className="TextField-Child-div">
                        <select
                          className="TextField-input-select"
                          name={data.name}
                          required
                          onChange={(e) => {
                            onChangeHandle(
                              e.target.value,
                              e.target.name,
                              data.type,
                              data.works
                            );
                          }}
                        >
                          <option value="" disabled selected>
                            {data.thumnail}
                          </option>
                          {data["options"].map((val, index) => (
                            <option
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                              key={index}
                              value={val.id ? val.id : val.value}
                            >
                              {val.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : data.type == "Upload" ? (
                  <div className="LabelInput-container" key={i}>
                    <div className="TextField-Child-One">
                      <label className="TextField-label">{data.label} :</label>
                    </div>
                    <div className="uplaodBtn-container">
                      <Button
                        Label={data.Btn1}
                        type={"button"}
                        className={"Photo-button"}
                        onClick={() => onClickFun("Take-Photo", data.name)}
                      />
                      <Button
                        Label={data.Btn2}
                        type={"button"}
                        className={"Photo-button"}
                        onClick={() => onClickFun("Upload-Photo", data.name)}
                      />
                    </div>
                  </div>
                ) : data.type == "textarea" ? (
                  <div className="LabelInput-container">
                    <div className="TextField-Child-One">
                      <label className="TextField-label">{data.label} :</label>
                    </div>
                    <div className="TextField-Texarea-container">
                      <textarea
                        className="Text-field-Textarea"
                        placeholder={data.placeholder}
                        name={data.name}
                        onChange={(e) => {
                          onChangeHandle(
                            e.target.value,
                            e.target.name,
                            data.type,
                            data.works
                          );
                        }}
                        value={inputValue[data.name] || ""}
                        required={data.required}
                      ></textarea>
                    </div>
                  </div>
                ) : data.type == "radio" ? (
                  <div
                    key={i}
                    className="LabelInput-container"
                    style={{ display: "flex", alignItems: "start" }}
                  >
                    <div className="TextField-Child-One">
                      <label className="TextField-label">{data.label} :</label>
                      {data.labelDescription && (
                        <label className="TextField-description">
                          {data.labelDescription}
                        </label>
                      )}
                    </div>
                    <div className="TextField-RadioContainer">
                      <div className="TextField-RadioInner">
                        {data["options"].map((val, i) => (
                          <div className="TextField-RadioInnerBox" key={i}>
                            <Input
                              className="TextField-input"
                              type={data.type}
                              name={data.name}
                              placeholder={data.placeholder}
                              required={data.required}
                              id={val.value}
                              value={
                                val.value === inputValue[data.name]
                                  ? inputValue[data.name]
                                  : val.value
                              }
                              onChangeHandle={(e) =>
                                onChangeHandle(
                                  e.target.value,
                                  e.target.name,
                                  data.type,
                                  data.works
                                )
                              }
                              checked={
                                val.value === inputValue[data.name] || ""
                              }
                            />
                            <label
                              className="TextField-label"
                              htmlFor={val.value}
                            >
                              {val.value}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="LabelInput-container" key={i}>
                    <div className="TextField-Child-One">
                      <label className="TextField-label" htmlFor={data.name}>
                        {data.label} :
                      </label>
                      {data.labelDescription && (
                        <label className="TextField-description">
                          {data.labelDescription}
                        </label>
                      )}
                    </div>

                    <Input
                      className="TextField-input"
                      type={data.type}
                      name={data.name}
                      placeholder={data.placeholder}
                      required={data.required}
                      id={data.name}
                      onChangeHandle={(e) => {
                        onChangeHandle(
                          e.target.value,
                          e.target.name,
                          data.type,
                          data.works
                        );
                      }}
                      value={inputValue[data.name] || ""}
                      minLength={data.minLength && data.minLength}
                      maxLength={data.maxLength && data.maxLength}
                      disabled={data.disabled}
                    />
                  </div>
                ))
            )}
          </div>
          {(NotificationBar == false  && Notify) && (
            <Paragraph className="Notify-ALert-red" text={`*You Can Pay ${Notify} rs Only`} />
          )}
          <div className="Form-Submit-Button-Div">
            <Button
              Label={"Clear All"}
              className={"Form-Clear-Button"}
              onClick={HandleForm_ClearAll}
              type={"button"}
            />
            <Button
              Label={"Submit"}
              className={"Form-Submit-Button"}
              type={"submit"}
              disabled={IsDisable}
            />
          </div>
        </>
      </form>
    </div>
  );
};

export default TextField;
