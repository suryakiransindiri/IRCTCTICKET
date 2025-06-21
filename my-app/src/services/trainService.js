import axios from "axios";

const API_URL = "http://localhost:9090/api/trains"; // Ensure backend runs on this port

// Search trains based on source, destination, and date
export const searchTrains = async (source, destination, date) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { source, destination, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching trains:", error);
    return [];
  }
};

// Search train by train number
export const searchTrainByNumber = async (trainNumber) => {
  try {
    const response = await axios.get(`${API_URL}/number/${trainNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error searching train by number:", error);
    return null;
  }
};

// Get all trains
export const getAllTrains = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all trains:", error);
    return [];
  }
};

// Get train by ID
export const getTrainById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching train by ID:", error);
    return null;
  }
};

// Check seat availability
export const getSeatAvailability = async (trainNumber, date) => {
  try {
    const response = await axios.get(`${API_URL}/availability`, {
      params: { trainNumber, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error checking seat availability:", error);
    return null;
  }
};

// Create a new train
export const createTrain = async (trainData) => {
  try {
    const response = await axios.post(API_URL, trainData);
    return response.data;
  } catch (error) {
    console.error("Error creating train:", error);
    return null;
  }
};

// Update an existing train
export const updateTrain = async (id, trainData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, trainData);
    return response.data;
  } catch (error) {
    console.error("Error updating train:", error);
    return null;
  }
};

// Delete a train
export const deleteTrain = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting train:", error);
    return false;
  }
};

export default {
  searchTrains,
  searchTrainByNumber,
  getAllTrains,
  getTrainById,
  getSeatAvailability,
  createTrain,
  updateTrain,
  deleteTrain,
};
