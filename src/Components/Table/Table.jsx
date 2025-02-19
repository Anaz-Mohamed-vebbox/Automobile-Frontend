import React, { useState, useEffect } from "react";
import "./Table.css";
import Button from "../../Common/Button/Button";
import DeleteIcon from '@mui/icons-material/Delete';
const Table = ({ columns, data = [], isButtons, tableData, setTableData, isEditable = false,isdel,setTableTwo }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      setHeadings(Object.keys(data[0]));
      setTableData(data);
    }
  }, [data]);

  const handleQuantityChange = (rowIndex, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);

    setTableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, quantity: quantity } : row
      )
    );
  };

  const handleDeleteRow = (rowIndex) => {
    setTableData((prevData) => prevData.filter((_, index) => index !== rowIndex));
    setTableTwo((prevData) => prevData.filter((_, index) => index !== rowIndex));
  };

  return (
    <>
      <table className="CommonTable">
        <thead className="CommonTablethead">
          <tr className="CommonTableth">
            {headings.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
            {
              (tableData.length>0  && isdel==true)&&
              <th>Action</th>
            }
            
          </tr>
        </thead>
        <tbody className="CommonTableTBody">
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="CommonTabletr">
              {headings.map((head, i) => (
                <td className="CommonTabletd" key={i}>
                  {head.toLowerCase() === "id"
                    ? rowIndex + 1
                    : head.toLowerCase() === "quantity" ? (
                        <input
                          type="number"
                          value={row.quantity || ""}
                          onChange={(e) => handleQuantityChange(rowIndex, e.target.value)}
                          className="AgeInput"
                          disabled={!isEditable} 
                        />
                      ) : head.toLowerCase() === "rate" ? (
                        row.rate
                      ) : (
                        row[head]
                      )}
                </td>
              ))}
              {
                isdel==true &&
                <td className="Tablebtntd" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                {isButtons && 
                  isButtons.map((btn, id) => (
                    <Button
                      key={id}
                      style={{ margin: "0px 3px" }}
                      className="Tablebtn"
                      Label={btn.btnname}
                      onClick={() =>
                        btn.onclick(row.MemberId ?? row.id, row.NomineeId, row.Historyid)
                      }
                    />
                  ))}
    
                {
                  isdel==true &&
                  <div  onClick={() => handleDeleteRow(rowIndex)}>
                  <DeleteIcon style={{color:"red"}}/>
                  </div>
                }

              </td>
              }

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
