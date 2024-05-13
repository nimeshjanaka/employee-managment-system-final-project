import React from "react";
import { Routes, Route } from "react-router-dom";
import Attendence from "./components/attendence/Attendence";
import Leave from "./components/leave/Leave";
import About from "./components/about/About";
import EmployeeDashboard from "./components/dashboard/EmployeeDashboard";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard";
import Apply from "./components/leave/apply Leave/Apply";
import Homepage from "./homepage/Homepage";
import AdminLogin from "./components/login/Adminlogin";
import EmployeeLogin from "./components/login/EmployeeLogin";
import EmployeeAddpage from "./components/dashboard/admin/EmployeeAddpage";
import Leavecheck from "./components/dashboard/admin/Leavecheck";

function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" exact element={<EmployeeDashboard />} />
      <Route path="/attendance" exact element={<Attendence />} />
      <Route path="/leave" exact element={<Leave />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/employee-login" element={<EmployeeLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
      <Route path="addemployee" element={<EmployeeAddpage />} />
      <Route path="leavedetails" element={<Leavecheck />} />
    </Routes>
  );
}

export default Pages;
