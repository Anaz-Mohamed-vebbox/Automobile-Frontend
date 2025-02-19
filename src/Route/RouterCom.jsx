import React, { Component, useState } from "react";
import { Path } from "./Path";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Screen/Dashboard/Dashboard";


import { useMediaQuery } from "@mui/material";


import VerifyEmail from "../Components/VerifyEmail/VerifyEmail";

import { ProductRoutes } from "./ProductRoutes";
import { LoginScreen } from "../Components/Screen1/LoginScreen";
import ScanBill from "../Screen/ScanBill/ScanBill";
import InvoiceProcess from "../Screen/InvoiceProcess/InvoiceProcess";
import Select from "../Screen/Select/Select";
import Register from "../Screen/Register/Register";
import ShowProduct from "../Screen/ShowProduct/ShowProduct";

const RouterCom = () => {

  const PrivateRouter = [
    {
      path: Path.dashboard,
      Component: Dashboard,
      isLogin: true,
    },
    {
      path: Path.ScanBill,
      Component: ScanBill,
      isLogin: true,
    },
    {
      path: Path.InvoiceProcess,
      Component: InvoiceProcess,
      isLogin: true,
    },
    {
      path: Path.Select,
      Component: Select,
      isLogin: true,
    },
    {
      path: Path.Register,
      Component: Register,
      isLogin: true,
    },
    {
      path: Path.ShowProduct,
      Component: ShowProduct,
      isLogin: true,
    },

  ];
  const publicRouter = [
    {
      path: Path.home,
      Component: LoginScreen,
    },
    {
      path: Path.EmailVerify,
      Component: VerifyEmail,
    },
  ];
  return (
    <Routes>
      <>
  
          {publicRouter.map(({ path, Component }, i) => (
            <Route key={i} path={path} element={<Component />} />
          ))}
       
        <Route element={<ProductRoutes />}>
            {PrivateRouter.map(
              ({ path, Component, isNested = false, NestedCom = null }, i) =>
                isNested ? (
                  <Route element={<NestedCom />} key={i}>
                    <Route key={i} path={path} element={<Component />} />
                  </Route>
                ) : (
                  <Route key={i} path={path} element={<Component />} />
                )
            )}
          </Route>
        {/* </Route> */}
      </>
    </Routes>
  );
};

export default RouterCom;
