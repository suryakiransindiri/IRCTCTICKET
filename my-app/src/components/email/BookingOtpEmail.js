export const generateBookingOtpEmail = (otp, userName = "Passenger") => {
    return `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background: white; max-width: 600px; margin: auto; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h2 style="color: #2b4a6f;">🚆 Railway Booking OTP</h2>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Your OTP for booking confirmation is:</p>
            <h1 style="color: #1e88e5;">${otp}</h1>
            <p>This OTP is valid for <strong>5 minutes</strong>.</p>
            <hr/>
            <p style="font-size: 12px; color: #888;">Please do not share this OTP with anyone. <br/> © Railway Corp 2025</p>
          </div>
        </body>
      </html>
    `;
  };
  