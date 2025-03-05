import React, { useState, useEffect } from "react";
import "./Table.css";
import Button from "../../Common/Button/Button";
import DeleteIcon from '@mui/icons-material/Delete';

const Table = ({ columns, data = [], isButtons, tableData, setTableData, isEditable = false,isdel,setTableTwo }) => {

    useEffect(() => {
      if (data.length > 0) {
        setTableData(data);
      }
    }, [data]);
  
    const HandleSub = (rowIndex) => {
      setTableData((prevData) =>
        prevData.map((row, index) =>
          index === rowIndex
            ? { 
                ...row, 
                quantity: row.quantity > 1 ? row.quantity - 1 : 1,
                total: row.quantity > 1 ? Number(row.rate) * Number(row.quantity - 1) : Number(row.rate)
              }
            : row
        )
      );
    };
    
    const HandleAdd = (rowIndex) => {
      setTableData((prevData) =>
        prevData.map((row, index) =>
          index === rowIndex
            ? { 
                ...row, 
                quantity: (row.quantity || 0) + 1,
                total: row.rate ? (row.quantity + 1) * row.rate : 0
              }
            : row
        )
      );
    };
    
    
  
const handleDeleteRow = (rowIndex) => {
  if (!tableData) {
    console.error("tableData or setTableData is undefined");
    return;
  }

  setTableData((prevData) => prevData.filter((_, index) => index !== rowIndex));

};

  return (
    <table className="CommonTable">
      {
        !isdel &&
        <thead className="CommonTablethead">
        <tr className="CommonTableth">
          <td className="Head-Table">P.Name</td>
          <td className="Head-Table">quantity</td>
          <td className="Head-Table">Rate</td>
        </tr>
      </thead>
      }

      <tbody className="CommonTableTBody">
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex} className="CommonTabletr">
            <td className="CommonTabletd font-weight" >{row.productname}</td>

          <td  className="CommonTabletd td-xtra table-extra-style">

           <div className="td-btn-div" >
          {
            isdel &&  <button className="Add-btn" onClick={() => HandleSub(rowIndex)}>-</button>
          }
          
            <h2 className="h1-qty">{row.quantity || 0}</h2>
          {
            isdel && <button className="Add-btn" onClick={() => HandleAdd(rowIndex)}>+</button>
          }
            
           </div>
          </td>


            <td className="CommonTabletd">&#8377;{row.total}</td>

            {isdel && (
              <td className="Tablebtntd" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <DeleteIcon style={{ color: "red", cursor: "pointer",marginTop:"5px" }} onClick={() => handleDeleteRow(rowIndex)} />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
