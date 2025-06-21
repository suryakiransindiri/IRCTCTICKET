// services/notificationService.js
import axios from "axios";

const API_URL = "http://localhost:9090/api/notifications";

export const sendCancelEmail = async (email, bookingId, trainName, refundAmount) => {
  const htmlMessage = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #dc3545;">🚫 Railway Ticket Cancellation Confirmation</h2>
        <p>Dear user,</p>
        <p>Your booking <strong>${bookingId}</strong> for the train <strong>${trainName}</strong> has been <span style="color: red;">canceled</span>.</p>
        ${refundAmount > 0 ? `<p>A refund of ₹${refundAmount} will be processed to your original payment method.</p>` : `<p>No refund is applicable for this cancellation.</p>`}
        <p>If you did not request this cancellation, please contact support immediately.</p>
        <br/>
        <p>Thanks,<br/>Railway Booking Team</p>
      </body>
    </html>
  `;

  const payload = {
    recipientEmail: email,
    subject: "🚫 Railway Booking Canceled - Confirmation",
    message: htmlMessage,
    ctaLink: "https://your-frontend-domain.com/my-bookings"
  };

  return axios.post(`${API_URL}/send`, payload);
};
