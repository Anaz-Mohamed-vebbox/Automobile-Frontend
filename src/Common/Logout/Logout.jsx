import { Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Logout.css"
import { Path } from '../../Route/Path';
const Logout = () => {

    const Navigate = useNavigate();


  
  return (
    <div className="Logout-Button"  onClick={() => {
      localStorage.clear(), Navigate(Path.home);
    }}>
            Logout
    </div>
  )
}

export default Logout
