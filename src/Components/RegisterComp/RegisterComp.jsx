import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import "./RegisterComp.css";
import { inputData } from "./Data";
import TextField from "../../Common/TextField/TextField";
import { api } from "../../Api/api";
import { Url } from "../../Api/EndPoint";
import Logout from "../../Common/Logout/Logout";
import BreadCrum from "../../Common/BreadCrum/BreadCrum";
import Success from "../../Common/Success/Success";

const RegisterComp = () => {
  const [data, setData] = useState("");
  const [scanning, setScanning] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);
  const [Boolen, setBoolen] = useState(false)

  const keys = {
    ProductName: "",
    data: "",
    ProductRate: "",
  };

  const [inputValue, setInputValue] = useState(keys);

  useEffect(() => {
    if (!manualEntry) {
      setInputValue((prev) => ({ ...prev, data: data }));
    }
  }, [data, manualEntry]);

  const HandleChange = (value, name, type, works) => {
    if (works === "number" && !isNaN(value) && !value.includes(" ")) {
      setInputValue((prev) => ({ ...prev, [name]: value }));
    } else if (works === "text") {
      setInputValue((prev) => ({ ...prev, [name]: value }));
    }
  };

  const HandleForm_Submit = async (e) => {
    e.preventDefault();
    try {
      const response = await api("POST", Url.RegisterProduct, inputValue);
      if (response.message === "Success") {
        setInputValue(keys);
        setData("");
        alert("Dome")
      } else if (response.message === "AlreadyExists") {
        alert("Already Exists");
        setInputValue(keys);
        setData("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const HandleForm_ClearAll = (e) => {
    e.preventDefault();
    setInputValue(keys);
    setData("");
  };

  return (
    <div>
   
      <div className='DashBoardComp-Parent'>
        <Logout />
      </div>
      <div>
        <BreadCrum />
      </div>

      <div className="RegisterComp-parent">
        <div className="Barcode-div">
          {scanning && (
            <div>
             <div className="RegisterComp-Center">
             <button className="Close-Scanner mgt" onClick={() => setScanning(false)}>✖</button>
              </div>  
          
              <div className="Scanner-Container">
              <BarcodeScannerComponent
                width={230}
                height={230}
                onUpdate={(err, result) => {
                  if (result) {
                    setData(result.text);
                    setScanning(false);
                  }
                }}
              />
              </div>

            </div>
          )}
        </div>
      </div>

      <div className="Barcode-scan-button-div">
        <button
          className="Barcode-scan-button"
          onClick={() => {
            setScanning(!scanning);
            setManualEntry(false);
          }}>
          {scanning ? "Stop Scan" : "Scan"}
        </button>

        <button
          className="Barcode-scan-button"
          onClick={() => {
            setManualEntry(!manualEntry);
            setScanning(false);
            setData("");
          }}>
          {manualEntry ? "Use Scanner" : "Enter Product ID"}
        </button>
      </div>

      <div className="TextField-parent">
        <div>
          {data && !manualEntry && (
            <div className="RegisterComp-Scanned">
              <span className="mgt">Scanned Code:</span>
              <span className="mgt">{data}</span>
            </div>
          )}

          {manualEntry && (
            <div className="LabelInput-container">
              <label className="TextField-label">Enter Product ID:</label>
              <input
                type="text"
                className="TextField-input"
                placeholder="Enter the Product Number"
                value={inputValue.data}
                onChange={(e) => setInputValue((prev) => ({ ...prev, data: e.target.value }))}
              />
            </div>
          )}

          <div className="RegisterComp-TextField mgt">
            <TextField
              inputData={inputData}
              inputValue={inputValue}
              onChangeHandle={HandleChange}
              HandleForm_Submit={HandleForm_Submit}
              HandleForm_ClearAll={HandleForm_ClearAll}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComp;
