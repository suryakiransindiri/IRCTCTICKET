import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaTrain, FaUsers, FaRoute, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const AdminSidebar = () => {
   const {logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-sidebar bg-white vh-100 p-3 shadow-lg">
      <h4 className="text-center mb-4 fw-bold text-primary">Admin Panel</h4>
      <ul className="nav flex-column mt-3">
        {/* <li>
          <NavLink to="/admin/reservations" className="nav-link">
            <FaClipboardList /> Manage Reservations
          </NavLink>
        </li> */}
        <li className="nav-item mb-2">
          <NavLink
            to="/admin/passengers"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "bg-info text-dark fw-semibold rounded px-3 py-2" : "text-dark"
              }`
            }
          >
            <FaUsers />
            View Passengers
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/admin/trains"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 ${
                isActive ? "bg-info text-dark fw-semibold rounded px-3 py-2" : "text-dark"
              }`
            }
          >
            <FaTrain />
            Manage Trains
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/admin/routes" className="nav-link">
            <FaRoute /> Manage Routes
          </NavLink>
        </li> */}
        <li>
          <NavLink className="nav-link text-danger" to="/logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </NavLink>
        </li>
      </ul>
      {/* <div className="logout-section">
        <button className="btn btn-danger" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div> */}
    </div>
  );
};

export default AdminSidebar;
