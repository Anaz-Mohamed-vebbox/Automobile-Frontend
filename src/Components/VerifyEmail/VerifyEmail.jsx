import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paragraph from "../../Common/Paragraph/Paragraph";
import MailIcon from "@mui/icons-material/Mail";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./VerifyEmail.css";
import Revenue from "../../assets/Revenue.gif";
import { Path } from "../../Route/Path";
import Otp from "../OTP_Page/otp";
import ForgetPass from "../ForgotPass/ForgotPass";
import { Url } from "../../Api/EndPoint";
import { api } from "../../Api/api";
import { ElevatorSharp } from "@mui/icons-material";

export default function VerifyEmail() {
  const [disable, setDisable] = useState(false);
  const [Emailval, setEmailval] = useState("");
  const [incorrect, setincorrect] = useState("");
  const [Page, setPage] = useState("Email");
  const navigate = useNavigate();

  const handlechange = (e) => {
    setEmailval(e.target.value);
    setincorrect("");
  };
  var handlesubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    try {
      const response = await api("POST", Url.verifyEmail, { Email: Emailval });
      if (response && response.message == "Success") {
        setPage("Otp");
      } else if (response && response.message == "Failed") {
        setincorrect("incorrect");
      } else {
        setincorrect("No");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setDisable(false);
  };
  const verifyotp = async (e, otp) => {
    e.preventDefault();
    setDisable(true);

    try {
      const response = await api("POST", Url.VerifyEmailOtp, { otp: otp });
      if (response && response.message == "Success") {
        setPage("Forgot");
      } else if (response && response.message == "Duplicate") {
        setincorrect("incorrect");
      } else {
        setincorrect("No");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setDisable(false);
  };
  const handlechange_pass = async (e, changepass) => {
    e.preventDefault();
    setDisable(true);

    if (changepass.Newpass === changepass.confirmpass) {
      try {
        const response = await api("POST", Url.ChangePassword, changepass);
        if (response && response.message == "Success") {
          alert("Password Changed");
          navigate(Path.home);
        } else {
          setincorrect("No");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setincorrect("incorrect");
    }
    setDisable(false);
  };
  return (
    <div className="signIn">
      {Page == "Email" && (
        <div className="content">
          <div className="left">
            <span className="top">
              <h2>Forgot Your Password ?</h2>
              <Paragraph
                text="Enter Your Email to receive your OTP"
                className="top_text"
              />
            </span>
            <form onSubmit={handlesubmit}>
              <div className="input">
                <span className="ic_box">
                  <MailIcon className="Icon" />
                  {/* <TbMailFilled /> */}
                  <Paragraph text="Email" />
                </span>
                <Input
                  type="email"
                  placeholder="Enter Your Email Address Here"
                  className="input_common"
                  onChangeHandle={handlechange}
                  required={true}
                />
                {incorrect == "incorrect" && (
                  <div className="error_section">
                    <label className="incorr">* Mail is Incorrect</label>
                  </div>
                )}
                {incorrect == "No" && (
                  <div className="error_section">
                    <label className="incorr">
                      * SomeThing Went Wrong Please Try Again
                    </label>
                  </div>
                )}
              </div>
              <div className="button_box">
                <Button
                  disabled={disable}
                  Label="Send"
                  className="otp_button"
                />
              </div>
              <div className="pre_next">
                <KeyboardBackspaceIcon />
                <Paragraph
                  text="Back to Login"
                  className="anchor"
                  onclick={() => {
                    navigate(Path.home);
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {Page == "Otp" && (
        <Otp
          setincorrect={setincorrect}
          incorrect={incorrect}
          verifyotp={verifyotp}
          handle_ressubmit={handlesubmit}
          setPage={setPage}
          disabled={disable}
          OnbackClick={()=>setPage("Email")}
        />
      )}
      {Page == "Forgot" && (
        <ForgetPass
          handlesubmit={handlechange_pass}
          setincorrect={setincorrect}
          incorrect={incorrect}
          Email={Emailval}
          disabled={disable}
        />
      )}

      <div className="right">
        <img src={Revenue} alt="person" />
      </div>
    </div>
  );
}
