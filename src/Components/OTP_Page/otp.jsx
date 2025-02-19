import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Common/Button/Button";
import Paragraph from "../../Common/Paragraph/Paragraph";
import { Path } from "../../Route/Path";
import "./otp.css";

export default function Otp({
  length = 4,
  setPage,
  OnbackClick = () => {},
  verifyotp = () => {},
  handle_ressubmit,
  setincorrect=()=>{},
  incorrect="",
  disabled=false
}) {
  const navigate = useNavigate();
  const [otpval, setotpval] = useState("");
  const [otp, setotp] = useState(new Array(length).fill(""));
  const inputref = useRef([]);
  // console.log(inputref);
  useEffect(() => {
    if (inputref.current[0]) {
      inputref.current[0].focus();
    }
  }, []);
  var handlechangeotp = (index, e) => {
    setincorrect("");
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setotp(newOtp);
    var combainotp = newOtp.join("");
    setotpval(combainotp);
    //send for backend
    if (value && index < length - 1 && inputref.current[index + 1])
      inputref.current[index + 1].focus();
  };
  var handlekeydownotp = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && inputref.current[index - 1]) {
      inputref.current[index - 1].focus();
    }
  };
  var handleclickotp = (index) => {
    inputref.current[index].setSelectionRange(1, 1);
    if (index >= 0) {
      inputref.current[otp.indexOf("")].focus();
    }
  };

  return (
    <div className="content">
      <div className="left" style={{ backgroundColor: "white" }}>
        <span className="top">
          <h2>Enter Your OTP</h2>
        </span>
        <form action="" onSubmit={(e) => verifyotp(e, otpval)}>
          <div className="otp_section">
            {otp.map((value, index) => (
              <input
                type={"text"}
                key={index}
                ref={(input) => (inputref.current[index] = input)}
                onChange={(e) => handlechangeotp(index, e)}
                value={value}
                className="input2"
                onClick={() => {
                  handleclickotp(index);
                }}
                onKeyDown={(e) => {
                  handlekeydownotp(index, e);
                }}
              />
            ))}
          </div>
          {incorrect == "incorrect" && (
            <div className="error_section_otp">
              <label className="incorr_otp">* Otp is Incorrect</label>
            </div>
          )}
          <div className="button_box">
            <Button disabled={disabled} Label="Send" className="otp_button" />
          </div>

          <div className="resend_otp">
            <Paragraph
              text="Resend the OTP"
              onclick={handle_ressubmit}
              className="anchor"
            />
            <Paragraph
              text="Back"
              className="anchor"
              onclick={
                //   () => {
                //   navigate(Path.home);
                // }
                OnbackClick
              }
            
            />
          </div>
        </form>
      </div>
    </div>
  );
}
