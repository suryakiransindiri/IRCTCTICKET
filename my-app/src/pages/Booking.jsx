import React, { useState } from "react";
import axios from "axios";

const Booking = () => {
  const [userId, setUserId] = useState("");
  const [trainId, setTrainId] = useState("");

  const handleBooking = async () => {
    await axios.post("http://localhost:5000/bookings", { userId, trainId });
    alert("Booking Confirmed!");
  };

  return (
    <div className="container mt-4">
      <h2>Book a Train</h2>
      <input
        type="text"
        placeholder="User ID"
        className="form-control mb-2"
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Train ID"
        className="form-control mb-2"
        onChange={(e) => setTrainId(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
