import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTrain,
  FaUser,
  FaArrowRight,
  FaBan,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaUndo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login");
    } else {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8085/api/bookings/user/${user.id}`);
      const data = await response.json();
      const validBookings = data.filter((b) => b && b.train && b.passenger);
      setBookings(validBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (booking) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      // 1. Cancel Booking
      await axios.patch(`http://localhost:8085/api/bookings/${booking.bookingId}/status`, {
        status: "CANCELED",
      });

      // 2. Refresh bookings
      fetchBookings();

      // 3. Send notification email
      const htmlMessage = `
        <html>
          <body>
            <h2 style="color: #dc3545;">Railway Booking Cancellation</h2>
            <p>Hello ${user.userName},</p>
            <p>Your booking with Booking ID <strong>${booking.bookingId}</strong> for train <strong>${booking.train?.name} (${booking.train?.trainNumber})</strong> has been <strong>cancelled</strong>.</p>
            <p>Refund Amount: ₹${booking.refundAmount?.toFixed(2) || 0}</p>
            <p>If this was not intended, please contact our support team.</p>
            <p>Thank you,<br/>Railway Team</p>
          </body>
        </html>
      `;

      await axios.post("http://localhost:9090/api/notifications/send", {
        recipientEmail: user.email,
        subject: "❌ Railway Booking Cancellation Confirmation",
        message: htmlMessage,
        ctaLink: "https://your-frontend-domain.com/my-bookings",
      });

      alert("Booking cancelled and email sent.");
    } catch (error) {
      console.error("Cancellation failed:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center fw-bold text-primary mb-4">
        <FaTrain className="me-2" /> My Bookings
      </h3>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="alert alert-warning text-center">No bookings found.</div>
      ) : (
        <div className="row g-4 justify-content-center">
          {bookings.map((booking) => {
            const {
              bookingId,
              status = "",
              totalFare = 0,
              refundAmount = 0,
              passenger = {},
              train = {},
              numberOfSeats = 1,
              bookingTime,
            } = booking;

            const formattedBookingTime = bookingTime
              ? new Date(bookingTime).toLocaleString()
              : "N/A";

            const isCancelled = status.toLowerCase().includes("canceled");
            const isConfirmed = status.toLowerCase().includes("confirmed");
            const isWaiting = status.toLowerCase().includes("waiting");

            return (
              <div key={bookingId} className="col-12">
                <div
                  className="shadow-sm p-4 bg-white rounded-4 border position-relative d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
                  style={{ borderLeft: "6px solid #0d6efd" }}
                >
                  {/* Status */}
                  <div className="position-absolute top-0 end-0 m-3">
                    {isConfirmed ? (
                      <span className="badge bg-success px-3 py-2">Confirmed</span>
                    ) : isWaiting ? (
                      <span className="badge bg-warning text-dark px-3 py-2">Waiting</span>
                    ) : (
                      <span className="badge bg-danger px-3 py-2">Cancelled</span>
                    )}
                  </div>

                  {/* Train Info */}
                  <div className="flex-grow-1">
                    <h5 className="fw-bold mb-1">
                      <FaTrain className="me-2 text-primary" />
                      {train.name || "Train"} ({train.trainNumber || "N/A"})
                    </h5>
                    <small className="text-muted">Booking ID: {bookingId}</small>
                    <br />
                    <small className="text-muted">
                      <FaCalendarAlt className="me-1" />
                      Booked On: {formattedBookingTime}
                    </small>

                    {/* Route */}
                    <div className="d-flex align-items-center gap-3 mt-2 mb-2">
                      <div className="text-center">
                        <FaMapMarkerAlt className="me-1 text-secondary" />
                        <strong>{train.source || "Source"}</strong>
                      </div>
                      <FaArrowRight className="text-primary fs-5" />
                      <div className="text-center">
                        <FaMapMarkerAlt className="me-1 text-secondary" />
                        <strong>{train.destination || "Destination"}</strong>
                      </div>
                    </div>

                    {/* Date/Time/Seats */}
                    <div className="d-flex flex-wrap gap-3">
                      <div>
                        <FaCalendarAlt className="me-2 text-secondary" />
                        <strong>{train.departureDate || "N/A"}</strong>
                      </div>
                      <div>
                        <FaClock className="me-2 text-secondary" />
                        <strong>{train.departureTime || "N/A"}</strong>
                      </div>
                      <div>
                        <FaChair className="me-2 text-secondary" />
                        <strong>{numberOfSeats} Seat(s)</strong>
                      </div>
                    </div>

                    {/* Passenger Info */}
                    <div className="pt-3">
                      <h6 className="fw-bold mb-1">
                        <FaUser className="me-2 text-secondary" /> Passenger:
                      </h6>
                      <p className="mb-0">
                        {passenger.fullName} | {passenger.gender}, {passenger.age} yrs
                      </p>
                    </div>
                  </div>

                  {/* Fare & Cancel */}
                  <div className="d-flex flex-column align-items-md-end gap-2">
                    <div className="text-success">
                      <FaRupeeSign className="me-2" />
                      <strong className="fs-5">₹{totalFare.toFixed(2)}</strong>
                    </div>
                    {refundAmount > 0 && (
                      <div className="text-muted small">
                        <FaUndo className="me-1 text-info" />
                        Refund: ₹{refundAmount.toFixed(2)}
                      </div>
                    )}
                    {!isCancelled && (
                      <button
                        className="btn btn-outline-danger btn-sm fw-semibold"
                        onClick={() => navigate(`/cancel-booking/${booking.bookingId}`, { state: { booking } })}
                      >
                        <FaBan className="me-2" /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
