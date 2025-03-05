import React, { createContext, useState } from "react";
import "./App.css";
import RouterCom from "./Route/RouterCom";

export const ThemeContext = createContext(); 
function App() {  
  const [theme, setTheme] = useState();
  const [TableTwo, setTableTwo] = useState();

  return (
    <div className="App-Parent">
    <ThemeContext.Provider value={{ theme, setTheme ,TableTwo, setTableTwo}}>
      <RouterCom />
    </ThemeContext.Provider>
    </div>
  );
}

export default App;
