import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaArrowRight,
  FaPlusCircle,
  FaPaperPlane,
  FaTrashAlt
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";


const TravelerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const train = location.state?.train || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const [travelers, setTravelers] = useState([
    { fullName: "", age: "", gender: "" },
  ]);

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log("Received train object in TravelerDetails:", train);
  }, []);

  const addTraveler = () => {
    setTravelers([...travelers, { fullName: "", age: "", gender: "" }]);
  };

  const handleChange = (index, event) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index][event.target.name] = event.target.value;
    setTravelers(updatedTravelers);
  };

  const sendOtp = async () => {
    setAlertMessage("");
    setOtpError("");
    try {
      const response = await fetch("http://localhost:8089/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: user?.email,
          recipientName: user?.name,
          subject: "OTP Verification - Railway Reservation",
          message: "", // backend generates it
          ctaLink: "",
        }),
      });
  
      if (response.ok) {
        setOtpSent(true);
        setAlertMessage("OTP has been sent to your email.");
      } else {
        setOtpError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setOtpError("An error occurred while sending OTP.");
    }
  };
  
  const deleteTraveler = (indexToDelete) => {
    const updated = travelers.filter((_, index) => index !== indexToDelete);
    setTravelers(updated);
  };
  const validateOtp = async () => {
    setOtpError("");
    try {
      const response = await fetch(
        `http://localhost:8089/api/notifications/validate-otp?email=${user?.email}&otp=${otp}`,
        { method: "POST" }
      );

      if (response.ok) {
        setOtpVerified(true);
        setAlertMessage("OTP verified successfully!");
      } else {
        setOtpError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setOtpError("OTP verification failed.");
    }
  };

  const proceedToPayment = () => {
    if (!otpVerified) {
      setOtpError("Please verify OTP before proceeding.");
      return;
    }

    navigate("/booking-payment", {
      state: {
        userId: user?.id || "Unknown User",
        userName: user?.name || "Anonymous",
        userEmail: user?.email || "",
        train,
        travelers,
      },
    });
  };

  const totalFare = travelers.length * (train.fare || 0);

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg border-0 p-4 rounded-4 bg-light">
        <div className="text-center mb-4">
          <h3 className="fw-bold text-dark">
            <FaUser className="me-2 text-primary" /> Traveler Details
          </h3>
          <p className="text-muted">Enter passenger details to proceed with booking.</p>
        </div>
  
        {travelers.map((traveler, index) => (
  <div className="card border-0 shadow-sm p-3 rounded-3 mb-4 position-relative" key={index}>
    {/* 🗑️ Show delete button only if more than 1 traveler */}
    {travelers.length > 1 && (
      <button
        className="btn btn-sm btn-danger position-absolute"
        style={{ top: "10px", right: "10px", borderRadius: "50%" }}
        onClick={() => deleteTraveler(index)}
        title="Remove Traveler"
      >
        <FaTrashAlt />
      </button>
    )}

    <div className="row g-3">
      <div className="col-md-5">
        <label className="form-label fw-semibold">Full Name</label>
        <input
          type="text"
          className="form-control"
          name="fullName"
          placeholder="Enter full name"
          value={traveler.fullName}
          onChange={(e) => handleChange(index, e)}
          required
        />
      </div>
      <div className="col-md-3">
        <label className="form-label fw-semibold">Age</label>
        <input
          type="number"
          className="form-control"
          name="age"
          placeholder="Enter age"
          value={traveler.age}
          onChange={(e) => handleChange(index, e)}
          required
        />
      </div>
      <div className="col-md-4">
        <label className="form-label fw-semibold">Gender</label>
        <select
          className="form-select"
          name="gender"
          value={traveler.gender}
          onChange={(e) => handleChange(index, e)}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  </div>
))}
  
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-outline-primary" onClick={addTraveler}>
            <FaPlusCircle className="me-1" /> Add Traveler
          </button>
        </div>
  
        {/* OTP Verification Card */}
        <div className="card border-0 shadow-sm p-4 rounded-3 bg-white mb-4">
          <h5 className="fw-bold mb-3 text-primary">OTP Verification</h5>
          {otpError && <div className="alert alert-danger">{otpError}</div>}
          {alertMessage && <div className="alert alert-success">{alertMessage}</div>}
  
          <div className="row align-items-center g-3">
  <div className="col-md-5">
    <input
      type="text"
      className="form-control"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />
  </div>
  <div className="col-md-3 d-flex gap-2">
    <button
      className="btn btn-outline-secondary"
      style={{
        flex: 1,
        padding: "6px 12px",
        fontSize: "14px",
        height: "38px",
        whiteSpace: "nowrap",
        minWidth: "110px",
      }}
      onClick={sendOtp}
    >
      <FaPaperPlane className="me-1" /> Send OTP
    </button>
    <button
      className="btn btn-success w-100"
      style={{ padding: "6px 12px", fontSize: "14px", height: "38px" }}
      onClick={validateOtp}
    >
      Validate
    </button>
  </div>
</div>

        </div>
  
        {/* Payment Section */}
        <div className="row justify-content-between align-items-center bg-white p-4 rounded-3 shadow-sm">
          <div className="col-md-6">
            <h5 className="fw-bold text-dark">Total Fare: ₹{totalFare}</h5>
            <p className="text-muted mb-0">Fare calculated based on number of travelers.</p>
          </div>
          <div className="col-md-6 text-end">
            <button
              className="btn btn-primary btn-lg fw-bold"
              onClick={proceedToPayment}
            >
              Proceed to Payment (₹{totalFare}) <FaArrowRight className="ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default TravelerDetails;
