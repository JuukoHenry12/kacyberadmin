import React from 'react';
import { useSelector } from 'react-redux';
import {Navigate,Outlet } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useSelector((state) => state.token);
//   console.log(token)
  return  token ? <Outlet/> : <Navigate to='/'/>
};

export default PrivateRoute;
