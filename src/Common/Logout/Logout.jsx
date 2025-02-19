import { Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Logout.css"
import { Path } from '../../Route/Path';
const Logout = () => {

    const Navigate = useNavigate();

    const typographyStyles = {
    color: "#133E87",
    fontSize: "15px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };
  
  return (
    <div className="Logout-Button">
          <Typography
            sx={typographyStyles}
            variant="h6"
            noWrap
            component="div"
            className="Logoutbtn"
            onClick={() => {
              localStorage.clear(), Navigate(Path.home);
            }}>
            Logout
          </Typography>
    </div>
  )
}

export default Logout
