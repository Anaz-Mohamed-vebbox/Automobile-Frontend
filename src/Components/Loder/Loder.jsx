import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./Loader.css";

export default function Loder({ color }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress style={color && { color: "white"}} />
    </Box>
  );
}

