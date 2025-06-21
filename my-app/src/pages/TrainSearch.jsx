import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchTrains, searchTrainByNumber } from "../services/trainService";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExchangeAlt, FaSearch, FaTrain } from "react-icons/fa";
import AboutUs from "../components/AboutUs";
import { getSessionUser } from "../services/authService";

const locations = ["New Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore"];

const TrainSearch = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("searchByRoute");
  const [user, setUser] = useState(getSessionUser()); // Track login state

  const navigate = useNavigate();

  // Listen for login/logout events to update state
  useEffect(() => {
    const handleUserUpdate = () => {
      setUser(getSessionUser());
    };

    window.addEventListener("userLogin", handleUserUpdate);
    window.addEventListener("userLogout", handleUserUpdate);

    return () => {
      window.removeEventListener("userLogin", handleUserUpdate);
      window.removeEventListener("userLogout", handleUserUpdate);
    };
  }, []);

  const swapSourceDestination = () => {
    setSource(destination);
    setDestination(source);
  };

  const handleSearchByRoute = async () => {
    setLoading(true);
    setError("");
    try {
      const results = await searchTrains(source, destination, date);
      setTrains(results);
    } catch (err) {
      setError("Failed to fetch train data. Please try again.");
    }
    setLoading(false);
  };

  const handleSearchByTrainNumber = async () => {
    if (!trainNumber.trim()) {
      setError("Please enter a valid train number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await searchTrainByNumber(trainNumber);
      setTrains(result ? [result] : []);
    } catch (err) {
      setError("No train found with this number.");
    }
    setLoading(false);
  };

  const handleBookNow = (train) => {
    if (!user) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    navigate("/traveler-details", { state: { train } });
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="text-center mb-3">
        <h4 className="fw-bold text-primary">Train Search</h4>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-3">
        <div className="btn-group">
          <button
            className={`btn btn-sm ${
              activeTab === "searchByRoute"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("searchByRoute")}
          >
            Search by Route
          </button>
          <button
            className={`btn btn-sm ${
              activeTab === "searchByTrainNumber"
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("searchByTrainNumber")}
          >
            Search by Train Number
          </button>
        </div>
      </div>

      {/* Search by Route */}
      {activeTab === "searchByRoute" && (
        <div className="card p-3 shadow-sm border-0">
          <div className="row g-2 align-items-end">
            <div className="col-md-3">
              <label className="form-label text-secondary mb-0">From</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Enter source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                list="source-options"
              />
              <datalist id="source-options">
                {locations.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            <div className="col-md-1 text-center">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={swapSourceDestination}
              >
                <FaExchangeAlt size={16} />
              </button>
            </div>

            <div className="col-md-3">
              <label className="form-label text-secondary mb-0">To</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                list="destination-options"
              />
              <datalist id="destination-options">
                {locations.map((loc, index) => (
                  <option key={index} value={loc} />
                ))}
              </datalist>
            </div>

            <div className="col-md-3">
              <label className="form-label text-secondary mb-0">Date</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Moved Search Trains Button to last column */}
            <div className="col-md-2 d-grid">
              <button
                className="btn btn-sm btn-primary"
                onClick={handleSearchByRoute}
              >
                Search Trains
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search by Train Number */}
      {activeTab === "searchByTrainNumber" && (
  <div className="row">
  <div className="mx-auto">
    <div className="card p-3 shadow-sm border-0">
      <h5 className="text-primary mb-3">
        <FaTrain className="me-2" /> Search by Train Number
      </h5>
      <div className="row g-2 align-items-center">
        {/* Train Number Input */}
        <div className="col-md-8">
          <label className="form-label text-secondary mb-1">
            Enter Train Number
          </label>
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <FaTrain />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 12345"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="col-md-4 mt-4 d-flex justify-content-start">
          <button
            className="btn btn-primary"
            onClick={handleSearchByTrainNumber}
          >
            <FaSearch className="me-2" />
            Search
          </button>
        </div>
      </div>
  </div>
</div>

        </div>
      )}
      {/* Error Message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {loading && <div className="text-center mt-3">Loading trains...</div>}

 {/* Train Results */}
<div className="mt-4">
  {trains.length > 0 ? (
    <div className="d-flex flex-column align-items-center">
      {trains.map((train) => (
        <div
          key={train.trainNumber}
          className="shadow p-4 mb-4 bg-white rounded-4 border position-relative"
          style={{
            maxWidth: "700px",
            width: "100%",
            borderLeft: "8px solid #0d6efd",
          }}
        >
          {/* Header: Train Info */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-0 text-primary">
                <FaTrain className="me-2" />
                {train.name} ({train.trainNumber})
              </h5>
            </div>
          </div>

          {/* Route Info */}
          <div className="d-flex justify-content-between align-items-center border-top border-bottom py-3 mb-3">
            <div className="text-center">
              <strong>{train.source}</strong>
            </div>
            <FaExchangeAlt className="text-primary fs-4" />
            <div className="text-center">
              <strong>{train.destination}</strong>
            </div>
          </div>

          {/* Timing / Seats / Fare */}
          <div className="row mb-3">
            <div className="col-sm-4 mb-2">
              <strong>Departure:</strong> {train.departureTime}
            </div>
            <div className="col-sm-4 mb-2">
              <strong>Arrival:</strong> {train.arrivalTime}
            </div>
            <div className="col-sm-4 mb-2">
              <strong>Fare:</strong> ₹{train.fare}
            </div>
          </div>

          {/* Seat Availability */}
          <div className="mb-3">
            <strong>Seats Available: </strong>
            <span className="badge bg-success">{train.availableSeats}</span>
          </div>

          {/* Book Button */}
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleBookNow(train)}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    !loading && (
      <p className="text-center text-muted mb-5">No trains found.</p>
    )
  )}
</div>

      <AboutUs />
    </div>
  );
};

export default TrainSearch;
