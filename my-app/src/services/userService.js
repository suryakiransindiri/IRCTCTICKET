import axios from "axios";

const API_URL_USER = "http://localhost:9090/api/users"; // Users API
const API_URL_ADMIN = "http://localhost:5000/admin"; // Admin API

// Login Function
export const loginUser = async (email, password) => {
  try {
    // Check if the user is an admin
    const adminResponse = await axios.get(`${API_URL_ADMIN}?email=${email}`);
    
    // If an admin is found
    if (adminResponse.data.length > 0) {
      const admin = adminResponse.data[0]; // Assuming only one admin with that email
      if (admin.password === password) {
        return { ...admin, role: "ADMIN" }; // Return admin data with role
      }
    }

    // Check if the user exists in the user database
    const userResponse = await axios.get(`${API_URL_USER}?email=${email}`);
    
    // If a user is found
    if (userResponse.data.length > 0) {
      const user = userResponse.data[0]; // Assuming only one user with that email
      if (user.password === password) {
        return { ...user, role: "USER" }; // Return user data with role
      }
    }

    throw new Error("Invalid credentials"); // If no match found

  } catch (error) {
    console.error("Login error:", error.message);
    throw error; // Throw the error to handle it in the UI
  }
};

// Register Function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_USER}`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.message);
    return null;
  }
};

// Logout Function
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
};

// Get Current Session User
export const getSessionUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Secure Fetch with Authorization
export const secureFetch = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Unauthorized access. Please log in.");
    }

    const response = await fetch(`http://localhost:9090${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Secure fetch error:", error.message);
    return null;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_USER}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL_USER);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL_USER}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL_USER}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

export default {
  loginUser,
  registerUser,
  logoutUser,
  getSessionUser,
  secureFetch,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
