import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Track Vision
        </Link>

        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search Trains</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-bookings">My Bookings</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          {user ? (
            <>
              {/* <Link className="nav-link me-3 fw-semibold" to="/profile">
                Profile
              </Link> */}
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
