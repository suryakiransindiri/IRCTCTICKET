import React, { useState, useEffect, useCallback } from "react";
import { getUserProfile, getUserBookings } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Wrap fetch functions inside useCallback to prevent recreation on re-renders
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, []);

  const fetchUserBookings = useCallback(async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
    fetchUserBookings();
  }, [fetchUserProfile, fetchUserBookings]); // ✅ Dependencies now included

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>
      {user ? (
        <div>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Phone:</b> {user.phone}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h3>My Bookings</h3>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Train: {booking.trainName} | Date: {booking.date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Profile;
