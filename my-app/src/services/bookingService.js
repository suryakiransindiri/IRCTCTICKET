const BASE_URL = "http://localhost:5000";

export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createBooking:", error);
    throw error;
  }
};
