import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container h-screen justify-center mx-auto p-2 overflow-y-auto">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
