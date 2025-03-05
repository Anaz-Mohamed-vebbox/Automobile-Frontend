import React, { useEffect, useState } from "react";
import TableTwo from "../Table/TableTwo";
import "./ShowProduct.css";
import { Url } from "../../Api/EndPoint";
import { api } from "../../Api/api";
import DataFound from "../../assets/NoDataFound.jpg";
import Logout from "../../Common/Logout/Logout";
import { useNavigate } from "react-router-dom";
import BreadCrum from "../../Common/BreadCrum/BreadCrum";

const ShowProductComp = () => {
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    HandleGet();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredData(tableData);
    } else {
      setFilteredData(
        tableData.filter(
          (item) =>
            item.productname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.productnumber.toString().includes(searchTerm)
        )
      );
    }
  }, [searchTerm, tableData]);

  const HandleGet = async () => {
    try {
      const response = await api("GET", Url.get_AllProducts);
      if (response.message === "Success") {
        setTableData(response.data);
        setFilteredData(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRowDelete = async (rowToDelete) => {
    try {
      const response = await api("POST", Url.delete_Product, rowToDelete);
      if (response.message === "Success") {
        HandleGet();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleRowUpdate = async (updatedRow) => {
    try {
      const response = await api("POST", Url.update_Products, updatedRow);
      if (response.message === "Success") {
        HandleGet();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const Navigate = useNavigate();
  const Handle = () => {
    Navigate(-1);
  };


  return (
    <>
      <div className='DashBoardComp-Parent'>
        <Logout />
      </div>

      <div cla style={{ display: "flex", justifyContent: "center" }}>
        <p className="ShowProductComp-Para">View All Products</p>
      </div>

    
      <div className="ShowProductComp-parent-input">
      <div className="ShowProductComp-input-div">
      <div>
        <BreadCrum/>
      </div>
      <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ShowProductComp-input-"/>
      </div>
      </div>
          
      <div className="ShowProductComp-main mgt">


        {filteredData.length === 0 ? (
          <div>
            <img className="ShowProductComp-img" src={DataFound} alt="No Data Found" />
          </div>
        ) : (
          <div className="ShowProductComp-Table-Div">
            <div className="tableScroll-container">
              <TableTwo data={filteredData} onRowUpdate={handleRowUpdate} onRowDelete={handleRowDelete} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowProductComp;
