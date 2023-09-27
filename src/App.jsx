import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { useSelector } from "react-redux";
import Spinner from "components/Spinner/Spinner";

const App = () => {
  const { loading } = useSelector((state) => state.loaders);
  return (
      <div>
           {loading && <Spinner />}
          <Routes>
        
            <Route path="/" element={<AuthLayout />} />
            <Route path="admin/*" element={<AdminLayout />} />
          </Routes>
      </div>
  );
};

export default App;
