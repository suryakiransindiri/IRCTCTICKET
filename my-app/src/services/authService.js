import axios from "axios";

const DB_JSON_URL = "http://localhost:5000/users"; // JSON Server
const BACKEND_API_URL = "http://localhost:8083/api/users";

// Login with admin-first check
export const loginUser = async (email, password) => {
  try {
    // Step 1: Check in db.json
    const dbResponse = await axios.get(`${DB_JSON_URL}?email=${email}`);
    const users = dbResponse.data;

    if (users.length > 0) {
      const user = users[0];
      if (user.password === password) {
        // Admin found
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else {
        throw new Error("Invalid password");
      }
    }

    // Step 2: Fallback to backend
    const response = await axios.post(`${BACKEND_API_URL}/login`, {
      email,
      password,
    });

    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(error.response?.data || "Login failed");
  }
};

// registerUser.js
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/register`, {
      name, email, password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};


// export const logoutUser = () => {
//   sessionStorage.removeItem("user");
// };

export const logoutUser = () => {
  localStorage.removeItem("user");
};

export const getSessionUser = () => {
  // const user = sessionStorage.getItem("user");
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
