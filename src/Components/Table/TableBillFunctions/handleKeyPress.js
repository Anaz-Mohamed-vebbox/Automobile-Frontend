import { addRow } from "../../../Services/AddRowTableWithUserInput";

 export const handleKeyPress = async (e, rowIndex, columnName, tableInputs, setTableInputs, headsDataTypes) => {
    const currentRow = rowIndex;
  const currentColumnIndex = headsDataTypes.findIndex(col => col === columnName);

    const setFocusAtEnd = (element) => {
      setTimeout(() => {
        const value = element.value;
        if (typeof element.setSelectionRange === 'function') {
          element.setSelectionRange(value.length, value.length);
        }
        // if(isIPhone()){
        //   element.focus();
        //   element.scrollIntoView({ behavior: "smooth", block: "start" });
        // }
        // else{
          element.focus();
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        // }
      }, 0);
    };
  
  
    if (e.key == 'Enter') {
      e.preventDefault();
      const lastColumnIndex = headsDataTypes.length - 1;
      const isLastColumn = columnName === headsDataTypes[lastColumnIndex];
      const isMarkColumn = (columnName === 'Mark' || columnName === "Remark");
       if(isLastColumn){
        let notProdID = headsDataTypes.find(val => val!= "S.No" && val != "Date");
        const existRowClass = document.getElementById(`${rowIndex + 1}-${notProdID}`);
        if (existRowClass) {
          setFocusAtEnd(existRowClass);
        }
        else{
          await addRow(headsDataTypes, tableInputs, setTableInputs)
          const newRowClass = document.getElementById(`${rowIndex + 1}-${notProdID}`);
          if(newRowClass){
            setFocusAtEnd(newRowClass)
          }
        }
      }
      else {
        let nextColumnIndex = headsDataTypes.findIndex(col => col === columnName) + 1;
        let nextColumnName = headsDataTypes[nextColumnIndex];
        if(nextColumnName == "Product Name" && tableInputs[rowIndex][nextColumnName] != ""){
          if(headsDataTypes[nextColumnIndex+1]){
            nextColumnName = headsDataTypes[nextColumnIndex+1];
          }
          else{
            let notProdID = headsDataTypes.find(val => val!= "S.No" && val != "Date");
            addRow(headsDataTypes, tableInputs, setTableInputs)
            const newRowClass = document.getElementById(`${rowIndex + 1}-${notProdID}`);
            if(newRowClass){
              setFocusAtEnd(newRowClass)
            }
            return;
            }
        }
        if((nextColumnName == "Mark" || nextColumnName == "Remark")){
          if(headsDataTypes[nextColumnIndex+1]){
            nextColumnName = headsDataTypes[nextColumnIndex+1];
          }
          else{
            let notProdID = headsDataTypes.find(val => val!= "S.No" && val != "Date");
            addRow(headsDataTypes, tableInputs, setTableInputs)
            const newRowClass = document.getElementById(`${rowIndex + 1}-${notProdID}`);
            if(newRowClass){
              setFocusAtEnd(newRowClass)
            }
            return;
            }
        }
        const nextInput = document.getElementById(`${rowIndex}-${nextColumnName}`);
        if (nextInput) {
          setFocusAtEnd(nextInput);
        }
      }
    }
    else  if (e.key === 'ArrowUp' && currentRow > 0) {
      const prevRowIndex = currentRow - 1;
      const prevRow = document.getElementById(`${prevRowIndex}-${columnName}`);
      if (prevRow) {
        // prevRow.focus();
        setFocusAtEnd(prevRow)
      }
    } else if (e.key === 'ArrowDown' && currentRow < tableInputs.length - 1) {
      const nextRowIndex = currentRow + 1;
      const nextRow = document.getElementById(`${nextRowIndex}-${columnName}`);
      if (nextRow) {
        // nextRow.focus();
        setFocusAtEnd(nextRow)
      }
    } else if (e.key === 'ArrowLeft' && currentColumnIndex > 0) {
      const prevColumnIndex = currentColumnIndex - 1;
      const prevColumnName = headsDataTypes[prevColumnIndex];
      const prevCell = document.getElementById(`${currentRow}-${prevColumnName}`);
      if (prevCell) {
        // prevCell.focus();
        setFocusAtEnd(prevCell);
      }
    } else if (e.key === 'ArrowRight' && currentColumnIndex < headsDataTypes.length - 1) {
      const nextColumnIndex = currentColumnIndex + 1;
      const nextColumnName = headsDataTypes[nextColumnIndex];
      const nextCell = document.getElementById(`${currentRow}-${nextColumnName}`);
      if (nextCell) {
        // nextCell.focus();
        setFocusAtEnd(nextCell);
      }
    }
  }