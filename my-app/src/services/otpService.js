import axios from "axios";

const API_URL = "http://localhost:9090/api/notifications";

// Send OTP
export const sendOtp = async (email) => {
  try {
    await axios.post(`${API_URL}/send-otp`, null, { params: { email } });
  } catch (error) {
    throw new Error("Failed to send OTP");
  }
};

// Validate OTP
export const validateOtp = async (email, otp) => {
  try {
    const response = await axios.post(`${API_URL}/validate-otp`, null, {
      params: { email, otp },
    });
    return response;
  } catch (error) {
    throw new Error("Invalid OTP");
  }
};
