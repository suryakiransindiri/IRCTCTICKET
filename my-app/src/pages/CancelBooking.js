import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTrain,
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaBan,
  FaSpinner,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const CancelBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);
  const [message, setMessage] = useState("");
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundPolicy, setRefundPolicy] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {
    name: "User",
    email: "user@example.com",
  };

  useEffect(() => {
    if (booking) {
      calculateRefund(booking);
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:8085/api/bookings/${id}`);
        if (!res.ok) throw new Error("Booking not found");
        const data = await res.json();
        setBooking(data);
        calculateRefund(data);
      } catch (err) {
        console.error("Error fetching booking:", err);
        setMessage("❌ Failed to load booking.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [booking, id]);

  const calculateRefund = (booking) => {
    const fare = booking.train?.fare || 0;
    const travelersCount = booking.travelers?.length || booking.numberOfSeats || 1;
    const totalFare = fare * travelersCount;

    const departureTime = booking.train
      ? new Date(`${booking.train.departureDate}T${booking.train.departureTime}`)
      : new Date();

    const now = new Date();
    const hoursLeft = (departureTime - now) / (1000 * 60 * 60);

    if (hoursLeft > 48) {
      setRefundAmount(totalFare * 0.9);
      setRefundPolicy("✅ 90% refund if canceled 48+ hours before departure.");
    } else if (hoursLeft > 24) {
      setRefundAmount(totalFare * 0.5);
      setRefundPolicy("⚠️ 50% refund if canceled between 24–48 hours.");
    } else {
      setRefundAmount(totalFare * 0.2);
      setRefundPolicy("⚠️ Only 20% refund if canceled within 24 hours.");
    }

    setLoading(false);
  };

  const sendOtp = async () => {
    try {
      const res = await fetch("http://localhost:8089/api/notifications/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: loggedInUser.email,
          recipientName: loggedInUser.name,
        }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setOtpSent(true);
      setOtpMessage("✅ OTP sent to your email.");
    } catch (error) {
      console.error("OTP send error:", error);
      setOtpMessage("❌ Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(
        `http://localhost:8089/api/notifications/validate-otp?email=${encodeURIComponent(
          loggedInUser.email
        )}&otp=${encodeURIComponent(otp)}`,
        {
          method: "POST",
        }
      );
  
      const result = await res.text();
      if (res.ok && result === "OTP verified successfully.") {
        setOtpVerified(true);
        setOtpMessage("✅ OTP verified successfully.");
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("OTP validation error:", error);
      setOtpVerified(false);
      setOtpMessage("❌ Invalid or expired OTP.");
    }
  };
  
  const handleCancel = async () => {
    if (!otpVerified) {
      alert("⚠️ Please verify OTP before canceling the booking.");
      return;
    }

    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    setIsCanceling(true);

    try {
      const res = await fetch(`http://localhost:8085/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELED" }),
      });

      if (!res.ok) throw new Error("Failed to update booking status");

      const travelersCount = booking.numberOfSeats || booking.travelers?.length || 1;

      await fetch(
        `http://localhost:9090/api/trains/update-seats?trainNumber=${booking.train.trainNumber}&date=${booking.train.departureDate}&bookedSeats=${-1 * travelersCount}`,
        { method: "PUT" }
      );

      const messageHtml = `
        <div style="font-family: 'Segoe UI', sans-serif; padding: 20px;">
          <h4 style="color: #dc3545;">
            Booking Cancellation Confirmation
          </h4>
          <p>Dear <strong>${loggedInUser.name}</strong>,</p>
          <p>Your booking for <strong>${booking.train?.name}</strong> 
          (${booking.train?.trainNumber}) on <strong>${booking.train?.departureDate}</strong> 
          at <strong>${booking.train?.departureTime}</strong> has been 
          <strong style="color: red;">canceled</strong>.</p>
          <p><strong>Refund Amount:</strong> ₹${refundAmount.toFixed(2)}</p>
        </div>
      `;

      const emailPayload = {
        recipientEmail: loggedInUser.email,
        recipientName: loggedInUser.name,
        subject: "Booking Cancellation Confirmation",
        message: messageHtml,
      };

      await fetch("http://localhost:8089/api/notifications/cancellation/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });

      setMessage("✅ Your ticket has been successfully canceled!");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (error) {
      console.error("Cancel error:", error);
      setMessage("❌ Failed to cancel booking. Try again later.");
    } finally {
      setIsCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <FaSpinner className="fa-spin me-2" />
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return <p className="text-center text-danger mt-4">Booking not found!</p>;
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center text-danger fw-bold mb-4">
        <FaBan className="me-2" /> Cancel Booking
      </h3>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="card shadow-lg p-4 rounded-4 mb-5">
        <h5 className="fw-bold text-dark">
          <FaTrain className="me-2 text-primary" />
          {booking.train
            ? `${booking.train.name} (${booking.train.trainNumber})`
            : "Train Info Unavailable"}
        </h5>

        <p>
          <FaMapMarkerAlt className="text-secondary me-2" />
          <strong>{booking.train?.source}</strong> → <strong>{booking.train?.destination}</strong>
        </p>

        <p>
          <FaCalendarAlt className="text-secondary me-2" />
          <strong>Date:</strong> {booking.train?.departureDate} |{" "}
          <FaClock className="ms-2 text-secondary" />
          <strong className="ms-1">Time:</strong> {booking.train?.departureTime}
        </p>

        <div className="border p-3 rounded bg-light mt-3">
          <h6 className="fw-bold mb-2">
            <FaUser className="me-2 text-secondary" /> Passenger Info:
          </h6>
          <p className="mb-0">
            {booking.passenger?.fullName} | {booking.passenger?.gender},{" "}
            {booking.passenger?.age} yrs
          </p>
        </div>

        <div className="border p-3 rounded mt-3 bg-light">
          <h6 className="fw-bold mb-2">
            <FaRupeeSign className="me-2 text-secondary" /> Fare Details:
          </h6>
          <p>
            <strong>Total Paid:</strong> ₹
            {booking.totalFare?.toFixed(2) || (refundAmount / 0.9).toFixed(2)}
          </p>
          <p>
            <strong>Refund Amount:</strong>{" "}
            <span className="fw-bold text-success">₹{refundAmount.toFixed(2)}</span>
          </p>
          <p className="text-muted">
            <FaInfoCircle className="me-2" />
            {refundPolicy}
          </p>
        </div>

        <div className="mt-4">
          <h6>
            <FaShieldAlt className="me-2 text-warning" />
            OTP Verification
          </h6>
          <div className="d-flex mb-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="form-control me-2"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={!otpSent}
            />
            <button className="btn btn-outline-secondary me-2" onClick={sendOtp}>
              <FaEnvelope className="me-1" />
              Send OTP
            </button>
            <button
              className="btn btn-outline-success"
              onClick={verifyOtp}
              disabled={!otpSent || otpVerified}
            >
              <FaShieldAlt className="me-1" />
              Verify OTP
            </button>
          </div>
          {otpMessage && <p className="text-info">{otpMessage}</p>}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-danger fw-bold px-4 py-2"
            onClick={handleCancel}
            disabled={isCanceling || !otpVerified}
          >
            {isCanceling ? (
              <>
                <FaSpinner className="fa-spin me-2" />
                Cancelling...
              </>
            ) : (
              <>
                <FaBan className="me-2" />
                Confirm Cancel & Process Refund
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;
