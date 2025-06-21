import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:9090/api"; // Update with your actual API URL

const secureFetch = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    return null;
  }
};

const ManageReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await secureFetch("/reservations");

        if (!data) {
          throw new Error("No data received");
        }

        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error.message);
      }
    }

    fetchReservations();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary">Manage Reservations</h2>
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Passenger Name</th>
            <th>Train</th>
            <th>Seat</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.passenger}</td>
                <td>{res.train}</td>
                <td>{res.seat}</td>
                <td>{res.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                No reservations found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReservations;
