import axios from "axios";

const API_URL = "http://localhost:8085/api/routes"; // Ensure backend runs on this port

// Get all routes
export const getAllRoutes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all routes:", error);
    return [];
  }
};

// Get route by ID
export const getRouteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching route by ID:", error);
    return null;
  }
};

// Search routes by train number
export const searchRoutesByTrainNumber = async (trainNumber) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { trainNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching routes by train number:", error);
    return [];
  }
};

// Create a new route
export const createRoute = async (routeData) => {
  try {
    const response = await axios.post(API_URL, routeData);
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error);
    return null;
  }
};

// Update an existing route
export const updateRoute = async (id, routeData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, routeData);
    return response.data;
  } catch (error) {
    console.error("Error updating route:", error);
    return null;
  }
};

// Delete a route
export const deleteRoute = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting route:", error);
    return false;
  }
};

export default {
  getAllRoutes,
  getRouteById,
  searchRoutesByTrainNumber,
  createRoute,
  updateRoute,
  deleteRoute,
};
