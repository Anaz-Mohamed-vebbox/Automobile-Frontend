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
import Logout from '../../Common/Logout/Logout'
import BreadCrum from '../../Common/BreadCrum/BreadCrum'
import NotFound from "../../assets/NotFound.png"

const InvoiceProcessComp = () => {

      const [tableData, setTableData] = useState([]);
      const {TableTwo,setTableTwo } = useContext(ThemeContext);
      const [Invoice, SetInvoice] = useState("O");

      const [invoiceDetails, setInvoiceDetails] = useState({
        totalProducts: 0,
        totalAmount: 0,
        discountAmount: 0,
        discountPercentage: 0,
      });
      
      useEffect(() => {
        if (TableTwo && TableTwo.length > 0) {
          const totalProductsCount = TableTwo.reduce((sum, item) => sum + item.quantity, 0);
          const totalAmountSum = TableTwo.reduce((sum, item) => sum + item.total, 0);
    
          const discountAmt = (totalAmountSum * invoiceDetails.discountPercentage) / 100;
    
          setInvoiceDetails((prev) => ({
            ...prev,
            totalProducts: totalProductsCount,
            totalAmount: totalAmountSum,
            discountAmount: discountAmt,
          }));
        }
      }, [TableTwo, invoiceDetails.discountPercentage]);



 
        useEffect(()=>{
          InVoice();
        },[])

        // console.log(invoiceDetails);
        
      
      
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
      
      
      const Navigate = useNavigate();

      const [inputValue, setInputValue] = useState({ data: "" });
      
      

      const getFormattedDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, ".");
        const formattedTime = now.toLocaleTimeString("en-GB", { hour12: false }); 
        
        return `${formattedDate} - ${formattedTime}`;
      };
      const HandleRefresh=()=>{
        Navigate(Path.Select)
      }
      
      const Data=[
        {
            label:"Invoice Number",
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
              const response = await api("POST", Url.InsertDetails, inputValue);
              if (response.message == "Success") {
                console.log("Success");
                Navigate(Path.Select)
                setTableTwo([]);
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
  
  //     const customerDetails = {
  //         PhoneNumber:inputValue.data,
  //         BillNo: `IN00${Invoice}`, 
  //         DateTime: getFormattedDateTime()
  //     };

  //     const totalProducts = invoiceDetails.totalProducts;
  //     const totalAmount = invoiceDetails.totalAmount;
  //     const discountPercentage = invoiceDetails.discountPercentage || 0;
  //     const discountedAmount = isNaN(invoiceDetails.discountAmount)
  //     ? invoiceDetails.totalAmount
  //     : invoiceDetails.totalAmount - invoiceDetails.discountAmount;
    
  

  //     const addHeader = (doc) => {
  //       doc.setFontSize(10);
        
  //       if (customerDetails.PhoneNumber) { 
  //           doc.text(`Phone: ${customerDetails.PhoneNumber}`, 10, 15);
  //       }
        
  //       doc.text(`Bill No: ${customerDetails.BillNo}`, 10, 22);
  //       doc.text(`Date: ${customerDetails.DateTime}`, 150, 22);
  //   };
    
  
  //     const addFooter = (doc) => {
  //         const pageHeight = doc.internal.pageSize.height; 
  
  //         doc.setFontSize(10);
  //         doc.text(`Total Products: ${totalProducts}`, 10, pageHeight - 20);
  //         doc.text(`Total Amount: ${totalAmount}`, 10, pageHeight - 15);
  //         doc.text(`Discount: ${discountPercentage}`, 150, pageHeight - 20);
  //         doc.text(`Final Amount: ${discountedAmount}`, 150, pageHeight - 15);
  //     };
  
  //     const headers = [Object.keys(TableTwo[0])];
  //     const tableRows = TableTwo.map((item) => headers[0].map((key) => item[key]));
  
     
  //     doc.autoTable({
  //         head: headers,
  //         body: tableRows,
  //         startY: 30,
  //         theme: "grid",
  //         styles: { fontSize: 8 },
  //         margin: { left: 7, right: 7 },
  //         didDrawPage: function () {
  //             addHeader(doc);
  //             addFooter(doc);
  //         }
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
        PhoneNumber: inputValue.data,
        BillNo: `IN00${Invoice}`,
        DateTime: getFormattedDateTime()
    };

    const totalProducts = invoiceDetails.totalProducts;
    const totalAmount = invoiceDetails.totalAmount;
    const discountPercentage = invoiceDetails.discountPercentage || 0;
    const discountedAmount = isNaN(invoiceDetails.discountAmount)
        ? invoiceDetails.totalAmount
        : invoiceDetails.totalAmount - invoiceDetails.discountAmount;

    const addHeader = (doc) => {
        doc.setFontSize(10);
        if (customerDetails.PhoneNumber) { 
            doc.text(`Phone: ${customerDetails.PhoneNumber}`, 10, 15);
        }
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
      useCORS: true,  // Ensures images & fonts load correctly
      didDrawPage: function () {
          addHeader(doc);
          addFooter(doc);
      }
  });
  
  
        doc.save("Invoice.pdf");

};

  const handleDiscountChange = (e) => {
    let newDiscount = Number(e.target.value) || 0;
  
    if (newDiscount > 100) {
      newDiscount = 100;
    } else if (newDiscount < 0) {
      newDiscount = 0;
    }
  
    setInvoiceDetails((prev) => ({
      ...prev,
      discountPercentage: newDiscount,
    }));
  };
  
  return (
    <div className='InvoiceProcessComp'>
      <div className='DashBoardComp-Parent'>
        <Logout />
      </div>
      {/* <div>
        <BreadCrum />
      </div> */}

         {
          (Data && TableTwo) && 
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
                  <input
                    type="text"
                    className="TextField-input-two"
                    placeholder="Enter the Contact Number"
                    value={inputValue.data}
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {  
                        setInputValue((prev) => ({ ...prev, data: value }));
                      }
                    }}/>

                <button onClick={HandleDownload} className='Download-Icon'>
                  <DownloadIcon style={{color:"white"}}/>
                </button>
                </div>
            </div>
          </>
        }


        {
              TableTwo &&
            <div className='InvoiceProcessComp-table'>
              <div className="Component-Table-Div mgt">
              <div className="tableScroll-container">
              <Table isdel={false} data={TableTwo} tableData={tableData} setTableData={setTableData}/>
              </div>
              </div>
            </div>
        }


        {
          TableTwo ?
          <>
               <div className='InvoiceProcessComp-Down-main'>
                <div className='InvoiceProcessComp-Down'>

                <div className='bottom-extra-class' >
                <div>

                    <p className='Blue-text pd'>Discount :
                    <input
                      type="number"
                      value={invoiceDetails.discountPercentage}
                      onChange={handleDiscountChange}
                      className="TextField-input-three"
                      maxLength={3}
                    />%
                    </p>

                    <p className='Blue-text pd'>Total Products :
                    <span className='Span-text'>{invoiceDetails.totalProducts}</span>
                    </p>


                </div>


                <div>
                    <p className='Blue-text pd extra-style' >Discount :
                        <span className='Span-text'>
                            {isNaN(invoiceDetails.discountAmount) ? 0 : invoiceDetails.discountAmount}
                        </span>
                    </p>

                    <p className='Blue-text pd'>Total :
                    <span className='Span-text'>{invoiceDetails.totalAmount}&#8377;</span>
                    </p>
                </div>
                </div>

                <div>

                <p className='Blue-text pd large'>Grand Total :
                    <span className='Span-text large'>
                        {isNaN(invoiceDetails.discountAmount) 
                            ? invoiceDetails.totalAmount 
                            : invoiceDetails.totalAmount - invoiceDetails.discountAmount}&#8377;
                            </span>
                </p>
                </div>
                </div>
        </div>


        <div className='btn-three-style'>
        <button 
          disabled={isDisabled}  
          onClick={()=>{HandleSubmit()}} 
          className='Button-blue-two'>Submit
        </button>
        </div>
          </>
          :
           <div style={{height:"80vh",display:"flex",alignItems:"center"}} className='img-no-data-div'>
                        <img src={NotFound} alt="" className='img-no-data' />
           </div>
        }

    </div>
  )
}

export default InvoiceProcessComp
