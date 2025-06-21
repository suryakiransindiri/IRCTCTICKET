import axios from "axios";

const API_URL = "http://localhost:9090/api/passengers";

// Get all passengers
export const getAllPassengers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all passengers:", error);
    return [];
  }
};

// Get passenger by ID
export const getPassengerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching passenger by ID:", error);
    return null;
  }
};

// Create a new passenger
export const createPassenger = async (passengerData) => {
  try {
    const response = await axios.post(API_URL, passengerData);
    return response.data;
  } catch (error) {
    console.error("Error creating passenger:", error);
    return null;
  }
};

// Update an existing passenger
export const updatePassenger = async (id, passengerData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, passengerData);
    return response.data;
  } catch (error) {
    console.error("Error updating passenger:", error);
    return null;
  }
};

// Delete a passenger
export const deletePassenger = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting passenger:", error);
    return false;
  }
};

export default {
  getAllPassengers,
  getPassengerById,
  createPassenger,
  updatePassenger,
  deletePassenger,
};
