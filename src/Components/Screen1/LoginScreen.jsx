import React, { useEffect, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import Paragraph from "../../Common/Paragraph/Paragraph";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import "./LoginScreen.css";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import { Path } from "../../Route/Path";
import Image from "../../assets/Logo.png"
import { api } from "../../Api/api";
import { Url } from "../../Api/EndPoint";
import Loder from "../Loder/Loder";

export const LoginScreen = () => {
  const navigate = useNavigate();

  const [wentWrong, setWentWrong] = useState("");
  const [load, setLoad] = useState(false);
  const [loginval, setloginval] = useState({
    Mail: "",
    Password: "",
  });
  var inputval = (e) => {
    setloginval({ ...loginval, [e.target.name]: e.target.value });
  };
  const verify = async () => {
    let responce = await api("POST", Url.adminLogin, loginval);
    // console.log(responce);

    if (responce.message == "success") {
      localStorage.setItem("token", responce.token);
      localStorage.setItem("user_id", loginval.Mail);
      setWentWrong("");
      navigate(Path.Select);
    } else if (responce.message == "Failed") {
      setWentWrong("Failed");
    } else {
      setWentWrong("Wrong");
    }
  };

  var handleSubmit = (e) => {
    if (loginval.Mail.includes("@gmail.com") && loginval.Password != "") {
      e.preventDefault();
      setWentWrong("Loading");
      verify();
    }
  };
  useEffect(() => {
    const get = async () => {
      const response = await api("POST", Url.VerifyToken);
      if (response && response.message == "success") {
        localStorage.setItem("token", response["token"]);    
        navigate(Path.Select);
      } else {
        setLoad(true);
      }
    };
    get();
  }, []);

  return (
    <>
      {load ? (
        <div className="signIn">
         <div className="right bg-blue">
          <div>
          <Paragraph
           text="Automobiles Parts Billing"
           className="Heading-Text"
          />
          <img src={Image} alt="person" className="person" />
          </div>
          </div>
          <div  className="content">
            <div className="left">
              <span className="top">
                <h2>Log in to your Account</h2>
                <Paragraph
                  text="Welcome back! Select method to log in"
                  className="top_text"
                />
              </span>
              <form>
                <div className="input">
                  <span className="ic_box">
                    <MailIcon className="ic" />
                    <Paragraph text="Email" />
                  </span>
                  <Input
                    type="email"
                    placeholder="Enter Your Email Address Here"
                    className="input_common"
                    onChangeHandle={inputval}
                    name="Mail"
                    required={true}
                  />
                </div>
                <div className="input">
                  <span className="ic_box">
                    <LockIcon className="ic" />
                    <Paragraph text="Password" />
                  </span>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    className="input_common"
                    onChangeHandle={inputval}
                    name="Password"
                    required={true}
                  />
                </div>
                <div className="Login-alerts">
                  {wentWrong == "Failed" ? (
                    <p>* Invalid Email Or Password</p>
                  ) : (
                    wentWrong == "Wrong" && (
                      <p>* Something Went Wrong Please Try again</p>
                    )
                  )}
                </div>
                <div className="forget_pass">
                  <Paragraph
                    text="Forget Password ?"
                    className="anchor"
                    onclick={() => {
                      navigate(Path.EmailVerify);
                    }}
                  />
                </div>
                <div className="button_box">
                  <Button
                    Label="Login   In"
                    className="signIn_btn"
                    onClick={handleSubmit}
                    disabled={wentWrong == "Loading"}
                  />
                </div>
              </form>
            </div>
          </div>

        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loder />
        </div>
      )}
    </>
  );
};
