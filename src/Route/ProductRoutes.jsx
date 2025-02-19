import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export const ProductRoutes = () => {
  const isIn = localStorage.getItem("token");

  
  return isIn ? <Outlet /> : <Navigate to={'/'}/>;
};
