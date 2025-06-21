import axios from "axios";

const API_URL = "http://localhost:9090/api/notifications";

export const sendCustomOtpEmail = async (email, otp) => {
  const htmlMessage = `
    <html>
      <head><style>/* Add inline CSS if needed */</style></head>
      <body>
        <h2>Railway Booking OTP</h2>
        <p>Hello,</p>
        <p>Your OTP for booking confirmation is:</p>
        <div style="font-size: 24px; font-weight: bold; background: #eee; padding: 10px; width: fit-content;">
          ${otp}
        </div>
        <p>Please do not share this OTP. It is valid for 5 minutes.</p>
        <p>Thank you,<br/>Railway Team</p>
      </body>
    </html>
  `;

  const payload = {
    recipientEmail: email,
    subject: "🚄 Railway OTP for Booking Confirmation",
    message: htmlMessage,
    ctaLink: "https://your-frontend-domain.com/booking"
  };

  return axios.post(`${API_URL}/send`, payload);
};
