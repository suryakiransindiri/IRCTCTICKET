import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaTrain,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userId, userName, train = {}, travelers = [], userEmail } = location.state || {};
  const [passengers, setPassengers] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");

  const totalFare = (train.fare || 0) * (travelers.length || 0);

  useEffect(() => {
    if (Array.isArray(travelers) && travelers.length > 0) {
      Promise.all(
        travelers.map(async (traveler) => {
          if (typeof traveler === "number") {
            const response = await fetch(`http://localhost:9090/api/passengers/${traveler}`);
            return response.json();
          }
          return traveler;
        })
      )
        .then(setPassengers)
        .catch(console.error);
    }
  }, [travelers]);

  const validatePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setError("All fields are required!");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      setError("Card number must be 16 digits.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError("Expiry date must be in MM/YY format.");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV must be 3 digits.");
      return false;
    }
    return true;
  };

  const storePassengersInBackend = async () => {
    const newPassengers = passengers.filter(p => !p.id);
    if (newPassengers.length === 0) return passengers;

    const response = await fetch("http://localhost:9090/api/passengers/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passengers: newPassengers }),
    });

    if (!response.ok) {
      throw new Error("Failed to save passengers in bulk.");
    }

    const savedPassengers = await response.json();
    const finalList = passengers.map(p => p.id ? p : savedPassengers.shift());
    return finalList;
  };

  const sendConfirmationEmail = async (bookingResponse) => {
    if (!userEmail) return;

    await fetch("http://localhost:8089/api/notifications/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientEmail: userEmail,
        recipientName: userName,
        subject: "Booking Confirmation - Railway Reservation",
        message: "",
        ctaLink: "",
      }),
    });
  };

  const handleSendOtp = async () => {
    if (!userEmail) {
      setOtpError("User email is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8089/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: userEmail,
          recipientName: userName,
          subject: "OTP Verification - Railway Payment",
          message: "Please verify your identity using this OTP.",
          ctaLink: "",
        }),
      });

      if (response.ok) {
        setOtpSent(true);
        setOtpError("");
      } else {
        setOtpError("Failed to send OTP. Try again.");
      }
    } catch (error) {
      setOtpError("Error sending OTP.");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        `http://localhost:8089/api/notifications/validate-otp?email=${userEmail}&otp=${otp}`,
        { method: "POST" }
      );

      if (response.ok) {
        setOtpVerified(true);
        setOtpError("");
      } else {
        const errText = await response.text();
        setOtpError(errText || "Invalid OTP.");
      }
    } catch (error) {
      setOtpError("Error verifying OTP.");
      console.error(error);
    }
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;
    setError("");
  
    try {
      const updatedPassengers = await storePassengersInBackend();
  
      const bookingRequest = {
        userId: userId,
        trainId: train.id,
        passengers: updatedPassengers,
      };
  
      const response = await fetch("http://localhost:8085/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingRequest),
      });
  
      if (!response.ok) {
        throw new Error("Booking failed");
      }
    
      setPaymentSuccess(true);
      setTimeout(() => navigate("/"), 5000);
    } catch (error) {
      setError("Payment processing failed. Try again.");
      console.error(error);
    }
  };
  

  const handleCardNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = input.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiryDate(value);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center text-dark fw-bold">Payment & Ticket Confirmation</h2>
        <p className="text-center text-muted">Secure your ticket with online payment</p>

        {!paymentSuccess ? (
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow-sm p-3 border-0 rounded-3 bg-light">
                <h4 className="text-primary">
                  <FaTrain className="me-2" /> Train Details
                </h4>
                {train.name ? (
                  <>
                    <p><strong>Name:</strong> {train.name}</p>
                    <p><strong>From:</strong> {train.source}</p>
                    <p><strong>To:</strong> {train.destination}</p>
                    <p><strong>Date:</strong> {train.departureDate}</p>
                    <p><strong>Time:</strong> {train.departureTime}</p>
                    <p className="text-success fw-bold mt-2">Total Fare: ₹{totalFare}</p>
                  </>
                ) : (
                  <p className="text-danger">No train details available.</p>
                )}

                <h5 className="mt-4">
                  <FaUser className="me-2 text-success" /> Passenger Details
                </h5>
                {passengers.length > 0 ? (
                  <ul className="list-group">
                    {passengers.map((passenger, index) => (
                      <li key={index} className="list-group-item">
                        <strong>Name:</strong> {passenger.fullName}<br />
                        <strong>Age:</strong> {passenger.age} <br />
                        <strong>Gender:</strong> {passenger.gender} <br />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-danger">No passenger details available.</p>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm p-4 border-0 rounded-3 mb-4">
                <h5 className="text-primary mb-3">OTP Verification</h5>

                {otpError && <div className="alert alert-danger">{otpError}</div>}

                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={!otpSent}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleSendOtp}
                    type="button"
                  >
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                </div>

                <button
                  className="btn btn-success mb-3"
                  onClick={handleVerifyOtp}
                  disabled={!otpSent}
                >
                  Verify OTP
                </button>

                {otpVerified && (
                  <div className="alert alert-success py-2">OTP verified successfully!</div>
                )}
              </div>

              <div className="card shadow-sm p-4 border-0 rounded-3">
                <h4 className="text-success">
                  <FaCreditCard className="me-2" /> Payment Details
                </h4>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                      required
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 fw-bold"
                  onClick={handlePayment}
                  disabled={!otpVerified}
                >
                  Pay ₹{totalFare} Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-4">
            <h3 className="text-success">
              <FaCheckCircle className="me-2" /> Payment Successful!
            </h3>
            <p>You’ll be redirected to the homepage shortly...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
