import React, { useEffect, useState } from "react";
import TableTwo from "../Table/TableTwo";
import "./ShowProduct.css";
import { Url } from "../../Api/EndPoint";
import { api } from "../../Api/api";
import DataFound from "../../assets/NoDataFound.jpg"
import BreadCrum from "../../Common/BreadCrum/BreadCrum";
import Logout from "../../Common/Logout/Logout";
import { useNavigate } from "react-router-dom";

const ShowProductComp = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    HandleGet();
  }, []);

  const HandleGet = async () => {
    try {
      const response = await api("GET", Url.get_AllProducts);
      if (response.message === "Success") {
        setTableData(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const handleRowDelete = async (rowToDelete) => {
    console.log(rowToDelete);
    try {
      const response = await api("POST", Url.delete_Product, rowToDelete);
      if(response.message == "Success"){
        console.log("Success");
        HandleGet();
      }
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRowUpdate = async(updatedRow) => {
          try {
            const response = await api("POST", Url.update_Products, updatedRow);
            if(response.message == "Success"){
              console.log("Success");
              HandleGet();
            }
          } 
          catch (error) {
            console.error("Error fetching data:", error);
          }
  };

    const Navigate = useNavigate();
    const Handle = ()=>{
      Navigate(-1)
    }

  return (
    <>

      <div className='DashBoardComp-Parent'>
      <Logout/>
      </div>
        <div className="ShowProductComp-main"> 
        {tableData.length == 0 && (
          <div>
            <img className="ShowProductComp-img" src={DataFound} alt="" />
          </div>
        )}
        {tableData.length > 0 && (
          <div className="ShowProductComp-Table-Div">
            <div className=".tableScroll-container">
            <TableTwo data={tableData} onRowUpdate={handleRowUpdate}  onRowDelete={handleRowDelete}/>
            </div>
          </div>
        )}
        </div>
    </>
  );
};

export default ShowProductComp;
