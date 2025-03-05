import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Route/Path';
import Logout from '../../Common/Logout/Logout';
import Paragraph from '../../Common/Paragraph/Paragraph';
import Image from "../../assets/Logo.png"
import TextField from '../../Common/TextField/TextField';
import { inputData } from './Data';
import "./DashBoardComp.css"
import { ThemeContext } from '../../App';
import BreadCrum from '../../Common/BreadCrum/BreadCrum';
const DashBoardComp = () => {

  const {  setTheme,setTableTwo } = useContext(ThemeContext); 

  useEffect(()=>{
    setTableTwo([])
  },[])

  const keys = {
    Address: "",
    CustomerName: "",
    Emailid: "",
    PhoneNumber: "",
  };
  const [inputValue, setInputValue] = useState(keys);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const Navigate = useNavigate();

  const Handlechange = (value, name, type, works) => {
    if (works == "number" && !isNaN(value) && !value.includes(" ")) {
      setInputValue((prev) => ({ ...prev, [name]: value }));
    } else if (works == "text") {
      setInputValue((prev) => ({ ...prev, [name]: value }));
    }
  };
  const HandleForm_Submit = async (e,SetDisable) => {
    e.preventDefault();
    SetDisable(true);
    Navigate(Path.ScanBill)

    setTheme(inputValue) 
    
    SetDisable(false);

  };


  const HandleForm_ClearAll = (e) => {
    e.preventDefault();
    setInputValue(keys);
  };

  return (
    <div>
      <div className='DashBoardComp-Parent'>
      <Logout/>
      </div> 
      <div className='DashBoardComp-main'>
      <div  className='DashBoardComp-SubOne'>
      {!submitLoading && (
        <div className='DashBoardComp-TextField'>

      <TextField
        inputData={inputData}
        inputValue={inputValue}
        onChangeHandle={Handlechange}
        HandleForm_Submit={HandleForm_Submit}
        HandleForm_ClearAll={HandleForm_ClearAll}
      />
        </div>
      )}
      </div>


      <div>
      <div className="DashBoardComp-SubTwo">
          <div>

          <img src={Image} alt="person" className="person-Dash" />
          </div>
          </div>
      </div>

      </div>

      {/* {submitLoading ? (
        <LoadingIndicator
          submitNavigate={() => Navigate(Path.MarketingOverView)}
          setSubmitLoading={setSubmitLoading}
          ErrorMessage={ErrorMessage}
          submitLoading={submitLoading}
        />
      ) : null} */}


    </div>
  )
}

export default DashBoardComp
