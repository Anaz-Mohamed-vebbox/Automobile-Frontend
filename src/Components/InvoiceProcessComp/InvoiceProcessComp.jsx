import React, { useContext, useEffect, useState } from 'react'
import CustomerDetails from '../../Common/CustomerDetails/CustomerDetails'
import Table from '../Table/Table'
import "./InvoiceProcess.css"
import { ThemeContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../Route/Path'
import { Url } from '../../Api/EndPoint'
import { api } from '../../Api/api'
import DownloadIcon from '@mui/icons-material/Download';
import jsPDF from "jspdf";
import "jspdf-autotable"; 

const InvoiceProcessComp = () => {

      const [tableData, setTableData] = useState([]);
      const { theme,TableTwo,Amount,setTableTwo } = useContext(ThemeContext);
      const [Invoice, SetInvoice] = useState("O");

 


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
      
      
      const [Dataset , setDataset] = useState()
      const Navigate = useNavigate();

      useEffect(() => {
        if (theme) {
          setDataset({
            customername: theme.CustomerName,
            contactnumber: theme.PhoneNumber,
            email: theme.Emailid,
            address: theme.Address,
          });
        }
      }, [theme]);
      
      

      const getFormattedDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, ".");
        const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false }); 
        
        return `${formattedDate} - ${formattedTime}`;
      };
      const HandleRefresh=()=>{
        Navigate(Path.dashboard)
      }
      
      const Data=[
        {
            label:"InVoice Number",
            input:`IN00${Invoice}`
        },
    
        {
            label:"Date and Time",
            input:getFormattedDateTime()
        },
    
      ]

      const [isDisabled, setIsDisabled] = useState(false);
      const HandleSubmit = async()=>{
          if(tableData.length){
            setIsDisabled(true);
            try {
              const response = await api("POST", Url.InsertDetails, Dataset);
              if (response.message == "Success") {
                console.log("Success");
                Navigate(Path.dashboard)
              } else {
                // console.log(response);
              }
            } 
            catch (error) {
              console.error("Error submitting form:", error);
            } 
          }

      }


    //   const HandleDownload = () => {
    //     if (!TableTwo || TableTwo.length === 0) {
    //         console.error("No data available to download.");
    //         return;
    //     }
    //     const doc = new jsPDF("portrait");
    //     const headers = [Object.keys(TableTwo[0])];
    //     const tableRows = TableTwo.map((item) => headers[0].map((key) => item[key]));
    
    //     doc.autoTable({
    //         head: headers,
    //         body: tableRows,
    //         startY: 10,
    //         theme: "grid",
    //         styles: { fontSize: 8 },
    //         margin: { left: 7, right: 7 },
    //     });
    
    //     doc.save(`Invoice.pdf`);
    // };
    
    const HandleDownload = () => {
      if (!TableTwo || TableTwo.length === 0) {
          console.error("No data available to download.");
          return;
      }
  
      const doc = new jsPDF("portrait");
  
      const customerDetails = {
          CustomerName: theme.CustomerName,
          PhoneNumber: theme.PhoneNumber,
          Emailid:theme.Emailid,
          Address: theme.Address,
          BillNo: `IN00${Invoice}`, 
          DateTime: getFormattedDateTime()
      };

      const totalProducts = Amount[0].input;
      const totalAmount = Amount[1].input;
      const discountPercentage = Amount[2].input;
      const discountedAmount = Amount[3].input;
  

      const addHeader = (doc) => {
          doc.setFontSize(10);
          doc.text(`Customer Name: ${customerDetails.CustomerName}`, 10, 10);
          doc.text(`Phone: ${customerDetails.PhoneNumber}`, 10, 15);
          doc.text(`Email: ${customerDetails.Emailid}`, 150, 10);
          doc.text(`Address: ${customerDetails.Address}`, 150, 15);
          doc.text(`Bill No: ${customerDetails.BillNo}`, 10, 22);
          doc.text(`Date: ${customerDetails.DateTime}`, 150, 22);
      };
  
      const addFooter = (doc) => {
          const pageHeight = doc.internal.pageSize.height; 
  
          doc.setFontSize(10);
          doc.text(`Total Products: ${totalProducts}`, 10, pageHeight - 20);
          doc.text(`Total Amount: ${totalAmount}`, 10, pageHeight - 15);
          doc.text(`Discount: ${discountPercentage}`, 150, pageHeight - 20);
          doc.text(`Final Amount: ${discountedAmount}`, 150, pageHeight - 15);
      };
  
      const headers = [Object.keys(TableTwo[0])];
      const tableRows = TableTwo.map((item) => headers[0].map((key) => item[key]));
  
     
      doc.autoTable({
          head: headers,
          body: tableRows,
          startY: 30,
          theme: "grid",
          styles: { fontSize: 8 },
          margin: { left: 7, right: 7 },
          didDrawPage: function () {
              addHeader(doc);
              addFooter(doc);
          }
      });
  
      doc.save(`Invoice.pdf`);
  };
  
  
  

  return (
    <div>
         <div className='InvoiceProcessComp-table mgt'>
         {
            !theme && 
            <button className='Button-blue-two' onClick={()=>{HandleRefresh()}}>
              Refresh
            </button>
          }
         </div>
         {
          theme && 
          <>
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

     
            <div className='InvoiceProcessComp-Down-main'>
                <div className='InvoiceProcessComp-Down'>
                <div>
                    <p className='Blue-text pd'>Customer Name :
                    <span className='Span-text'>{theme.CustomerName}</span>
                    </p>

                    <p className='Blue-text pd'>Phone Number :
                    <span className='Span-text'>{theme.PhoneNumber}</span>
                    </p>
                </div>


                <div>
                    <p className='Blue-text pd'>Emailid :
                    <span className='Span-text'>{theme.Emailid}</span>
                    </p>

                    <p className='Blue-text pd'>Address :
                    <span className='Span-text'>{theme.Address}</span>
                    </p>
                </div>
                </div>
          </div>
          </>
        }

        <div className='Download-div'>
        <button onClick={HandleDownload} className='Download-Icon'>
          <DownloadIcon style={{color:"white"}}/>
        </button>
        </div>

        {
              TableTwo &&
            <div className='InvoiceProcessComp-table'>
              <div className="Component-Table-Div">
              <div className="tableScroll-container">
              <Table isdel={true} setTableTwo={setTableTwo} data={TableTwo} tableData={tableData} setTableData={setTableData}/>
              </div>
              </div>
            </div>
        }


        {
          theme && 
          <>
                    <div className='InvoiceProcessComp-Down-main'>
                <div className='InvoiceProcessComp-Down'>
                <div>
                    <p className='Blue-text pd'>Total Products :
                    <span className='Span-text'>{Amount[0].input}</span>
                    </p>

                    <p className='Blue-text pd'>Total Amount :
                    <span className='Span-text'>{Amount[1].input}</span>
                    </p>
                </div>


                <div>
                    <p className='Blue-text pd'>Discount :
                    <span className='Span-text'>{Amount[2].input}</span>
                    </p>

                    <p className='Blue-text pd'>Grand Total :
                    <span className='Span-text'>{Amount[3].input}</span>
                    </p>
                </div>
                </div>
        </div>


        <div className='InvoiceProcessComp-completed-btn'>
        <button 
          disabled={isDisabled}  
          onClick={()=>{HandleSubmit()}} 
          className='Button-blue-two'>Submit
        </button>
        </div>
          </>
        }




    </div>
  )
}

export default InvoiceProcessComp
