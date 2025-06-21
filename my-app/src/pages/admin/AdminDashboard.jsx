import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { getSessionUser } from "../../services/authService";
import AdminSidebar from "./AdminSidebar";
import "./css/AdminDashboard.css"; // Ensure styles are imported

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = getSessionUser();
    if (!user || user.role !== "admin") {
      navigate("/login"); // Redirect non-admin users
    } else {
      setAdmin(user);
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      {/* Sidebar always remains fixed */}
      <AdminSidebar />

      {/* Right content updates dynamically */}
      <div className="admin-content">
        <div className="dashboard-header">
          <h2>
            <FaUserShield /> Admin Dashboard
          </h2>
          {admin && <h4>Welcome, {admin.name}!</h4>}
        </div>

        {/* This Outlet will load admin subpages */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
