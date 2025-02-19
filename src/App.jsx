import React, { createContext, useState } from "react";
import "./App.css";
import RouterCom from "./Route/RouterCom";

export const ThemeContext = createContext(); 
function App() {  
  const [theme, setTheme] = useState();
  const [TableTwo, setTableTwo] = useState();
  const [Amount, setAmount] = useState();

  return (
    <ThemeContext.Provider value={{ theme, setTheme ,TableTwo, setTableTwo,Amount, setAmount}}>
      <RouterCom />
    </ThemeContext.Provider>
  );
}

export default App;
