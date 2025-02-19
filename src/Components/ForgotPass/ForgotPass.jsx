import { useNavigate } from "react-router-dom";
import { Path } from "../../Route/Path";
import { useState } from "react";
import Paragraph from "../../Common/Paragraph/Paragraph";
import LockIcon from "@mui/icons-material/Lock";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
// import { Input } from "@mui/material";
import "./ForgotPass.css";

export default function ForgetPass({ Email,setincorrect=()=>{},incorrect="",handlesubmit }) {
  const navigate = useNavigate();
  const [changepass, setchangepass] = useState({
    Email: Email,
    Newpass: "",
    confirmpass: "",
  });
  // const [incorrect, setincorrect] = useState("");
  const inputval = (e) => {
    setchangepass({ ...changepass, [e.target.name]: e.target.value });
    setincorrect("");
  };
 
  return (
    <div className="content">
      <div className="left">
        <span className="top">
          <h2>Reset Password</h2>
          <Paragraph
            text="Enter Your New Password Below,We are just being extra safe"
            className="top_text"
          />
        </span>
        <form onSubmit={(e)=>handlesubmit(e,changepass)}>
          <div className="input">
            <span className="ic_box">
              <LockIcon className="Icon" />
              <Paragraph text="Password" />
            </span>
            <Input
              type="password"
              placeholder="Enter New Password"
              className="input_common"
              name="Newpass"
              onChangeHandle={inputval}
            />
          </div>
          <div className="input">
            <span className="ic_box">
              <LockIcon className="Icon" />
              <Paragraph text="Confirm Password" />
            </span>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="input_common"
              name="confirmpass"
              onChangeHandle={inputval}
            />
            {incorrect == "Empty" && (
              <div className="error_sect">
                <label className="inc">* Please Fill The Field</label>
              </div>
            )}
            {incorrect == "incorrect" && (
              <div className="error_sect">
                <label className="inc">* Confirm password doesn't match</label>
              </div>
            )}
          </div>

          <div className="button_box">
            <Button type={'submit'}  Label="Done" className="signIn_button" />
          </div>
        </form>
      </div>
    </div>
  );
}
