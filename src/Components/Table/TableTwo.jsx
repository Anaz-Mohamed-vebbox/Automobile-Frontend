import React, { useState, useEffect } from "react";
import "./Table.css";

const TableTwo = ({ data, onRowUpdate, onRowDelete }) => {
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  const handleEdit = (rowIndex) => {
    setEditRow(rowIndex);
  };

  const handleChange = (e, rowIndex, col) => {
    let value = e.target.value;

    if (col === "rate" && !/^\d*$/.test(value)) return; 
    const newData = [...editedData];
    newData[rowIndex] = { ...newData[rowIndex], [col]: value };
    setEditedData(newData);
  };

  const handleSave = () => {
    if (editRow !== null) {
      onRowUpdate(editedData[editRow]);
    }
    setEditRow(null);
  };

  return (
    <table className="CommonTable">
      <thead className="CommonTablethead">
        <tr className="CommonTableth">
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="CommonTableTBody">
        {editedData.map((row, rowIndex) => (
          <tr key={rowIndex} className="CommonTabletr">
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="CommonTabletd">
                {editRow === rowIndex && (col === "productname" || col === "rate") ? (
                  <input
                    type="text"
                    value={row[col] || ""}
                    onChange={(e) => handleChange(e, rowIndex, col)}
                    className="TableInput"
                  />
                ) : (
                  row[col]
                )}
              </td>
            ))}
            <td>
              {editRow === rowIndex ? (
                <button className="table-save-button" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="table-save-button" onClick={() => handleEdit(rowIndex)}>
                  Edit
                </button>
              )}
              <button className="table-delete-button mgl" onClick={() => onRowDelete(row)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTwo;
