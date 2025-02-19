import React, { useContext, useEffect, useState } from 'react'
import CustomerDetails from '../../Common/CustomerDetails/CustomerDetails'
import "./ScanBillComp.css"
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Table from '../Table/Table';
import { Url } from '../../Api/EndPoint';
import { api } from '../../Api/api';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../Route/Path';
import { ThemeContext } from '../../App';
const ScanBillComp = () => {

  const [data, setData] = useState();
  const [scanning, setScanning] = useState(false);
  const {TableTwo,setTableTwo,setAmount } = useContext(ThemeContext); 
  const [tableData, setTableData] = useState([]);
  const [Invoice, SetInvoice] = useState("O");
  const [manualEntry, setManualEntry] = useState(false);
  const [manualProductId, setManualProductId] = useState("");
  const Navigate = useNavigate();

  

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
  
  useEffect(() => {
    if (data) {
      Handle();
    }
  }, [data]);

  const Handle = async () => {
    try {
      const response = await api("POST", Url.GetProduct, data);

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
            } else {
              updatedData.push({ ...newProduct, quantity: 1 });
            }
          });

          return updatedData;
        });
      } else {
        console.warn("No products found or error in response.");
      }
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const initialData = [
    { label: "Total Products", input: "0", bool: false },
    { label: "Total Amount", input: "0", bool: false },
    { label: "Discount", input: "0", bool: true },
    { label: "Grand Total", input: "0", bool: false },
  ];

  const [DataTwo, setDataTwo,] = useState(initialData);

  useEffect(() => {
    const totalProductsCount = tableData.length;
    const totalAmountValue = tableData.reduce(
      (acc, product) => acc + product.rate * product.quantity,
      0
    );

    setDataTwo((prevData) =>
      prevData.map((item) => {
        if (item.label === "Total Products") {
          return { ...item, input: totalProductsCount.toString() };
        } else if (item.label === "Total Amount") {
          return { ...item, input: totalAmountValue.toString() };
        }
        return item;
      })
    );
  }, [tableData]);

  const handleDiscountChange = (e) => {
    const discountValue = e.target.value;

    setDataTwo((prevData) =>
      prevData.map((item) => {
        if (item.label === "Discount") {
          return { ...item, input: discountValue };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    const totalAmount = parseFloat(
      DataTwo.find((item) => item.label === "Total Amount")?.input || "0"
    );
    const discount = parseFloat(
      DataTwo.find((item) => item.label === "Discount")?.input || "0"
    );
  
    const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0;
    const grandTotal = totalAmount - discountAmount;
  
    setDataTwo((prevData) =>
      prevData.map((item) => 
        item.label === "Grand Total" ? { ...item, input: grandTotal.toFixed(2) } : item
      )
    );
  }, [DataTwo.find((item) => item.label === "Total Amount")?.input, DataTwo.find((item) => item.label === "Discount")?.input]);
  
  

  const HandleNavigate=()=>{
    setTableTwo(tableData)
    setAmount(DataTwo)
    if(tableData.length){
      Navigate(Path.InvoiceProcess)
    }
  }

  const getFormattedDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "."); // "23.10.2023"
    const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false });  // "11:21:43"
    
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
    <div>

       <div className='ScanBillComp-main'>
            <div  className='ScanBillComp-Parent'>
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
            {
              tableData &&
              <div className="ViewAgentComponent-Table-Div">
              <div className="tableScroll-container">
              <Table
                data={tableData}  
                setTableData={setTableData}
                isEditable={true}
                tableData={tableData}
                setTableTwo={setTableTwo}
                isdel={false}
              />
              </div>
              </div>
            }

           
            <div className='ScanBillComp-SecondDiv'>

              <div className="Barcode-div">
              {scanning && (
              <div className="Scanner-Container">
                <div>
                <button className="Close-Scanner" onClick={() => setScanning(false)}>✖</button>
                <BarcodeScannerComponent
                  width={220}
                  height={220}
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
              
              <br />
              
              </div>
              {manualEntry && (
                <>
                
                <div className="ScanBillComp-CustomerDetails mg">
                  <label className='Blue-text'>Enter Product Number:</label>
                  <input 
                    type="text" 
                    className='DiscountInput'
                    onChange={(e) =>   setManualProductId(e.target.value)} 
                  />
                </div>
                <div style={{display:"flex",justifyContent:"end"}}>
                <button 
                  className="Close-Scanner" 
                  onClick={() => {
                    setData(manualProductId);
                    setManualEntry(false);
                      }}>
                  Search
                </button>
                </div>

                </>
              )}
              <div className='Barcode-scan-button-div'>
              <button 
                  className='Barcode-scan-button' 
                  onClick={() => setScanning(true)}> Scan
                </button>

                  <button 
                    className='Barcode-scan-button' 
                    onClick={() => setManualEntry(true)}> 
                    Enter Product Id 
                  </button>
              </div>


              <div className='mgt'>
              {
                  DataTwo.map((value,index)=>(
                    <React.Fragment key={index}>
                      <CustomerDetails 
                        bool={value.bool}
                        className='ScanBillComp-CustomerDetails' 
                        label={value.label} 
                        value={value.input}
                        onChange={value.label === "Discount" ? handleDiscountChange : undefined}
                        />
                    </React.Fragment>

                  ))
              }
              </div>
            <button onClick={()=>{HandleNavigate()}} className='Button-blue'>Invoice Preview</button>
            </div>
           
            </div>



    </div>


  )
}

export default ScanBillComp
