import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import Public from "./pages/Public";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Public />} />
      <Route path="/login" element={<Login />} />
      <Route path="/protected" element={<Protected />} />
    </Routes>
  );
};
