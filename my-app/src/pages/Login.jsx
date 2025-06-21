import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const user = await loginUser(email, password);
      if (user) {
        login(user);
        navigate(user.role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      const msg = err.message.toLowerCase();
      if (msg.includes("user not found")) {
        setError("User not found. Please register.");
      } else if (msg.includes("invalid credentials") || msg.includes("invalid password")) {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg rounded" style={{ width: "25rem" }}>
        <h3 className="text-center text-primary fw-bold mb-3">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-light"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
