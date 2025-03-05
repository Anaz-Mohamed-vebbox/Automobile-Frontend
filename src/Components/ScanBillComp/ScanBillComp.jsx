import React, { useContext, useEffect, useState,useRef } from 'react'
import CustomerDetails from '../../Common/CustomerDetails/CustomerDetails'
import "./ScanBillComp.css"
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Table from '../Table/Table';
import { Url } from '../../Api/EndPoint';
import { api } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Route/Path';
import { ThemeContext } from '../../App';
import Logout from '../../Common/Logout/Logout';
import NotFound from "../../assets/NotFound.png"
import Success from '../../Common/Success/Success';
const ScanBillComp = () => {

  const [data, setData] = useState();
  const [scanning, setScanning] = useState(false);

  const {TableTwo,setTableTwo } = useContext(ThemeContext); 

  const [tableData, setTableData] = useState([]);
  const [Invoice, SetInvoice] = useState("O");
  const [manualEntry, setManualEntry] = useState(false);
  const [manualProductId, setManualProductId] = useState("");
  const Navigate = useNavigate();
  const inputRef = useRef(null);
  const [Boolen, setBoolen] = useState(false);

  useEffect(() => {
    if (manualEntry && inputRef.current) {
      inputRef.current.focus();
    }
  }, [manualEntry]);  
  

 

  useEffect(() => {
    if (TableTwo) {
      setTableData(TableTwo);
    }
  }, [TableTwo]);


  useEffect(()=>{
    InVoice();
  },[])




    const InVoice = async()=>{
      try {
        const response = await api("GET", Url.Get_Invoice);
        if (response.message == "Success") {
          SetInvoice(Number(response.invoice)+1)
        } else {
          // console.log(response);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      } 
    }
  


    const Handle = async () => {
     try {
        const response = await api("POST", Url.GetProduct, manualProductId);
    
        if (response?.message === "Success" && response.data?.length > 0) {
          setTableData((prevData) => {
            const updatedData = [...prevData];
    
            response.data.forEach((newProduct) => {
              const existingProductIndex = updatedData.findIndex(
                (item) => item.productnumber === newProduct.productnumber
              );
              
    
              if (existingProductIndex !== -1) {
                updatedData[existingProductIndex].quantity =
                  (updatedData[existingProductIndex].quantity || 1) + 1;
    
                updatedData[existingProductIndex].total = 
                  Number(updatedData[existingProductIndex].quantity) * Number(updatedData[existingProductIndex].rate || 0);
              } else {
                updatedData.push({ 
                  ...newProduct, 
                  quantity: 1, 
                  total: Number(newProduct.rate || 0) * 1 
                });
              }
            });
    
            return updatedData;
          });
        } 
        else if(response?.message === "Success" && response.data.length == 0){
          setBoolen(true)
        }
        else {
          // console.warn("No products found or error in response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

 
  
  

  const HandleNavigate=()=>{
    setTableTwo(tableData)
    if(tableData.length){
      Navigate(Path.InvoiceProcess)
    }
  }

  const getFormattedDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "."); 
    const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false });  
    
    return `${formattedDate} - ${formattedTime}`;
  };
  

  const Data=[
    {
        label:"InVoice Number",
        input:`IN00${Invoice}`
    },

    {
        label:"Date and Time",
        input:getFormattedDateTime()
    },  ]

  return (
    <div className='scanBill-main'style={{position:"relative"}}>
      <div className={Boolen ? "blur-class" : ""}>

      <div className='DashBoardComp-Parent'>
        <Logout />
      </div>
            <div className='ScanBillComp-main'>
                  <div  className='ScanBillComp-Parent-two'>
                  {
                    Data.map((value,index)=>(
                        <React.Fragment key={index}>
                          <CustomerDetails  label={value.label} value={value.input}/>
                        </React.Fragment>        
                      ))
                  }
                  </div>
            </div>

            <div className='flex'>
              <div  className="ViewAgentComponent-Table-Div mgt">
              {
              tableData.length>0 ?
              <div>
              <div className="tableScroll-container">
              <Table
                data={tableData}  
                setTableData={setTableData}
                isEditable={true}
                tableData={tableData}
                setTableTwo={setTableTwo}
                isdel={true}
              />
              </div>
              </div>
              :
              <div className='img-no-data-div'>
              <img src={NotFound} alt="" className='img-no-data' />
              </div>
              } 

             </div>
            <div  className='ScanBillComp-SecondDiv'>
              <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
              <div className="Barcode-div">
              {scanning && (
                <>
                <button className="Close-Scanner" onClick={() => setScanning(false)}>✖</button>
                <div className="Scanner-Container"> 
                <div style={{marginTop:"-20px"}}>
                <BarcodeScannerComponent
                  width={200}
                  height={150}
                  onUpdate={(err, result) => {
                    if (result) {
                      setData(result.text);
                      setScanning(false);
                    }
                  }}
                />
                </div>
              </div>
                </>
              )}

              {manualEntry && (
                <form className='scan-bill-form' onSubmit={() => {
                  setData(manualProductId);
                  setManualEntry(false);
                  Handle(manualProductId);
                    }}>   
                <div>
                <div className="ScanBillComp-CustomerDetails mg">
                  <label className='Blue-text-two'>Enter Product Number:</label>
                  <input 
                    type="text" 
                    className='DiscountInput'
                    ref={inputRef} 
                    onChange={(e) => setManualProductId(e.target.value)} 
                  />
                  
                </div>
                <div className='Close-Scanner-div' style={{display:"flex",justifyContent:"end"}}>
                <button className="Close-Scanner" >
                  Search
                </button>
                </div>
                </div>

                </form>
              )}
              
              </div>
              </div>

              <div className='Barcode-scan-button-div'>
              <button 
                  className='Barcode-scan-button' 
                  onClick={() =>{setManualEntry(false); setScanning(!scanning);}}> Scan
                </button>
                <button 
                className='Barcode-scan-button' 
                onClick={() => {
                  setManualEntry(!manualEntry);
                  setScanning(false);
                }}> 
                Enter Product Id 
              </button>
              </div>
            </div>
            </div>
            <div className='ScanBillComp-Button-btn' >
            <button onClick={()=>{HandleNavigate()}} className='Button-blue-three'>Checkout</button> 
            </div>
    </div>

    {Boolen ==  true && <Success setBoolen={setBoolen} message={"No Data Found"}/>}
    </div>


  )
}

export default ScanBillComp
