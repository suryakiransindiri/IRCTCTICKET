import React, { useState } from "react";
import axios from "axios";
import { FaTrain, FaSearch } from "react-icons/fa";
import SearchResults from "./SearchResult";

const SearchTrainNumber = () => {
  const [trainNumber, setTrainNumber] = useState("");
  const [trainData, setTrainData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!trainNumber.trim()) {
      setErrorMessage("Please enter a train number!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:9090/api/search/number/${trainNumber}`
      );
      setTrainData([response.data]);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching train details", error);
      setErrorMessage("Train not found! Please check the number.");
      setTrainData([]);
    }
  };

  const handleBookTicket = (train) => {
    alert(`Booking ticket for ${train.name} (${train.trainNumber})`);
  };

  return (
    <div className="container my-5">
      {/* Search Box */}
      <div
        className="card shadow-lg p-4 mx-auto"
        style={{ maxWidth: "600px", borderRadius: "12px" }}
      >
        <h3 className="text-center mb-3">
          <FaTrain className="me-2 text-primary" />
          Search Train by Number
        </h3>

        {/* Error Alert */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {/* Search Input */}
        <div className="input-group">
          <span className="input-group-text bg-primary text-white">
            <FaTrain />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Train Number"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
          />
          <button className="btn btn-warning" onClick={handleSearch}>
            <FaSearch className="me-2" />
            Search
          </button>
        </div>
      </div>

      {/* Display Search Results */}
      {trainData.length > 0 && (
        <div className="mt-4">
          <SearchResults trains={trainData} onBookTicket={handleBookTicket} />
        </div>
      )}
    </div>
  );
};

export default SearchTrainNumber;
